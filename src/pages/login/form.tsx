import React from "react";

import {Provider} from "./provider";
import {Handler} from "./handler";
import {Col, Row} from "react-grid-system";

export module Help {
    export const Component = (properties: Properties) => {
        return (
            <div className={styles.help}
                hidden={(properties.hidden) ? properties?.hidden ?? false : false}>
                {
                    properties.text
                }
            </div>
        );
    };

    export interface Properties {
        text?: string | null,
        hidden?: boolean,
        error?: string | null
    }
}

export module Password {
    /***
     * Passwords should otherwise *never* be a page's first focus element.
     *
     * <br/>
     *
     * Of course, there may be exceptions to this rule (for example, a progress-based prompt
     * that completes the login form via a series of steps).
     *
     * <br/>
     *
     * The autofill property should be forced to "new-password".
     *
     * @param properties
     * @constructor
     */
    export const Component = (properties: Properties) => {
        return (
            <div className={styles.item}>
                <label className={styles.label} title={"label"}>
                    {
                        properties.label
                    }
                </label>
                <div className={styles.outer}>
                    <div className={styles.wrapper}>
                        <input
                            type={"password"}
                            className={styles.input}
                            title={properties.name[0].toUpperCase() + properties.name.slice(1)}
                            id={(properties.id) ? properties.id : [properties.name, "identifier"].join("-")}
                            name={properties.name}
                            onError={async (event) => {
                                console.warn("[Error] [Password]", event);
                            }}
                            autoComplete={"new-password"}
                            autoFocus={false}
                            placeholder={(properties.placeholder) ? properties.placeholder : "Password"}>
                            {/*  ...  */}
                        </input>
                    </div>
                    <Help.Component text={properties?.help?.text}
                        hidden={(properties.error) ? properties.error[0].active : true}
                        error={(properties.error) ? properties.error[0].text : null}/>
                </div>
            </div>
        );
    };

    export interface Properties {
        label: string,
        name: string,
        error?: [{ active: boolean, text: string }, React.Dispatch<React.SetStateAction<{ active: boolean, text: string }>>],
        help?: Help.Properties,
        placeholder?: false | "Password",
        id?: string
    }
}

export module Input {
    export const Component = (properties: Properties) => {
        return (
            <div className={styles.item}>
                <label className={styles.label} title={"label"}>
                    {
                        properties.label
                    }
                </label>
                <div className={styles.outer}>
                    <div className={styles.wrapper}>
                        <input
                            type={"text"}
                            className={styles.input}
                            title={properties.name[0].toUpperCase() + properties.name.slice(1)}
                            id={(properties.id) ? properties.id : [properties.name, "identifier"].join("-")}
                            name={properties.name}
                            autoComplete={(properties.autofill) ? "on" : "off"}
                            autoFocus={(properties.focus) ? properties.focus : false}
                            placeholder={(properties.placeholder) ? properties.placeholder : properties.label}>
                            {/*  ...  */}
                        </input>
                    </div>
                    <Help.Component
                        text={(properties.error) ? properties.error : (properties.help) ? properties.help : null}
                        hidden={!!(properties.error || properties.help)} error={properties.error}/>
                </div>
            </div>
        );
    };

    export interface Properties {
        label: string,
        name: string,
        focus: boolean,
        error?: string,
        help?: string,
        placeholder?: string,
        autofill?: "on" | false,
        id?: string
    }
}

import styles from "./index.module.scss";

/***
 * The Login-Form
 * ---
 *
 * @constructor
 */
export const Form = () => {
    const location = Provider.useSession();
    const navigate = Provider.useNavigator();
    const authorization = Provider.useAuthorization();

    const session = {location, navigate, authorization};

    return (
        <form id={"login-form"} onSubmit={async (event) => Handler(event, session)}>
            <Row justify="center">
                <Col lg={8} md={8} sm={8}>
                    <Input.Component label={"Username"} name={"username"} help={"..."} focus={false}/>
                </Col>
            </Row>
            <Row justify="center">
                <Col lg={8} md={8} sm={8}>
                    <Password.Component label={"Password"} name={"password"}
                        help={{text: "Optional Help Context (4)"}}/>
                </Col>
            </Row>
            <input type="submit" hidden={true}/>
        </form>
    );
};

export type Event = React.FormEvent<HTMLFormElement>;

export default Form;
