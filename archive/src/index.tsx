import "./index.scss";

import React from "react";

import { RouterProvider as Provider } from "react-router-dom";

import { createRoot } from "react-dom/client";

import { Vitals } from "./vitals";

import MDX from "./blog";

const Client = (identifier: string = "Application", Application: () => JSX.Element & React.LazyExoticComponent<() => JSX.Element>) => {
    const element = document.getElementById(identifier);

    if ( !( element ) ) throw new Error("Unable to Hydrate Web-Application");

    return createRoot(element).render(
        (
            <React.StrictMode>
                <Provider router={ MDX }/>
            </React.StrictMode>
        )
    );
};

/*** @ts-ignore */
Client("Application", React.lazy(() => import("./application")));

void Vitals(console.debug);
