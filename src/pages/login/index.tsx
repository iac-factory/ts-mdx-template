import React, {Suspense} from "react";

export const Login = () => {
    const Page = React.lazy(async () => import("./form"));

    return (
        <Suspense fallback={(<></>)}>
            <Page/>
        </Suspense>
    );
};

export default Login;