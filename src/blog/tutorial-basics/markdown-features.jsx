/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "Markdown Features", sidebar = 4;
export const Highlight = ({children, color}) => <span style={{
  backgroundColor: color,
  borderRadius: '20px',
  color: '#fff',
  padding: '10px',
  cursor: 'pointer'
}} onClick={() => {
  alert(`You clicked the color ${color} with label ${children}`);
}}>
    {children}
  </span>;
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    a: "a",
    h2: "h2",
    pre: "pre",
    code: "code",
    img: "img"
  }, props.components);
  return <><_components.h1>{"Markdown Features"}</_components.h1>{"\n"}<_components.p>{"Docusaurus supports "}<_components.strong><_components.a href="https://daringfireball.net/projects/markdown/syntax">{"Markdown"}</_components.a></_components.strong>{" and a few "}<_components.strong>{"additional features"}</_components.strong>{"."}</_components.p>{"\n"}<_components.h2>{"Front Matter"}</_components.h2>{"\n"}<_components.p>{"Markdown documents have metadata at the top called "}<_components.a href="https://jekyllrb.com/docs/front-matter/">{"Front Matter"}</_components.a>{":"}</_components.p>{"\n"}<_components.pre><_components.code className="language-text">{"// highlight-start\n---\nid: my-doc-id\ntitle: My document title\ndescription: My document description\nslug: /my-custom-url\n---\n// highlight-end\n\n## Markdown heading\n\nMarkdown text with [links](./hello.md)\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Links"}</_components.h2>{"\n"}<_components.p>{"Regular Markdown links are supported, using url paths or relative file paths."}</_components.p>{"\n"}<_components.pre><_components.code className="language-md">{"Let's see how to [Create a page](/create-a-page).\n"}</_components.code></_components.pre>{"\n"}<_components.pre><_components.code className="language-md">{"Let's see how to [Create a page](./create-a-page.md).\n"}</_components.code></_components.pre>{"\n"}<_components.p><_components.strong>{"Result:"}</_components.strong>{" Let's see how to "}<_components.a href="./create-a-page.md">{"Create a page"}</_components.a>{"."}</_components.p>{"\n"}<_components.h2>{"Images"}</_components.h2>{"\n"}<_components.p>{"Regular Markdown images are supported."}</_components.p>{"\n"}<_components.p>{"You can use absolute paths to reference images in the static directory ("}<_components.code>{"static/img/docusaurus.png"}</_components.code>{"):"}</_components.p>{"\n"}<_components.pre><_components.code className="language-md">{"![Docusaurus logo](/img/docusaurus.png)\n"}</_components.code></_components.pre>{"\n"}<_components.p><_components.img src="/img/docusaurus.png" alt="Docusaurus logo" /></_components.p>{"\n"}<_components.p>{"You can reference images relative to the current file as well, as shown in "}<_components.a href="../tutorial-extras/manage-docs-versions.md">{"the extra guides"}</_components.a>{"."}</_components.p>{"\n"}<_components.h2>{"Code Blocks"}</_components.h2>{"\n"}<_components.p>{"Markdown code blocks are supported with Syntax highlighting."}</_components.p>{"\n"}<_components.pre><_components.code className="language-jsx">{"function HelloDocusaurus() {\n    return (\n        <h1>Hello, Docusaurus!</h1>\n    )\n}\n"}</_components.code></_components.pre>{"\n"}<_components.pre><_components.code className="language-jsx">{"function HelloDocusaurus() {\n  return <h1>Hello, Docusaurus!</h1>;\n}\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"Admonitions"}</_components.h2>{"\n"}<_components.p>{"Docusaurus has a special syntax to create admonitions and callouts:"}</_components.p>{"\n"}<_components.p>{":::tip My tip"}</_components.p>{"\n"}<_components.p>{"Use this awesome feature option"}</_components.p>{"\n"}<_components.p>{":::"}</_components.p>{"\n"}<_components.p>{":::danger Take care"}</_components.p>{"\n"}<_components.p>{"This action is dangerous"}</_components.p>{"\n"}<_components.p>{":::"}</_components.p>{"\n"}<_components.p>{":::tip My tip"}</_components.p>{"\n"}<_components.p>{"Use this awesome feature option"}</_components.p>{"\n"}<_components.p>{":::"}</_components.p>{"\n"}<_components.p>{":::danger Take care"}</_components.p>{"\n"}<_components.p>{"This action is dangerous"}</_components.p>{"\n"}<_components.p>{":::"}</_components.p>{"\n"}<_components.h2>{"MDX and React Components"}</_components.h2>{"\n"}<_components.p><_components.a href="https://mdxjs.com/">{"MDX"}</_components.a>{" can make your documentation more "}<_components.strong>{"interactive"}</_components.strong>{" and allows using any "}<_components.strong>{"React components inside Markdown"}</_components.strong>{":"}</_components.p>{"\n"}<_components.pre><_components.code className="language-jsx">{"export const Highlight = ({children, color}) => (\n  <span\n    style={{\n      backgroundColor: color,\n      borderRadius: '20px',\n      color: '#fff',\n      padding: '10px',\n      cursor: 'pointer',\n    }}\n    onClick={() => {\n      alert(`You clicked the color ${color} with label ${children}`)\n    }}>\n    {children}\n  </span>\n);\n\nThis is <Highlight color=\"#25c2a0\">Docusaurus green</Highlight> !\n\nThis is <Highlight color=\"#1877F2\">Facebook blue</Highlight> !\n"}</_components.code></_components.pre>{"\n"}{"\n"}<_components.p>{"This is "}<Highlight color="#25c2a0">{"Docusaurus green"}</Highlight>{" !"}</_components.p>{"\n"}<_components.p>{"This is "}<Highlight color="#1877F2">{"Facebook blue"}</Highlight>{" !"}</_components.p></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
