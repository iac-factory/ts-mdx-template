import {Reader} from "./reader";
import {Exports} from "./exports";
import {Debugger} from "./debugger";
import {Utilities} from "./utilities";
import {Constants} from "./constants";

export module Compilation {
    class MDX {
        public metadata = Object.create({});

        private static readonly src = Constants.Source + "/";
        private static readonly destination = Constants.Destination + "/";

        /***
         * File Descriptor
         */
        private readonly filename: string;

        constructor(filename: string) {
            this.filename = filename;
        }

        /***
         * Source Path of MDX File
         */
        private async source() {
            const {Path} = await Exports.modules();

            return {
                directory: Path.dirname(this.filename), file: this.filename
            };
        }

        /***
         * Target Directory for Compiled Asset(s)
         */
        private async destination() {
            const {Path} = await Exports.modules();

            const descriptor = await Utilities.Strip(this.filename);

            const file = [descriptor, "jsx"].join(".");

            const directory = Path.dirname(await Utilities.Normalize(this.filename));

            return {directory, file};
        }

        /***
         * Source + destination directories + files
         *
         * @private
         */
        private async handlers() {
            return {
                source: await this.source(),
                destination: await this.destination()
            };
        }

        /***
         * Raw File Contents of Target Compilation
         */
        private async read(): Promise<string> {
            return Reader.read(this.filename);
        }

        private async compile() {
            const {Path, FS, System} = await Exports.modules();

            if (await Utilities.Markdown(this.filename)) {
                const {content} = await this.content();
                const {configuration} = await this.yaml();
                const {source, destination} = await this.handlers();

                const {file, directory} = destination;

                (!System.existsSync(directory)) && await FS.mkdir(directory, {recursive: true});

                const target = Path.join(directory, file);

                await FS.writeFile(target, content, {encoding: "utf-8"});

                return {
                    configuration, content, pathing: {
                        source, destination
                    }
                };
            }
        }

        public static categorize(pathing: string) {
            const relative = pathing.replace(MDX.destination, "");
            const partials = relative.split("/");
            return partials;
        }

        public static async compile(path: string) {
            const target = new MDX(path);

            const output = await target.compile();

            return Object.create({...output, ...target.metadata});
        }

        /***
         * MDX YAML Front-Matter
         *
         * @see {@link https://mdxjs.com/guides/frontmatter/ Front-Matter}
         *
         * @private
         */
        private async yaml() {
            const {YAML} = await Exports.modules();

            const configuration = YAML.parseAllDocuments(await this.read(), {
                schema: "core"
            });

            const [_, Scaler] = Object.entries(configuration[0].contents || {}).splice(0, 1).pop() ?? [];
            for (const {key, value} of Scaler ?? []) {
                this.metadata[key.value] = value.source;
            }

            return {configuration};
        }

        /***
         * Raw MDX Content
         *
         * @see {@link https://mdxjs.com/guides/mdx-on-demand MDX}
         *
         * @private
         */
        private async content() {
            const {MDX} = await Exports.modules();

            const content = MDX.compileSync(await this.read(), {
                jsx: true, remarkPlugins: [
                    (await import("remark-frontmatter")).default,
                    (await import("remark-mdx-frontmatter")).default,
                    (await import("remark-toc")).default
                ]
            }).toString("utf-8");

            return {content};
        }
    }

    /***
     * MDX Compiler + File Metadata
     *
     * @param path
     */
    export async function mdx(path: string) {
        return MDX.compile(path);
    }
}