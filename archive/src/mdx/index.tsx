import React, { ReactElement, Suspense } from "react";

import CX from "classnames";

const CXS = CX.bind(styles);

import Language from "./languages";

import styles from "./index.module.scss";

import "highlight.js/scss/github-dark.scss";

import type { MDXProps } from "mdx/types";
import { Outlet } from "react-router-dom";

// import E from "./example";

/***
 * The MDX (Markdown) Content + Runtime Injections
 * ---
 *
 * @returns {JSX.Element}
 * @constructor
 */
const MDX = ({$}: {$: any}) => {
    const styling = CXS({}, styles.content);

    const load = async () => {
        const classes = Object.keys(Language).map((mapping) => document.getElementsByClassName([ "language", mapping ].join("-")));

        classes.forEach((language) => {
            for ( const [ _, block ] of Object.entries(language) ) {
                const worker = new Worker([ "", "web-workers", "highlighting.js" ].join("/"));
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
            if ( state.subscription ) {
                void await load();
            }
        };

        render().catch(console.error);

        return ( () => {
            state.subscription = false;

            return void null;
        } );
    }, []);

    return (
        <section className={ styling }>
            <$/>
        </section>
    );
};

export const Markdown = ({content}: { content: { (props?: MDXProps): JSX.Element, (props?: MDXProps): JSX.Element } | ReactElement }) => {
    return (
        <MDX $={content}/>
    );
};

export default Markdown;