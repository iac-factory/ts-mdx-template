import styles from "./index.module.scss";

export const Tag = ({title, handler}: { title: string, handler?: any }) => {
    return (
        <div className={[styles.tag, styles.right].join(" ")} onClick={handler}>
            <span className={styles.red}>
                {
                    title
                }
            </span>
        </div>
    );
};

export default Tag;