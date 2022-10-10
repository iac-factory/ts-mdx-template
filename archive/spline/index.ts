import { Reader } from "./reader";
import { Exports } from "./exports";
import { Compilation } from "./compilation";

import { Constants } from "./constants";

import Utility from "util";

export async function Spline() {
    const { CWD, Path, System, FS } = await Exports.modules();

    const router: Array<{ [ $: string ]: { title: string, sidebar: string, route: string, import: string } }> = Array();
    const exports: { [ $: string ]: string[] } = {};
    const imports: { [ $: string ]: string[] } = {};

    async function Sort() {
        const callable = (comparator: { [ $: string ]: { title: string, sidebar: string, route: string, import: string } }, comparison: { [ $: string ]: { title: string, sidebar: string, route: string, import: string } }) => {
            const a = parseInt(comparator[ ( Object.keys(comparator).pop() ) as string ].sidebar);
            const b = parseInt(comparison[ ( Object.keys(comparison).pop() ) as string ].sidebar);

            if ( a < b ) {
                return -1;
            } else if ( a > b ) {
                return 1;
            }

            return 0;
        };

        return router.sort(callable);
    }

    async function Scan() {
        for await ( const target of await Reader.scan(Path.join(process.cwd(), Constants.Source)) ) {
            const route = Object.create({});
            if ( target.properties.file ) {
                const { path } = target;

                const compilation = await Compilation.mdx(path);

                const key = compilation?.configuration?.route?.replace(Constants.Source + "/", "");

                if ( typeof key === "string" && compilation && "configuration" in compilation ) {
                    route[ key ] = compilation.configuration;

                    router.push(route);
                }

                // console.log(Utility.inspect(router, { colors: true, depth: Infinity }));

                const { destination } = compilation?.pathing ?? { destination: null };

                async function hydrate(object: any, indexer: string) {
                    if ( !( Array.isArray(object[ indexer ]) ) ) {
                        object[ indexer ] = [];
                    }
                }

                if ( destination ) {
                    await hydrate(exports, destination.directory);
                    await hydrate(imports, destination.directory);

                    const injection = Path.basename(destination.file, ".jsx");

                    exports[ destination.directory ].push(injection);
                }
            }
        }
    }

    async function Clean() {
        for ( const directory in exports ) {
            await FS.rm(Path.join(directory, "index.js"), { force: true });
            await FS.rm(Path.join(directory, "index.jsx"), { force: true });
            await FS.rm(Path.join(directory, "sidebar.jsx"), { force: true });
        }
    }

    async function Write() {
        for ( const directory in exports ) {
            const preface = [
                "/***",
                " * " + "The following file was auto-generated from spline.ts.",
                " * " + "Ensure to avoid any manual update(s) or change(s); line",
                " * " + "items are derived from the file-structure found in",
                " * " + "the \"./documentation\" directory.",
                " */",
                "",
                "import React from \"react\";",
                "",
                "import { createBrowserRouter as Router } from \"react-router-dom\";"
            ].join("\n");

            const router: string[] = [
                "export default Router(["
            ];


            const module = Path.join(directory, "index.jsx");
            const side = Path.join(directory, "sidebar.jsx");

            ( System.existsSync(module) ) || await FS.writeFile(module, preface + "\n".repeat(2));
            ( System.existsSync(side) ) || await FS.writeFile(side, preface + "\n".repeat(2));

            for ( const injection of exports[ directory ] ) {
                const partials = injection.split("-");

                const string = { value: "" };
                for ( var iterator = 0; iterator < partials.length; iterator++ ) {

                    if ( iterator !== 0 ) {
                        const character = partials[ iterator ].substring(0, 1).toUpperCase();
                        string.value += character + partials[ iterator ].substring(1, partials[ iterator ].length);
                    } else {
                        string.value += partials[ 0 ];
                    }

                }

                imports[ directory ].push(string.value);

                const exporter = "export * as" + " " + string.value + " " + "from" + " " + "\"./" + injection + "\"" + ";";
                const defaulted = "import {default as" + " " + string.value + "}" + " " + "from" + " " + "\"./" + injection + "\"" + ";";
                const importer = "import * as" + " " + string.value + " " + "from" + " " + "\"./" + injection + "\"" + ";";

                router.push("    " + "{");
                router.push("        " + `path: "${injection}"` + ",");
                router.push("        " + `element: ${string.value}()`);
                router.push("    " + "},");

                await FS.appendFile(module, exporter + "\n");
                await FS.appendFile(module, defaulted + "\n");
                await FS.appendFile(side, importer + "\n");

                await FS.appendFile(module, "\n");
                await FS.appendFile(side, "\n");
            }

            router.push("]);");

            await FS.appendFile(module, router.join("\n"));
        }
    }

    await Scan();
    await Clean();
    await Write();

    const mapping = await Sort();
    const directories = new Set(mapping.map((element, index, array) => {
        return array[ index ][ ( Object.keys(element).pop() as string ) ].route;
    }));

    const container: { [ $: string ]: ( { title: string, sidebar: string, route: string, import: string } | undefined )[] } = Object.create({});

    for await ( const route of directories ) {
        const target = Path.join(CWD, "." + Path.sep + route);
        /// Is a Directory
        if ( FS.exists(target) ) {
            const index = Path.basename(route);
            const elements = mapping.map((source, number) => {
                const key = Object.keys(source).pop() as string;
                const validations = [
                    Path.basename(route),
                    Path.basename(index),
                    ( index === Path.basename(key) )
                        ? Path.basename(key)
                        : Path.basename(Path.dirname(key))
                ];

                const values = Object.values(source).pop();
                if ( validations.every((value) => value === index) && values ) {
                    return values;
                }
            }).filter(($) => $);

            container[ target ] = elements;
        }

        for ( const [ directory, routes ] of Object.entries(container) ) {
            const local = Path.relative(CWD, Path.join(directory, "routes.json"));
            // const auto = "." + Path.sep + "src" + Path.sep + "." + local;
            const auto = "." + Path.sep + "src" + Path.sep + local;

            const serial = JSON.stringify(routes, null, 4);

            await FS.writeFile(local, serial, "utf-8");
            await FS.writeFile(auto, serial, "utf-8");
        }
    }

    console.log(Utility.inspect(container, { depth: Infinity, colors: true }));

    // console.log(Utility.inspect(router, { depth: Infinity, colors: true }));
}

export default void ( async () => Spline().catch(console.trace) )();

export { Constants } from "./constants";