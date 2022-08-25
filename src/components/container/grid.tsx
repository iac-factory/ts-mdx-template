import styles from "./index.module.scss";

export const Container = (properties: Properties) => {
    return (
        <main className={styles.component}>
            {properties.children}
        </main>
    );
};

interface Properties {
    children: JSX.Element;
}

export default Container;