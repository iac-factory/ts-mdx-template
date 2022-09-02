/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "Congratulations", sidebar = 6;
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    a: "a",
    h2: "h2",
    ul: "ul",
    li: "li"
  }, props.components);
  return <><_components.h1>{"Congratulations!"}</_components.h1>{"\n"}<_components.p>{"You have just learned the "}<_components.strong>{"basics of Docusaurus"}</_components.strong>{" and made some changes to the "}<_components.strong>{"initial template"}</_components.strong>{"."}</_components.p>{"\n"}<_components.p>{"Docusaurus has "}<_components.strong>{"much more to offer"}</_components.strong>{"!"}</_components.p>{"\n"}<_components.p>{"Have "}<_components.strong>{"5 more minutes"}</_components.strong>{"? Take a look at "}<_components.strong><_components.a href="../tutorial-extras/manage-docs-versions.md">{"versioning"}</_components.a></_components.strong>{"\nand "}<_components.strong><_components.a href="../tutorial-extras/translate-your-site.md">{"i18n"}</_components.a></_components.strong>{"."}</_components.p>{"\n"}<_components.p>{"Anything "}<_components.strong>{"unclear"}</_components.strong>{" or "}<_components.strong>{"buggy"}</_components.strong>{" in this\ntutorial? "}<_components.a href="https://github.com/facebook/docusaurus/discussions/4610">{"Please report it!"}</_components.a></_components.p>{"\n"}<_components.h2>{"What's next?"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li>{"Read the "}<_components.a href="https://docusaurus.io/">{"official documentation"}</_components.a>{"."}</_components.li>{"\n"}<_components.li>{"Add a custom "}<_components.a href="https://docusaurus.io/docs/styling-layout">{"Design and Layout"}</_components.a></_components.li>{"\n"}<_components.li>{"Add a "}<_components.a href="https://docusaurus.io/docs/search">{"search bar"}</_components.a></_components.li>{"\n"}<_components.li>{"Find inspirations in the "}<_components.a href="https://docusaurus.io/showcase">{"Docusaurus showcase"}</_components.a></_components.li>{"\n"}<_components.li>{"Get involved in the "}<_components.a href="https://docusaurus.io/community/support">{"Docusaurus Community"}</_components.a></_components.li>{"\n"}</_components.ul></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
