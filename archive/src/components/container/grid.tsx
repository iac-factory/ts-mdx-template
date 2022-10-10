import styles from "./index.module.scss";

export const Container = (properties: Properties) => {
    return (
        <main className={styles.component}>
            {
                Array.isArray(properties.children)
                    ? properties.children.map((signature, index) => {
                        const Component = () => signature;
                        return (
                            <Component key={index}/>
                        );
                    }) : properties.children
            }
        </main>
    );
};

interface Properties {
    children: JSX.Element | JSX.Element[];
}

export default Container;