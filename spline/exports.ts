export module Exports {
    export async function modules () {
        const OS = await import("os");
        const Path = await import("path");
        const System = await import("fs");
        const Utility = await import("util");
        const YAML = await import("yaml");

        const MDX = await import("@mdx-js/mdx");

        /*** Extend `import("fs").promises` to include `existsSync` - monkey patch */
        const FS = new Proxy({exists: (await import("fs")).existsSync, ...System.promises}, {});

        /*** Current Process' Working Directory */
        const CWD = await FS.realpath(process.cwd(), {});

        return { OS, Path, System, Utility, YAML, MDX, FS, CWD };
    }
}