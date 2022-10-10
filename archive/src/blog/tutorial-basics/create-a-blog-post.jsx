/*@jsxRuntime automatic @jsxImportSource react*/
export const title = "Create a Blog Post", sidebar = 3;
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    p: "p",
    strong: "strong",
    h2: "h2",
    code: "code",
    pre: "pre"
  }, props.components);
  return <><_components.h1>{"Create a Blog Post"}</_components.h1>{"\n"}<_components.p>{"Docusaurus creates a "}<_components.strong>{"page for each blog post"}</_components.strong>{", but also a "}<_components.strong>{"blog index page"}</_components.strong>{", a "}<_components.strong>{"tag system"}</_components.strong>{", an "}<_components.strong>{"RSS"}</_components.strong>{" feed..."}</_components.p>{"\n"}<_components.h2>{"Create your first Post"}</_components.h2>{"\n"}<_components.p>{"Create a file at "}<_components.code>{"blog/2021-02-28-greetings.md"}</_components.code>{":"}</_components.p>{"\n"}<_components.pre><_components.code className="language-md">{"---\nslug: greetings\ntitle: Greetings!\nauthors:\n  - name: Joel Marcey\n    title: Co-creator of Docusaurus 1\n    url: https://github.com/JoelMarcey\n    image_url: https://github.com/JoelMarcey.png\n  - name: Sébastien Lorber\n    title: Docusaurus maintainer\n    url: https://sebastienlorber.com\n    image_url: https://github.com/slorber.png\ntags: [greetings]\n---\n\nCongratulations, you have made your first post!\n\nFeel free to play around and edit this post as much you like.\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"A new blog post is now available at "}<_components.code>{"http://localhost:3000/blog/greetings"}</_components.code>{"."}</_components.p></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
