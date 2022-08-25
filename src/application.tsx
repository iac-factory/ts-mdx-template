import React from "react";
import {Route, Routes} from "react-router-dom";

import Markdown from "./mdx";
import Shell, {Authorization} from "./components";

import Content from "./content.mdx";

export const Application = () => {
    const {Provider} = Authorization;
    const {Consumer} = Authorization;

    const Login = React.lazy(() => import("./pages/login"));

    return (
        <Routes>
            <Route element={(<Shell/>)}>
                <Route path={"*"} element={(<Markdown content={Content}/>)}/>
            </Route>
            <Route element={(<Shell/>)}>
                <Route element={(<Login/>)} path={"/login"}/>
            </Route>
        </Routes>
    );

    /// return (
    ///     <Provider>
    ///         <Routes>
    ///             <Route element={(<Shell/>)}>
    ///                 <Route element={(<Consumer/>)}>
    ///                     <Route path={"*"} element={(<Markdown content={Content}/>)}/>
    ///                 </Route>
    ///             </Route>
    ///             <Route element={(<Shell/>)}>
    ///                 <Route element={(<Login/>)} path={"/login"}/>
    ///             </Route>
    ///         </Routes>
    ///     </Provider>
    /// );
};

export default Application;
