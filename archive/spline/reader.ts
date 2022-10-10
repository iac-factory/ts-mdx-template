import { Constants } from ".";

/***
 * @module Reader
 */
export module Reader {
    /***
     * Documentation directory, getter
     *
     * @param directory {@type string}
     * @constructor
     * @private
     */
    async function Documentation (directory: string) {
        return (await import("path")).relative(process.cwd(), directory);
    }

    /***
     * A transformer function that mutates {@link FS.readdirSync} iterables into a {@link Descriptor} array data-structure.
     *
     * @param location
     * @param file
     * @param destination
     *
     * @return {@type Array<Descriptor>}
     */
    async function schema(location: string, file?: (import("fs").Stats | import("fs").Dirent) & { name?: string }, destination?: string): Promise<Reader.Descriptor> {
        const Path = await import("path");

        const canonical = (location || file) ? Path.resolve(location!, file!.name!) : Path.resolve(location!);
        const parent = Path.dirname(canonical);

        return {
            name: Path.basename(canonical),
            path: Path.relative(process.cwd(), canonical),
            parent: Path.relative(process.cwd(), parent),
            descriptor: await Documentation(canonical),
            properties: {
                file: file?.isFile() ?? false,
                directory: file?.isDirectory() ?? false,
                socket: file?.isSocket() ?? false,
                symbolic: file?.isSymbolicLink() ?? false
            }
        } as Descriptor;
    }

    /***
     * An internal function that calls itself recursively, passing in a stateful array of file-descriptors.
     *
     * @see {@link Reader} for the interface.
     *
     * @param source
     * @param collection
     * @param debug
     */
    async function parse (source: string = Constants.Source, collection?: Descriptor[], debug?: boolean): Promise<Reader.Descriptors> {
        const FS = await import("fs");
        const Path = await import("path");

        const reference = (collection) ? collection : [];

        const descriptors = FS.readdirSync(source, {withFileTypes: true});

        for (const descriptor of descriptors) {
            const Directory = descriptor?.isDirectory() || false;

            const Link = descriptor?.isSymbolicLink() || false;
            const Socket = descriptor?.isSocket() || false;
            const File = descriptor?.isFile() || false;

            (Directory) && (debug) && console.log("[Debug] [Read] Directory", descriptor.name);
            (Directory) && reference.push(await schema(source, descriptor));
            (Directory) && await parse(Path.join(source, descriptor.name), reference);

            (Socket) && (debug) && console.log("[Debug] [Read] Socket", descriptor.name);
            (Socket) && reference.push(await schema(source, descriptor));

            (Link) && (debug) && console.log("[Debug] [Read] Symbolic Link", descriptor.name);
            (Link) && reference.push(await schema(source, descriptor));

            (File) && (debug) && console.log("[Debug] [Read] File", descriptor.name);
            (File) && reference.push(await schema(source, descriptor));
        }

        return reference;
    }

    /***
     * File Reader Function
     *
     * @param path
     */
    export async function read (path: string): Promise<string> {
        const FS = await import("fs/promises");

        return FS.readFile(path, {encoding: "utf-8"});
    }

    /***
     * A recursive system directory reader function that will iterate over file-descriptors and return a {@link Descriptor}
     * array data-structure.
     *
     * @param directory
     *
     * @constructor
     */
    export async function scan(directory: string): Promise<Reader.Descriptors> {
        return parse(directory);
    }

    export type Property = {
        readonly file: boolean,
        readonly directory: boolean,
        readonly socket: boolean,
        readonly symbolic: boolean
    };

    export type Descriptor = {
        readonly name: string,
        readonly path: string,
        readonly parent: string,
        readonly descriptor: string,
        readonly properties: Property
    };

    export type Descriptors = Reader.Descriptor[];
}