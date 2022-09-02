/*@jsxRuntime automatic @jsxImportSource react*/
export const name = "Test", title = "Hi, World!", filename = "example";
import {Link as Next} from "./example-2";
export const Link = () => {
  return <a href={[".", filename].join("/")} target={"_self"} title={title}>
            {name}
        </a>;
};
function _createMdxContent(props) {
  const _components = Object.assign({
    h1: "h1",
    code: "code",
    hr: "hr",
    h2: "h2",
    ul: "ul",
    li: "li",
    a: "a",
    p: "p",
    em: "em",
    pre: "pre",
    strong: "strong"
  }, props.components);
  return <><_components.h1>{"The "}<_components.code>{"npm"}</_components.code>{" Configuration Object (Part 1)"}</_components.h1>{"\n"}<_components.hr />{"\n"}<_components.h2>{"Table of Contents"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li><_components.a href="#overview">{"Overview"}</_components.a></_components.li>{"\n"}<_components.li><_components.a href="#references">{"References"}</_components.a></_components.li>{"\n"}</_components.ul>{"\n"}<_components.h2>{"Overview"}</_components.h2>{"\n"}<_components.p>{"A "}<_components.em>{"configuration"}</_components.em>{" object can be used to set configuration parameters used in package scripts that persist across upgrades."}</_components.p>{"\n"}<_components.p>{"Settings are found in the root of any given project's "}<_components.code>{"package.json"}</_components.code></_components.p>{"\n"}<_components.pre><_components.code className="language-json5">{"{\n    \"name\": \"foo\",\n    \"version\": \"0.0.1\",\n    \"config\": {\n        \"port\": \"8080\"\n    }\n}\n"}</_components.code></_components.pre>{"\n"}<_components.p>{"Programmatically, the "}<_components.em>{"configuration"}</_components.em>{" object can then be referenced."}</_components.p>{"\n"}<_components.pre><_components.code className="language-js">{"import HTTP from \"http\";\n\nasync function get (request, response) {\n    ( request.method !== \"GET\" ) && response.writeHead( 405 );\n    ( request.method !== \"GET\" ) && response.end();\n\n    response.writeHead( 200 );\n\n    response.end(() => void null);\n}\n\nconst server = HTTP.createServer(async (request, response) => {\n    const url = new URL( String( request.url ), \"http://127.0.0.1/\" );\n\n    console.debug(\"[Debug]\", \"Request URL\", url);\n\n    void await get( request, response );\n});\n\n/*** Usage Example of `npm_package_config_port` */\n\nserver.listen(process.env.npm_package_config_port);\n"}</_components.code></_components.pre>{"\n"}<_components.h2>{"References"}</_components.h2>{"\n"}<_components.ul>{"\n"}<_components.li><_components.a href="https://docs.npmjs.com/cli/v6/using-npm/config"><_components.strong>{"Official "}<_components.code>{"npm"}</_components.code>{" Documentation"}</_components.strong></_components.a></_components.li>{"\n"}</_components.ul>{"\n"}<Next /></>;
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? <MDXLayout {...props}><_createMdxContent {...props} /></MDXLayout> : _createMdxContent(props);
}
export default MDXContent;
