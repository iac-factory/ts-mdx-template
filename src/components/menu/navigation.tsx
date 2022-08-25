import React from "react";

import styles from "./index.module.scss";

export const Navigator = ({as = "nav", children = null}: { as?: "div" | "nav", children?: JSX.Element | JSX.Element[] | null }) => {
    return React.createElement(as, {
        className: styles.component,
        children: children
    });
};

export default Navigator;

