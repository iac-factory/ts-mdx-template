/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "Deploy Your Site", sidebar = 5;
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    a: "a",
    h2: "h2",
    pre: "pre",
    code: "code"
  }, props.components);
  return <><_components.h1>{"Deploy your site"}</_components.h1>{"\n"}<_components.p>{"Docusaurus is a "}<_components.strong>{"static-site-generator"}</_components.strong>{" (also called "}<_components.strong><_components.a href="https://jamstack.org/">{"Jamstack"}</_components.a></_components.strong>{")."}</_components.p>{"\n"}<_components.p>{"It builds your site as simple "}<_components.strong>{"static HTML, JavaScript and CSS files"}</_components.strong>{"."}</_components.p>{"\n"}<_components.h2>{"Build your site"}</_components.h2>{"\n"}<_components.p>{"Build your site "}<_components.strong>{"for production"}</_components.strong>{":"}</_components.p>{"\n"}<_components.pre><_components.code className="language-bash">{"npm run build\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"The static files are generated in the "}<_components.code>{"build"}</_components.code>{" folder."}</_components.p>{"\n"}<_components.h2>{"Deploy your site"}</_components.h2>{"\n"}<_components.p>{"Test your production build locally:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-bash">{"npm run serve\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"The "}<_components.code>{"build"}</_components.code>{" folder is now served at "}<_components.code>{"http://localhost:3000/"}</_components.code>{"."}</_components.p>{"\n"}<_components.p>{"You can now deploy the "}<_components.code>{"build"}</_components.code>{" folder "}<_components.strong>{"almost anywhere"}</_components.strong>{" easily, "}<_components.strong>{"for free"}</_components.strong>{" or very small cost (read\nthe "}<_components.strong><_components.a href="https://docusaurus.io/docs/deployment">{"Deployment Guide"}</_components.a></_components.strong>{")."}</_components.p></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
