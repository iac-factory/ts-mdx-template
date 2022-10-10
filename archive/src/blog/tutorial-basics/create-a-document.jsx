/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "Create a Document", sidebar = 2;
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    ul: "ul",
    li: "li",
    h2: "h2",
    code: "code",
    pre: "pre"
  }, props.components);
  return <><_components.h1>{"Create a Document"}</_components.h1>{"\n"}<_components.p>{"Documents are "}<_components.strong>{"groups of pages"}</_components.strong>{" connected through:"}</_components.p>{"\n"}<_components.ul>{"\n"}<_components.li>{"a "}<_components.strong>{"sidebar"}</_components.strong></_components.li>{"\n"}<_components.li><_components.strong>{"previous/next navigation"}</_components.strong></_components.li>{"\n"}<_components.li><_components.strong>{"versioning"}</_components.strong></_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Create your first Doc"}</_components.h2>{"\n"}<_components.p>{"Create a markdown file at "}<_components.code>{"docs/hello.md"}</_components.code>{":"}</_components.p>{"\n"}<_components.pre><_components.code className="language-md">{"# Hello\n\nThis is my **first Docusaurus document**!\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"A new document is now available at "}<_components.code>{"http://localhost:3000/docs/hello"}</_components.code>{"."}</_components.p>{"\n"}<_components.h2>{"Configure the Sidebar"}</_components.h2>{"\n"}<_components.p>{"Docusaurus automatically "}<_components.strong>{"creates a sidebar"}</_components.strong>{" from the "}<_components.code>{"docs"}</_components.code>{" folder."}</_components.p>{"\n"}<_components.p>{"Add metadata to customize the sidebar label and position:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-md">{"---\nsidebar_label: 'Hi!'\nsidebar_position: 3\n---\n\n# Hello\n\nThis is my **first Docusaurus document**!\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"It is also possible to create your sidebar explicitly in "}<_components.code>{"sidebars.js"}</_components.code>{":"}</_components.p>{"\n"}<_components.pre><_components.code className="language-js">{"module.exports = {\n    tutorialSidebar: [\n        {\n            type: 'category',\n            label: 'Tutorial',\n            // highlight-next-line\n            items: [ 'hello' ],\n        },\n    ],\n};\n"}</_components.code></_components.pre></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
