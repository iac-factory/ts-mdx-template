import styles from "./index.module.scss";

export module Footer {
    export const Bold = ({children}: { children: JSX.Element | string }) => {
        return (
            <span className={styles.bold}>
                {
                    children
                }
            </span>
        );
    };

    export const Text = () => {
        return (
            <>
                <span>
                    {
                        ["Copyright", "©", new Date().getFullYear(), "—"].join(" ")
                    }
                </span>
                <span>
                    &nbsp;
                    <Bold>
                        {(process.env?.["REACT_APP_NAME"] ?? "IaC-Factory")}
                    </Bold>
                    &nbsp;
                </span>
                <span>
                    {
                        ["&", "Affiliates" + ".", "All Rights Reserved"].join(" ")
                    }
                </span>
            </>
        );
    };

    export const Component = () => {
        return (
            <footer className={styles.component}>
                <Text/>
            </footer>
        );
    };
}

export default Footer;