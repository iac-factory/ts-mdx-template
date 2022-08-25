import Markdown from "../../mdx";
//import Content from "./mdx/content.mdx"
import Config from "./docs-config.json";

export const Documentation = () => {
//    return <Markdown content={Content}/>
    console.log("docs", Config.docs)
    return (<pre>
        <code>
            {
                Config.docs.map((doc) => {
                    return <p>{doc}</p>
                })
            }
        </code>
    </pre>)
}

export default Documentation;

//import Markdown from "../../mdx";
//import React from "react";
////import Content from "./mdx/content.mdx"
//import Config from "./docs-config.json";
//
//export const Documentation = () => {
////    return <Markdown content={Content}/>
//
//    const [docs, setDocs] = React.useState<Array<typeof import("*.mdx")>>([]);
//    const [awaitable, setAwaitable] = React.useState<boolean|null>(null);
//
//    const loadDocIntoState = async (doc: string) => {
//        const res = await import(`./mdx/${doc}`);
//        setDocs([...docs, res])
//    }
//
//    React.useEffect(() => {
//        Config.docs.map( async ( doc ) => {
//            await loadDocIntoState( doc );
//        } )
//        setAwaitable(true);
//        console.log("docs state:", docs);
//    }, []);
//
//    return (<pre>
//        <code>
//            {
//                awaitable === null
//                    ? <p>Loading...</p>
//                    : awaitable
//                        ? docs.map((doc, i) => {
//                            return <Markdown key={i} content={doc.default}/>
//                        })
//                        : null
//            }
//        </code>
//    </pre>)
//}
//
//export default Documentation;