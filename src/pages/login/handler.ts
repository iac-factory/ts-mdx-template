import {Extractor} from "./extractor";

import type {Event} from "./form";
import type {Session} from "./provider";

/***
 * Login Form Submit Event Handler
 * ---
 *
 * Upon a successful login event, the client's
 * sessionStorage + localStorage are injected
 * with a JWT-related key-value pair, followed with
 * a redirect to the user's original, intended
 * page.
 *
 * @param {React.FormEvent<HTMLFormElement>} event
 * @param {Authorization.Session} session
 *
 * @constructor
 */
export const Handler = async (event: Event, session: Session, error?: React.Dispatch<string>) => {
    event.preventDefault();

    const data = Extractor(event.currentTarget.elements);

    const username = data.username;

    const input = new URLSearchParams();

    input.set("username", data.username);
    input.set("password", data.password);

    const clear = () => {
        console.debug("[Debug] Authorization Handler - Clearing Storage Authorization Context(s)");

        window.sessionStorage.clear();
        window.localStorage.clear();
    };

    await fetch(process.env["REACT_APP_API_ENDPOINT"] + "/authorization/jwt", {
        method: "POST",
        body: input
    }).then(async (response) => {
        const status = response.status;
        const value = await response.text();

        (status === 200) && sessionStorage.setItem(process.env?.["REACT_APP_SESSION_STORAGE_JWT_KEY"] ?? "JWT", value);
        (status === 200) && window.localStorage.setItem(process.env?.["REACT_APP_LOCAL_STORAGE_JWT_KEY"] ?? "JWT", value); //, (exception, value) => {

        try {
            session?.authorization?.login(username, {status, response: value}, () => {
                // runtime.successful = true;

                session.navigate(session.location.state.from ?? "/", {replace: false});
            });
        } catch (exception) {
            console.warn("[Warning] Exception Caught in Authorization Handler. See the following output.");
            console.warn("[Warning] Authorization Handler Exception" + ":", exception);
            session?.authorization?.login(username, {status, response: value}, () => {
                session.navigate("/", {replace: false});
            });
        }

        if (status !== 200) {
            const exception = new Error("Authorization-Failure-Exception");
            exception.name = "Authorization-Failure-Exception";

            (error) && error(exception.message);

            throw exception;
        }
    }).catch((exception) => {
        // runtime.successful = false;

        if (exception instanceof TypeError) {
            console.warn("[Warning] Caught Network-Error - The Backend API is Down, or the Supporting System(s) are Unresolvable");

            // runtime.context = "The Backend API is Down";

            clear();
        } else if (exception.name === "Authorization-Failure-Exception") {
            console.warn("[Warning] Failed Authorization Attempt");

            // runtime.context = "Bad Username + Password Combination";

            clear();
        } else {
            console.warn("[Warning] Unknown, Uncaught Exception");

            // runtime.context = "An Unknown, Uncaught Runtime Exception has Occurred";

            console.warn(exception);

            clear();
        }

        (error) && error(exception.message);
    });
};

export default Handler;