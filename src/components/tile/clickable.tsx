import styles from "./index.module.scss";

export interface Properties {
    content: string;
}

export const Clickable = (properties: Properties) => {
    return (
        <a className={styles.tile}>
            {
                properties.content
            }
        </a>
    );
};

export default Clickable;