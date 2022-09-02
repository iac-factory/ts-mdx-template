/*@jsxRuntime automatic @jsxImportSource react*/
export const name = "Introduction", title = "Tutorial", filename = "introduction", sidebar = 1;
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    h2: "h2",
    a: "a",
    h3: "h3",
    ul: "ul",
    li: "li",
    pre: "pre",
    code: "code"
  }, props.components);
  return <><_components.h1>{"Tutorial Intro"}</_components.h1>{"\n"}<_components.p>{"Let's discover "}<_components.strong>{"Docusaurus in less than 5 minutes"}</_components.strong>{"."}</_components.p>{"\n"}<_components.h2>{"Getting Started"}</_components.h2>{"\n"}<_components.p>{"Get started by "}<_components.strong>{"creating a new site"}</_components.strong>{"."}</_components.p>{"\n"}<_components.p>{"Or "}<_components.strong>{"try Docusaurus immediately"}</_components.strong>{" with "}<_components.strong><_components.a href="https://docusaurus.new">{"docusaurus.new"}</_components.a></_components.strong>{"."}</_components.p>{"\n"}<_components.h3>{"What you'll need"}</_components.h3>{"\n"}<_components.ul>{"\n"}<_components.li><_components.a href="https://nodejs.org/en/download/">{"Node.js"}</_components.a>{" version 14 or above:"}{"\n"}<_components.ul>{"\n"}<_components.li>{"When installing Node.js, you are recommended to check all checkboxes related to dependencies."}</_components.li>{"\n"}</_components.ul>{"\n"}</_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Generate a new site"}</_components.h2>{"\n"}<_components.p>{"Generate a new Docusaurus site using the "}<_components.strong>{"classic template"}</_components.strong>{"."}</_components.p>{"\n"}<_components.p>{"The classic template will automatically be added to your project after you run the command:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-bash">{"npm init docusaurus@latest my-website classic\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"You can type this command into Command Prompt, Powershell, Terminal, or any other integrated terminal of your code\neditor."}</_components.p>{"\n"}<_components.p>{"The command also installs all necessary dependencies you need to run Docusaurus."}</_components.p>{"\n"}<_components.h2>{"Start your site"}</_components.h2>{"\n"}<_components.p>{"Run the development server:"}</_components.p>{"\n"}<_components.pre><_components.code className="language-bash">{"cd my-website\nnpm run start\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"The "}<_components.code>{"cd"}</_components.code>{" command changes the directory you're working with. In order to work with your newly created Docusaurus site,\nyou'll need to navigate the terminal there."}</_components.p>{"\n"}<_components.p>{"The "}<_components.code>{"npm run start"}</_components.code>{" command builds your website locally and serves it through a development server, ready for you to\nview at http://localhost:3000/."}</_components.p>{"\n"}<_components.p>{"Open "}<_components.code>{"docs/intro.md"}</_components.code>{" (this page) and edit some lines: the site "}<_components.strong>{"reloads automatically"}</_components.strong>{" and displays your changes."}</_components.p></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
