import React, {useRef} from "react";

import styles from "./index.module.scss";

import {Link} from "./link";

import {useExternalClickDetection} from "..";

import * as Icons from "./icons";

export module Component {
    export module Icon {
        enum Types {
            terraform = "terraform",
            lambda = "aws-lambda",
            consul = "consul",
            vagrant = "vagrant",
            gitlab = "gitlab",
            github = "github",
            jira = "jira"
        }

        export type Type = keyof typeof Types;
    }

    const Source = (input?: Icon.Type) => {
        input = String(input).toLowerCase() as Icon.Type;

        switch (input) {
        case "lambda":
            return (
                <img
                    className={styles.icon}
                    src={Icons.Lambda}
                    alt={"AWS Lambda Logo"}
                    height={16}
                    width={16}
                    title={"AWS-Lambda"}
                />
            );
        case "jira":
            return (
                <img
                    className={styles.icon}
                    src={Icons.Jira}
                    alt={"Jira Logo"}
                    height={16}
                    width={16}
                    title={"Jira"}
                />
            );
        case "gitlab":
            return (
                <img
                    className={styles.icon}
                    src={Icons.GitLab}
                    alt={"GitLab Logo"}
                    height={16}
                    width={16}
                    title={"GitLab"}
                />
            );
        case "github":
            return (
                <img
                    className={styles.icon}
                    src={Icons.GitHub}
                    alt={"GitHub Logo"}
                    height={16}
                    width={16}
                    title={"GitHub"}
                />
            );
        case "consul":
            return (
                <img
                    className={styles.icon}
                    src={Icons.Consul}
                    alt={"Hashicorp Consul Logo"}
                    height={16}
                    width={16}
                    title={"Consul"}
                />
            );
        case "terraform":
            return (
                <img
                    className={styles.icon}
                    src={Icons.Terraform}
                    alt={"Hashicorp Terraform Logo"}
                    height={16}
                    width={16}
                    title={"Terraform"}
                />
            );
        case "vagrant":
            return (
                <img
                    className={styles.icon}
                    src={Icons.Vagrant}
                    alt={"Hashicorp Vagrant Logo"}
                    height={16}
                    width={16}
                    title={"Vagrant"}
                />
            );
        default:
            return null;
        }
    };

    /*** Full Width Panel */
    export const FW = ({children}: { children: JSX.Element }) => {
        return (
            <div className={styles.full}>
                {children}
            </div>
        );
    };

    export const List = (properties: any) => {
        return (
            <ul className={styles.list}>
                {
                    (Array.isArray(properties.items))
                        ? properties.items.map(
                            // @ts-ignore
                            (component, index, array) => {
                                const SVG = () => Source(component.icon);

                                return (
                                    <li key={[properties.name, "list-item", index].join("-")}
                                        className={styles.list}>
                                        <div className={styles.icon}>
                                            {(component.icon) ? (<SVG/>) : null}
                                            {(component.link) ? (<Link title={component.title}
                                                url={component.link}/>) : (component.title)}
                                        </div>
                                    </li>
                                );
                            }
                        ) : properties.items
                }
            </ul>
        );
    };

    export const Content = ({children}: { children: JSX.Element | JSX.Element[] }) => {
        return (
            <FW>
                <div className={styles.content}>
                    {children}
                </div>
            </FW>
        );
    };

    export const Header = (input: Input["Header"]) => {
        return (input.content) ?
            (
                <h3 className={styles.header}>
                    {input.content}
                </h3>
            ) : null;
    };

    export const Column = ({
        children,
        style
    }: { children: JSX.Element | JSX.Element[] | null, style?: string }) => {
        return (
            <div className={(style) ? style : styles.column}>
                {children}
            </div>
        );
    };

    export const External = ({children}: { children: JSX.Element | JSX.Element[] }) => {
        return (
            <div className={styles.external}>
                {children}
            </div>
        );
    };
    export const Vertex = (properties: Input["Vertex"]) => {
        return (
            <Column style={styles.column}>
                <Header content={properties.content}/>
                {properties.children as React.ReactElement<any, any>}
            </Column>
        );
    };

    export const Divider = (properties: Input["Divider"]) => {
        return (
            <Column style={[styles.column, styles.divider].join(" ")}>
                <Header content={properties.content}/>
                {properties.children as React.ReactElement<any, any>}
            </Column>
        );
    };

    export const Panel = (input: Input["Panel"]) => {
        const wrapper = useRef(null);
        const trigger = useRef(null);
        const active = React.useState(false);

        useExternalClickDetection(wrapper, trigger, active);

        return (
            <li>
                <div ref={trigger} className={styles.item} onClick={((event) => {
                    console.debug("[Debug]", "Panel Item Click-Event", input);
                    active[1](!active[0]);
                })}>
                    <span>{input.title}</span>
                </div>
                {
                    (active[0] && input.children) ? (
                        <div className={"wrapper"} ref={wrapper}>
                            {input.children}
                        </div>
                    ) : (active[0]) ? (
                        <div className={"wrapper"} ref={wrapper} style={{
                            position: "absolute",
                            width: "auto",
                            minWidth: "350px",
                            top: "100%",
                            left: "-1rem",
                            right: "auto",
                            minHeight: "300px",
                            justifyContent: "flex-start",
                            backgroundColor: "var(--global-background)",
                            border: "var(--global-border-subtle-00)",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            display: "flex",
                            boxShadow: "0 3px 5px rgba(185, 185, 185, 0.075)",
                            zIndex: "1000",
                            flexDirection: "row",
                            padding: "2rem"
                        }}>
                            hello world
                        </div>
                    ) : null
                }
            </li>
        );
    };

    export interface Input {
        Panel: {
            /*** Global Menu Item Path Prefix(es) */
            title: string;
            class?: string;

            children?: JSX.Element;
        };

        Column: {
            children?: JSX.Element
            style: string;
        };

        Header: {
            content?: string
        };

        Vertex: {
            content: string;
            children?: JSX.Element;
        };

        Divider: {
            content: string;
            children?: JSX.Element | JSX.Element[] | null;
        };

        List: {
            name: string;
            items?: (JSX.Element & {
                title: string,
                icon?: Icon.Type,
                height?: number,
                width?: number,
                link?: string
            }) | (JSX.Element[] & {
                title: string,
                icon?: Icon.Type,
                height?: number,
                width?: number,
                link?: string
            }[]);
        };
    }
}

export const {FW} = Component;
export const {List} = Component;
export const {Panel} = Component;
export const {Header} = Component;
export const {Column} = Component;
export const {Vertex} = Component;
export const {Content} = Component;
export const {Divider} = Component;
export const {External} = Component;