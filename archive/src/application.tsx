import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";

import Shell, {Authorization} from "./components";

export const Application = () => {
    const {Provider} = Authorization;
    const {Consumer} = Authorization;

    const Login = React.lazy(() => import("./pages/login"));

    return (
        <Provider>
            <Routes>
                <Route element={(<Shell/>)}>
                    <Route element={(<Consumer/>)}>
                        <Route path={"*"} element={(<Outlet/>)}/>
                    </Route>
                </Route>
                <Route element={(<Shell/>)}>
                    <Route element={(<Login/>)} path={"/login"}/>
                </Route>
            </Routes>
        </Provider>
    );
};

export default Application;
