/*@jsxRuntime automatic @jsxImportSource react*/
export const name = "Test", title = "Hi, World!", filename = "example-2";
export const Link = () => {
  return <a href={[".", filename].join("/")} target={"_self"} title={title}>
    {name}
  </a>;
};
function _createMdxContent(props) {
  const _components = Object.assign({
    p: "p"
  }, props.components);
  return <_components.p>{"... Continued"}</_components.p>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
