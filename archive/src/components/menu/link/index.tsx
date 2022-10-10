import "./index.scss";

import styles from "./index.module.scss";

interface Parameters {
    /*** Component Display Text */
    title: string;
    url: string;
}

export const Link = (input: Parameters) => {
    return (
        <span className={styles.component}
            onClick={(event) => window.open(input.url, "_blank", "noreferrer")}>
            {
                input.title
            }
        </span>
    );
};

export default Link;