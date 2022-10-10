/***
 * Menu Item Path Normalization
 * ----------------------------
 *
 * @param input {string} Singleton Requirement
 * @param inputs {string[]} Additional String(s)
 *
 * @returns {string}
 *
 */

export function normalize(input: string, ...inputs: string[]): string {
    const Input = (inputs) ? [input, [...inputs].join(" ")].join(" ") : input;
    const upper = Upper(input);
    const Root = (!(upper)) ? String("/" + Input.toString()[0].toLowerCase() + Input.toString().slice(1)).trim() : input.trim();

    const URI = (Upper(input)) ? Root.split(" ").map((partial) => {
        return partial.toString().toLowerCase();
    }).join("/").split("_").map((partial) => {
        return partial.toString().toLowerCase();
    }).join("/").split("-").map((partial) => {
        return partial.toString().toLowerCase();
    }).join("/") : input;

    console.debug("[Debug] (Pathing-Normalization)", Root, URI);

    return (inputs.length > 0) ? URI : Root;
}

export function Upper(input: string) {
    return /^[A-Z]*$/.test(input);
}

export default normalize;