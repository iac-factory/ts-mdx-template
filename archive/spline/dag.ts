export class Abstract {
    children?: Abstract[];

    constructor(readonly path: string, readonly element: string, parent?: Abstract, children?: Abstract[]) {
        this.children = children;

        (parent) && ((parent.children) && parent.children.push(this) || Reflect.set(parent, "children", [ this ]));

        if (!(this.children)) {
            delete this.children;
        }
    }

    get json() {
        return JSON.stringify(this, null, 4);
    }

    walk() {
        if (!(Reflect.get(this.walk, "children"))) {
            Reflect.set(this.walk, "children", []);
        }

        const children: Abstract[] = Reflect.get(this.walk, "children");

        (this.children) && (() => {
            for (const child of this.children) {
                children.push(child);

                child.walk();
            }

            Reflect.set(this.walk, "children", children);
        })();

        const data = Array.from([this, ... Reflect.get(this.walk, "children") as Abstract[]]);

        Reflect.set(this.walk, "children", null);



        return data;
    }
}

export default Abstract;


void (async () => {
    const parent = new Abstract("root", "<Dashboard />");

    const child = new Abstract("child-1", "<Dashboard />", parent);

    new Abstract("child-3", "<Dashboard />", child);

    new Abstract("child-2", "<Dashboard />", parent);

    console.log(parent.json);

    // for (const walker of parent.walk()) {
    //     console.log(walker.json);
    // }
    //
    // console.log(parent.walk());
})();