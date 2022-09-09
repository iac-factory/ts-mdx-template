import {Reader} from "./reader";
import {Exports} from "./exports";
import {Compilation} from "./compilation";

export async function Spline() {
    const {Path, System, FS} = await Exports.modules();

    const exports: { [$: string]: string[] } = {};
    const imports: { [$: string]: string[] } = {};

    async function Scan() {
        for await (const target of await Reader.scan(Path.join(process.cwd(), "documentation"))) {
            if (target.properties.file) {
                const {path} = target;

                const compilation = await Compilation.mdx(path);

                const {destination} = compilation?.pathing ?? {destination: null};

                async function hydrate(object: any, indexer: string) {
                    if (!(Array.isArray(object[indexer]))) {
                        object[indexer] = [];
                    }
                }

                if (destination) {
                    await hydrate(exports, destination.directory);
                    await hydrate(imports, destination.directory);

                    const injection = Path.basename(destination.file, ".jsx");

                    exports[destination.directory].push(injection);
                }
            }
        }
    }

    async function Clean() {
        for (const directory in exports) {
            await FS.rm(Path.join(directory, "index.js"), {force: true});
            await FS.rm(Path.join(directory, "sidebar.jsx"), {force: true});
        }
    }

    async function Write() {
        for (const directory in exports) {
            const preface = [
                "/***",
                " * " + "The following file was auto-generated from spline.ts.",
                " * " + "Ensure to avoid any manual update(s) or change(s); line",
                " * " + "items are derived from the file-structure found in",
                " * " + "the \"./documentation\" directory.",
                " */"
            ].join("\n");

            const module = Path.join(directory, "index.js");
            const side = Path.join(directory, "sidebar.jsx");

            (System.existsSync(module)) || await FS.writeFile(module, preface + "\n".repeat(2));
            (System.existsSync(side)) || await FS.writeFile(side, preface + "\n".repeat(2));

            for (const injection of exports[directory]) {
                const partials = injection.split("-");

                const string = {value: ""};
                for (var iterator = 0; iterator < partials.length; iterator++) {

                    if (iterator !== 0) {
                        const character = partials[iterator].substring(0, 1).toUpperCase();
                        string.value += character + partials[iterator].substring(1, partials[iterator].length);
                    } else {
                        string.value += partials[0];
                    }

                }

                imports[directory].push(string.value);

                const exporter = "export * as" + " " + string.value + " " + "from" + " " + "\"./" + injection + "\"" + ";";
                const importer = "import * as" + " " + string.value + " " + "from" + " " + "\"./" + injection + "\"" + ";";

                await FS.appendFile(module, exporter + "\n");
                await FS.appendFile(side, importer + "\n");

                await FS.appendFile(module, "\n");
                await FS.appendFile(side, "\n");
            }
        }
    }

    async function Sidebars() {
        for (const directory in imports) {
            const side = Path.join(directory, "sidebar.jsx");

            await FS.appendFile(Path.join(directory, "index.js"), "export * as Sidebar from \"./sidebar\"" + ";");

            const test = `export function Sidebar() {
    const array = [${imports[directory]}];

    const compare = (comparator, comparison) => {
        if (comparator.sidebar < comparison.sidebar) {
            return -1;
        } else if (comparator.sidebar > comparison.sidebar) {
            return 1;
        }

        return 0;
    };

    const list = array.sort(compare);

    const Component = () => list.map((component, index) => {
        const position = component.sidebar;

        const Element = () => {
            return (
                <>
                <span>
                    {
                        component.title
                    }
                </span>
                    <hr/>
                </>
            )
        };

        return (
            <Element key={index}/>
        )
    });

    return <Component/>;
}

export default Sidebar;
`;
            await FS.appendFile(side, test);
        }
    }

    await Scan();
    await Clean();
    await Write();
    await Sidebars();
}

export default void (async () => Spline().catch(console.trace))();