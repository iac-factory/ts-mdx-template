/***
 * @module Debugger
 */
export module Debugger {
    /***
     * Debugger utility
     *
     * @param context
     * @param information
     */
    export async function debug (context: string, ...information: (object | number | null | symbol | string | boolean)[]): Promise<void> {
        const Utility = await import("util");
        return void console.debug("[Debug]", "(" + context + ")", ...information.map((entity) => Utility.inspect(entity, {
            depth: Infinity,
            colors: true,
            sorted: true
        })));
    }
}