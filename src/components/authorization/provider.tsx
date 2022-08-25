import React, {useState} from "react";

import {Outlet} from "react-router-dom";
import {useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";

import type {NavigateFunction} from "react-router";
import type {Location} from "react-router";

import {Spinner, Text} from "..";

export module Authorization {
    /***
     * @example <br/> <br/> Sign-In Form Usage
     * export const Form = () => {
     *     const location = Provider.useSession();
     *     const navigate = Provider.useNavigator();
     *     const authorization = Provider.useAuthorization();
     *
     *     const session = { location, navigate, authorization };
     *
     *     return (
     *         <form id={ "login-form" } onSubmit={(event) => Handler(event, session)}>
     *             <input name={ "username" } type={ "text" } placeholder={ "username" } id={"username"}/>
     *             <input name={ "password" } type={ "password" } id={"password"}/>
     *             <input type="submit" hidden={ true }/>
     *         </form>
     *     );
     * };
     */
    export const Context = React.createContext<Context>(null!);

    /*** @see {@link Context} */
    export function useAuthorization() {
        return React.useContext(Context);
    }

    /*** @see {@link Context} */
    export function useSession() {
        return useLocation() as Location & { state: { from?: { pathname?: string } } };
    }

    /*** @see {@link Context} */
    export function useNavigator() {
        return useNavigate();
    }

    /*** @see {@link Context} */
    export const Provider = ({children}: { children?: React.ReactNode }) => {
        const [user, setUser] = React.useState<User>(null);

        const login = (username: string, data: { response: any, status: number }, callback: (() => void)) => {
            console.log("Provider User Login Context", username);
            console.log("Provider User Login Context", data);

            if (data.status === 200) {
                setUser({
                    username,
                    expiration: "...",
                    uid: "...",
                    name: "..."
                });
            } else {
                setUser(null);
            }

            void callback();
        };

        const logout = (callback: (() => void)) => {
            Authorization.Clear();

            setUser(null);

            (callback) ? callback() : void null;
        };

        const attribution = {
            user,
            login,
            logout
        };

        return (
            <Context.Provider value={attribution}>
                {
                    (children) ? children : null
                }
            </Context.Provider>
        );
    };

    export const JWT = () => {
        try {
            return window.localStorage.getItem(process.env?.["REACT_APP_LOCAL_STORAGE_JWT_KEY"] ?? "");
        } catch (exception) {
            try {
                return window.sessionStorage.getItem(process.env?.["REACT_APP_SESSION_STORAGE_JWT_KEY"] ?? "");
            } catch (exception) {
                return null;
            }
        }
    };

    export const Clear = () => {
        console.debug("[Debug] Authorization Consumer - Clearing Storage Authorization Context(s)");

        window.sessionStorage.clear();
        window.localStorage.clear();
    };

    /*** @see {@link Context} */
    export const Consumer = () => {
        const loading = useState(true);

        const jwt = Authorization.JWT();

        const location = useLocation();
        const authorization = useAuthorization();
        const navigate = useNavigator();

        console.debug("[Debug] Consumer Context Entry Point");

        /***
         * Oddly enough, during the same session where a user may lose both context and localstorage,
         * the React.useEffect conditional can still pass. Therefore, it's required to, again, try
         * and pull from localstorage.
         */

        const update = async () => {
            if (jwt && loading[0]) {
                const input = new URLSearchParams();

                input.set("jwt", jwt);

                const validation = await fetch(process.env["REACT_APP_API_ENDPOINT"] + "/authorization", {
                    method: "POST",
                    mode: "cors",
                    body: input
                }).catch((exception) => {
                    loading[1](false);

                    if (exception instanceof TypeError) {
                        return {
                            status: null,
                            json: function () {
                                return JSON.stringify(this);
                            }
                        };
                    } else {
                        console.warn("[Warning] Unknown, Uncaught Exception");
                        console.warn(exception);
                        throw exception;
                    }
                });

                if (("status" in validation) && validation.status === 200) {
                    const data = await validation.json();
                    setTimeout(() => {
                        if (authorization && "username" in data) {
                            authorization.login(data.username as string, {
                                response: data,
                                status: validation.status
                            }, () => {
                                loading[1](false);
                            });
                        } else {
                            authorization?.logout(() => {
                                loading[1](true);

                                Clear();

                                setTimeout(() => {
                                    loading[1](false);
                                }, 1000);

                                redirect();
                            });
                        }
                    }, 1000);
                } else {
                    console.warn("[Warning] Fatal Authorization Attempt");

                    authorization?.logout(() => {
                        loading[1](true);

                        Clear();

                        setTimeout(() => {
                            loading[1](false);
                        }, 1000);

                        redirect();
                    }
                    );

                    throw new Error("Authorization Failure");
                }
            }
        };

        /***
         * Redirect the user to the /login page, but save the current location that
         * was attempted; such allows the web-application to send them the user back
         * to the originally attempted page.
         */
        const redirect = () => {
            if (!(authorization?.["user"]) && !(jwt)) {
                setTimeout(() => {
                    navigate("/login", {
                        state: {from: location},
                        replace: true
                    });
                }, 1000);
            } else {
                authorization?.logout(() => {
                    loading[1](true);

                    Clear();

                    setTimeout(() => {
                        loading[1](false);
                    }, 1000);

                    redirect();
                }
                );
            }
        };

        React.useEffect(() => {
            if (jwt) {
                void update();
            } else {
                redirect();
            }
        });

        return (loading[0]) ? <Spinner children={(<Text input={"Authorizing ..."}/>)}/> : (<Outlet/>);
    };

    /*** @see {@link Context} */
    export type Context = {
        user: User;
        login: (username: string, data: { status: number, response: any }, callback: () => void) => void;
        logout: (callback: (() => void)) => void;
    } | null

    /*** @see {@link Context} */
    export type Navigation = NavigateFunction;

    /*** @see {@link Context} */
    export type Session = { readonly navigate: Authorization.Navigation; readonly authorization: Authorization.Context; readonly location: Location & { state: { from?: { pathname?: string } } } };

    /*** @see {@link Context} */
    export type User = {
        readonly name: string;
        readonly username: string;
        readonly uid: string;
        readonly expiration: string;
    } | null;
}

export default Authorization;