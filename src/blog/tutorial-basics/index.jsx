/***
 * The following file was auto-generated from spline.ts.
 * Ensure to avoid any manual update(s) or change(s); line
 * items are derived from the file-structure found in
 * the "./documentation" directory.
 */

import React from "react";

import { createBrowserRouter as Router } from "react-router-dom";

export * as congratulations from "./congratulations";
import {default as congratulations} from "./congratulations";

export * as createABlogPost from "./create-a-blog-post";
import {default as createABlogPost} from "./create-a-blog-post";

export * as createADocument from "./create-a-document";
import {default as createADocument} from "./create-a-document";

export * as createAPage from "./create-a-page";
import {default as createAPage} from "./create-a-page";

export * as deployYourSite from "./deploy-your-site";
import {default as deployYourSite} from "./deploy-your-site";

export * as markdownFeatures from "./markdown-features";
import {default as markdownFeatures} from "./markdown-features";

export default Router([
    {
        path: "congratulations",
        element: congratulations()
    },
    {
        path: "create-a-blog-post",
        element: createABlogPost()
    },
    {
        path: "create-a-document",
        element: createADocument()
    },
    {
        path: "create-a-page",
        element: createAPage()
    },
    {
        path: "deploy-your-site",
        element: deployYourSite()
    },
    {
        path: "markdown-features",
        element: markdownFeatures()
    },
]);