import {NavLink} from "react-router-dom";

import styles from "./index.module.scss";

export const Global = ({
    reload = false,
    path = "/",
    prefix,
    title
}: { reload: boolean, path?: string, prefix?: string, title?: string }) => {
    return (
        <NavLink to={path} className={styles.global} reloadDocument={reload}>
            <span>
                <span className={styles.prefix}>
                    {prefix}
                </span>
                {title}
            </span>
        </NavLink>
    );
};

export default Global;
