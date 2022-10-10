import {Exports} from "./exports";

export module Utilities {
    export async function Strip(string: string) {
        const {Path} = await Exports.modules();

        const extensions = [
            ".jsx", ".mdx", ".md"
        ];

        extensions.forEach((extension) => {
            string = string.replace(extension, "compilation");
        });

        return Path.basename(string, "compilation");
    }

    /***
     * Construct a `string` from the current working directory's relative path + the target compilation folder.
     *
     * @param string
     * @constructor
     */
    export async function Normalize(path: string) {
        const {Path} = await Exports.modules();

        const descriptor = Path.basename(path);
        const directory = Path.dirname(path);
        
        const target = (directory !== ".") ? Path.join("src", Path.relative(process.cwd(), directory.replace("documentation", ".documentation"))) : Path.join("src", ".documentation");

        return Path.join(target, descriptor);
    }

    export async function JSX(path: string) {
        const {Path} = await Exports.modules();

        const iterable = [
            Path.extname(path).includes("jsx")
        ];

        for (const test of iterable) {
            if (test) return true;
        }

    }

    export async function Markdown(path: string) {
        const {Path} = await Exports.modules();

        const iterable = [
            Path.extname(path).includes("mdx"),
            Path.extname(path).includes("md")
        ];

        for (const test of iterable) {
            if (test) return true;
        }
    }
}