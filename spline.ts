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
            $: {
                source: Path.join(cwd, [filename, "mdx"].join(".")),
                destination: Path.join(cwd, [filename, "jsx"].join("."))
            },
            get targets() {
                return [ this.$.source, this.$.destination ];
            },
            get directory() {
                const resolver = Path.relative(cwd, process.cwd());

                return (resolver !== "") ? resolver : ".";
            },
            get source() {
                return [Path.relative(this.directory, this.$.source), this.$.source];
            },
            get destination() {
                return [Path.relative(this.directory, this.$.destination), this.$.destination];
            }
        };

        const { source, destination, directory } = pathing;

        const raw = await read(source[0]);

        const configuration = YAML.parseAllDocuments(raw, {
            schema: "core"
        });

        const content = MDX.compileSync(raw, {
            jsx: true, remarkPlugins: [
                (await import("remark-frontmatter")).default,
                (await import("remark-mdx-frontmatter")).default
            ]
        }).toString("utf-8");

        const [_, Scaler] = Object.entries(configuration[0].contents || {}).splice(0, 1).pop() ?? [];

        for (const {key, value} of Scaler ?? []) {
            metadata[key.value] = value.source;
        }

        metadata["$"] = { directory, source, destination };

        void await FS.writeFile(destination[0], content, {encoding: "utf-8"});

        return metadata;
    };

    debug("Metadata", await Compile("example"));
    debug("Metadata", await Compile("example-2"));
}

export default void (async () => Spline().catch(console.trace))();