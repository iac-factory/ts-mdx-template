declare module "*.mdx" {
    import { MDXProps } from "mdx/types";

    /**
     * A function component which renders the MDX content using JSX.
     *
     * @param props Available as the named variable `props` inside the MDX component.
     * @returns A JSX element. May depend on the project configuration. I.e. it
     * could be a React, Preact, or Vuex element.
     */
    export default function Markdown( props: MDXProps ): JSX.Element;
}