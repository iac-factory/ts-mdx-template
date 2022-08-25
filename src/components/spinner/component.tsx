import "./index.scss";

import styles from "./index.module.scss";

export const Component = (properties: Properties) => {
    return (
        <div className={styles.row}>
            <div className={styles.circle}>
                <div className={styles.ring}/>
            </div>
            {
                (
                    <div className={styles.column}>
                        {properties.children}
                    </div>
                )
            }
        </div>
    );
};

export interface Properties {
    title?: string;
    children?: JSX.Element;
}

export default Component;
