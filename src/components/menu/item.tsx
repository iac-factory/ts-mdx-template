import {NavLink} from "react-router-dom";

import {Strings} from "..";

import styles from "./index.module.scss";

export const Item = (properties: Properties) => {
    const Path = (properties.paths) ? Strings.Normalize(properties.title, (typeof properties.paths !== "string") ? properties.paths.join() : properties.paths) : Strings.Normalize(properties.title);

    return (
        <li>
            <NavLink
                reloadDocument={properties.reload ?? false}
                to={(properties?.overwrite) ? properties.overwrite : Path}
                className={styles.item}
                // @ts-ignore
                style={({isActive}) => {
                    return (isActive) ? {
                        color: "whitesmoke"
                    } : undefined;
                }}>
                <span>{properties.title}</span>
            </NavLink>
        </li>
    );
};

interface Properties {
    /*** Global Menu Item Path Prefix(es) */
    title: string;
    /*** Global Menu Item Title, Text */
    paths?: string[] | string;
    /*** Optional Path Forced Overwrite */
    overwrite?: string;

    reload?: boolean;
}

export default Item;

