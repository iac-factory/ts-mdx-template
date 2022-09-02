async function Reader(directory: string) {
    const FS = await import("fs");
    const Path = await import("path");
    const Documentation = Path.relative(process.cwd(), directory);

    function schema(location?: string, file?: (import("fs").Stats | import("fs").Dirent) & { name?: string }, destination?: string): Descriptor {
        const canonical = (location || file) ? Path.resolve(location!, file!.name!) : Path.resolve(location!);

        return {
            name: Path.basename(canonical),
            path: canonical,
            relative: Documentation + Path.sep + Path.relative(Documentation, canonical),
            properties: {
                file: file?.isFile() ?? false,
                directory: file?.isDirectory() ?? false,
                socket: file?.isSocket() ?? false,
                symbolic: file?.isSymbolicLink() ?? false
            }
        };
    }

    const scan = (source: string, collection?: Descriptor[], debug?: boolean) => {
        const reference = (collection) ? collection : [];

        const descriptors = FS.readdirSync(source, {withFileTypes: true});

        for (const descriptor of descriptors) {
            const Directory = descriptor?.isDirectory() || false;

            const Link = descriptor?.isSymbolicLink() || false;
            const Socket = descriptor?.isSocket() || false;
            const File = descriptor?.isFile() || false;

            (Directory) && (debug) && console.log("[Debug] [Read] Directory", descriptor.name);
            (Directory) && reference.push(schema(source, descriptor));
            (Directory) && scan(Path.join(source, descriptor.name), reference);

            (Socket) && (debug) && console.log("[Debug] [Read] Socket", descriptor.name);
            (Socket) && reference.push(schema(source, descriptor));

            (Link) && (debug) && console.log("[Debug] [Read] Symbolic Link", descriptor.name);
            (Link) && reference.push(schema(source, descriptor));

            (File) && (debug) && console.log("[Debug] [Read] File", descriptor.name);
            (File) && reference.push(schema(source, descriptor));
        }

        return reference;
    };

    function scanner(directory: string) {
        return scan(directory);
    }

    type Property = {
        readonly file: boolean,
        readonly directory: boolean,
        readonly socket: boolean,
        readonly symbolic: boolean
    };

    type Descriptor = {
        readonly name: string,
        readonly path: string,
        readonly relative: string,
        readonly properties: Property
    };

    return scanner(directory);
}

export async function Spline() {
    const OS = await import("os");
    const Path = await import("path");
    const System = await import("fs");
    const Utility = await import("util");
    const YAML = await import("yaml");

    const MDX = await import("@mdx-js/mdx");

    /*** Extend `*.promises` to include `existsSync` */
    const FS = new Proxy({exists: (await import("fs")).existsSync, ...System.promises}, {});

    /*** Current Process' Working Directory */
    const CWD = await FS.realpath(process.cwd(), {});

    const read = async (path: string) => FS.readFile(path, {encoding: "utf-8"});
    const debug = (context: string, ...information: (object | number | null | symbol | string)[]) => {
        void console.debug("[Debug]", "(" + context + ")", ...information.map((entity) => Utility.inspect(entity, {
            depth: Infinity,
            colors: true,
            sorted: true
        })));
    };

    void debug("CWD", CWD);

    const Compile = async (filename: string, cwd: string = CWD) => {
        const metadata = Object.create({});

        const pathing = {
            /*** Source Path of MDX File */
            get source() {
                const directory = Path.dirname(filename);

                return {directory, file: filename};
            },
            /*** Target Directory for Compiled Asset(s) */
            get destination() {
                const directory = Path.dirname(filename);
                // const directory = Path.join(this.cwd, "src", ".documentation");

                const file = Path.join(directory, [Path.basename(filename.replace(".mdx", "").replace(".md", ""), ".jsx"), "jsx"].join("."));

                return {directory, file};
            },
            get cwd() {
                const resolver = Path.relative(cwd, process.cwd());

                return (resolver !== "") ? resolver : ".";
            }
        };

        const {source, destination} = pathing;

        const raw = await read(source.file);

        const configuration = YAML.parseAllDocuments(raw, {
            schema: "core"
        });

        const content = MDX.compileSync(raw, {
            jsx: true, remarkPlugins: [
                (await import("remark-frontmatter")).default,
                (await import("remark-mdx-frontmatter")).default,
                (await import("remark-toc")).default
            ]
        }).toString("utf-8");

        const [_, Scaler] = Object.entries(configuration[0].contents || {}).splice(0, 1).pop() ?? [];
        for (const {key, value} of Scaler ?? []) {
            metadata[key.value] = value.source;
        }

        (!System.existsSync(destination.directory)) && await FS.mkdir(destination.directory, {recursive: true});

        await FS.writeFile(destination.file, content, {encoding: "utf-8"});

        return metadata;
    };

    const Run = async function () {
        const sidebar: { [$: string]: { [$: string]: string }[] } = {};
        const exports: { [$: string]: string[] } = {};
        const imports: { [$: string]: string[] } = {};

        const strip = (input: string) => {
            const extensions = [
                ".jsx", ".mdx", ".md"
            ];

            extensions.forEach((extension) => {
                input = input.replace(extension, "");
            });

            return input;
        };

        const markdown = (path: string) => {
            const iterable = [
                Path.extname(path).includes("mdx"),
                Path.extname(path).includes("md")
            ];

            for (const test of iterable) {
                if (test) return true;
            }
        };

        const jsx = (path: string) => {
            const iterable = [
                Path.extname(path).includes("jsx")
            ];

            for (const test of iterable) {
                if (test) return true;
            }
        };

        for await (const target of await Reader("documentation")) {
            const path = Path.dirname(target.path);

            const directory = Path.join("src", Path.relative(process.cwd(), path.replace("documentation", ".documentation")));

            if (!(Array.isArray(sidebar[directory]))) {
                const data = Path.relative(process.cwd(), Path.join(path, "metadata.json"));
                const metadata = JSON.parse(await FS.readFile(Path.join(process.cwd(), data), {encoding: "utf-8"}));

                sidebar[directory] = [];

                Reflect.set(sidebar[directory], "prototype", {...metadata});
            }

            if (!(Array.isArray(exports[directory]))) {
                exports[directory] = [];
            }

            if (!(Array.isArray(imports[directory]))) {
                imports[directory] = [];
            }
        }

        for await (const target of await Reader("documentation")) {
            const {name} = target;
            const {path} = target;
            const {relative: context} = target;

            const directory = Path.join("src", Path.relative(process.cwd(), Path.dirname(path).replace("documentation", ".documentation")));

            if (markdown(path) && target.properties.file) {
                const $ = await Compile(context);

                sidebar[directory].push({...$, ...{url: Path.join(Reflect.get(sidebar[directory], "prototype").module, strip(name)), name: strip(name)}});

                debug(context, $);
            } else if (jsx(path) && target.properties.file) {
                await FS.rm(path);
            }
        }

        const descriptors = await Reader("documentation");
        for await (const target of descriptors) {
            const {path} = target;
            const {relative: context} = target;

            if (jsx(path) && target.properties.file) {
                const destination = Path.relative(process.cwd(), Path.join(process.cwd(), "src", context.replace("documentation", ".documentation")));

                const name = Path.basename(destination, ".jsx");

                const directory = Path.dirname(destination);

                exports[directory].push(name);

                (!(System.existsSync(directory))) && await FS.mkdir(directory);

                await FS.rename(context, destination);
            }
        }

        for (const directory in exports) {
            const preface = [
                "/***",
                " * " + "The following file was auto-generated from spline.ts.",
                " * " + "Ensure to avoid any manual update(s) or change(s); line",
                " * " + "items are derived from the file-structure found in",
                " * " + "the `./src/documentation` directory.",
                " */"
            ].join("\n");

            const module = Path.join(directory, "index.js");

            await FS.writeFile(module, preface + "\n".repeat(2));

            for (const handler of exports[directory]) {
                const string = {value: ""};

                const partials = handler.split("-");

                const element = exports[directory].indexOf(handler);

                for (var index = 0; index < partials.length; index++) {
                    if (index !== 0) {
                        const character = partials[index].substring(0, 1).toUpperCase();
                        string.value += character + partials[index].substring(1, partials[index].length);
                    } else {
                        string.value += partials[0];
                    }
                }

                imports[directory].push(string.value);

                const line = "export * as" + " " + string.value + " " + "from" + " " + "\"./" + handler + "\"" + ";";

                Reflect.set(sidebar[directory][element], "export", string.value);

                await FS.appendFile(module, line + "\n");
            }

            console.log(Utility.inspect({exports}, {colors: true, depth: Infinity}));
            console.log(Utility.inspect({imports}, {colors: true, depth: Infinity}));
            console.log(Utility.inspect({sidebar}, {colors: true, depth: Infinity}));
        }
    };

    await Run();

    // debug("Compile", await Compile("./documentation/introduction"));

    // debug("Metadata", await Compile("example"));
    // debug("Metadata", await Compile("example-2"));
}

export default void (async () => Spline().catch(console.trace))();