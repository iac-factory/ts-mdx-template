/***
 * Extract Form Data Field(s) + Values
 * ---
 *
 * @constructor
 * @param elements
 */
export const Extractor: (elements: HTMLFormControlsCollection) => { [p: string]: string } = function (elements) {
    const instance = Object.create({});

    instance.count = 0;
    instance.fields = [] as { key: any, value: any }[];

    for (void 0; instance.count < elements.length; instance.count++) {
        const field: HTMLInputElement = elements.item(instance.count) as HTMLInputElement;
        instance.fields.push({
            [field.name ?? field.id]: {
                key: field.name ?? field.id,
                value: field.value
            }
        });
    }

    const abstract: { [key: string]: string } = {};
    instance.fields.forEach((field: { key: any, value: any }) => {
        for (const [key, kv] of Object.entries(field)) {
            const assignment: { key: string, value: string } = kv as { key: string, value: string };

            Object.assign(abstract, {[key]: assignment.value});
        }
    });

    return {...abstract} as const;
};

export default Extractor;