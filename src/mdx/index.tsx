import React, {Suspense} from "react";

import Language from "./languages";

import styles from "./index.module.scss";

import "highlight.js/scss/github-dark.scss";
import {MDXProps} from "mdx/types";

/***
 * The MDX (Markdown) Content + Runtime Injections
 * ---
 *
 * @returns {JSX.Element}
 * @constructor
 */
export const MDX = ({$}: { $: typeof import("*.mdx").default }) => {
    const load = async () => {
        const classes = Object.keys(Language).map((mapping) => document.getElementsByClassName(["language", mapping].join("-")));

        classes.forEach((language) => {
            for (const [_, block] of Object.entries(language)) {
                const worker = new Worker(["", "web-workers", "highlighting.js"].join("/"));
                worker.onmessage = function (event) {
                    block.innerHTML = event.data;
                };

                worker.postMessage(block.textContent);
            }
        });
    };

    React.useEffect(() => {
        const state = {
            subscription: true
        };

        const render = async () => {
            if (state.subscription) {
                void await load();
            }
        };

        render().catch(console.error);

        return (() => {
            state.subscription = false;

            return void null;
        });
    }, []);

    return (
        <section className={styles.content}>
            <$/>
        </section>
    );
};

export const Markdown = ({content}: { content: { (props: MDXProps): JSX.Element, (props: MDXProps): JSX.Element } }) => {
    return (
        <MDX $={content}/>
    );
};

export default Markdown;