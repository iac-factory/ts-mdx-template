import styles from "./index.module.scss";

export interface Properties {
    children?: JSX.Element[];
}

export const Tiles = ( properties: Properties ) => {
    return (
            <div className={ styles.tiles }>
                {
                    properties.children
                }
            </div>
    );
};

export default Tiles;