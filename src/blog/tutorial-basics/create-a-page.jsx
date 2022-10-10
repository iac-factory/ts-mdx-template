/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "Create a Page", sidebar = 1;
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    code: "code",
    ul: "ul",
    li: "li",
    h2: "h2",
    pre: "pre"
  }, props.components);
  return <><_components.h1>{"Create a Page"}</_components.h1>{"\n"}<_components.p>{"Add "}<_components.strong>{"Markdown or React"}</_components.strong>{" files to "}<_components.code>{"src/pages"}</_components.code>{" to create a "}<_components.strong>{"standalone page"}</_components.strong>{":"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li><_components.code>{"src/pages/index.js"}</_components.code>{" -> "}<_components.code>{"localhost:3000/"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"src/pages/foo.md"}</_components.code>{" -> "}<_components.code>{"localhost:3000/foo"}</_components.code></_components.li>{"\n"}<_components.li><_components.code>{"src/pages/foo/bar.js"}</_components.code>{" -> "}<_components.code>{"localhost:3000/foo/bar"}</_components.code></_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Create your first React Page"}</_components.h2>{"\n"}<_components.p>{"Create a file at "}<_components.code>{"src/pages/my-react-page.js"}</_components.code>{":"}</_components.p>{"\n"}<_components.pre><_components.code className="language-jsx">{"import React from 'react';\nimport Layout from '@theme/Layout';\n\nexport default function MyReactPage() {\n    return (\n        <Layout>\n            <h1>My React page</h1>\n            <p>This is a React page</p>\n        </Layout>\n    );\n}\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"A new page is now available at "}<_components.code>{"http://localhost:3000/my-react-page"}</_components.code>{"."}</_components.p>{"\n"}<_components.h2>{"Create your first Markdown Page"}</_components.h2>{"\n"}<_components.p>{"Create a file at "}<_components.code>{"src/pages/my-markdown-page.md"}</_components.code>{":"}</_components.p>{"\n"}<_components.pre><_components.code className="language-mdx">{"# My Markdown page\n\nThis is a Markdown page\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"A new page is now available at "}<_components.code>{"http://localhost:3000/my-markdown-page"}</_components.code>{"."}</_components.p></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
