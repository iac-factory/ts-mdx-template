import styles from "./index.module.scss";

export interface Properties {
    content: string;
}

export const Default = ( properties: Properties ) => {
    return (
            <div className={ styles.tile }>
                {
                    properties.content
                }
            </div>
    );
};

export default Default;