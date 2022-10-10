import CX from "classnames";
import styles from "./index.module.scss";

export const Tag = (input: Types.Parameters, properties: Types.Properties) => {
    const CXS = CX.bind(styles);

    const styling = CXS({
        [ styles.blue ]: ( input.color === "blue" ),
        [ styles.green ]: ( input.color === "green" ),
        [ styles.red ]: ( input.color === "red" ),
        [ styles.magenta ]: ( input.color === "magenta" ),
        [ styles.yellow ]: ( input.color === "yellow" ),
        [ styles.purple ]: ( input.color === "purple" ),
        [ styles.orange ]: ( input.color === "orange" ),
        [ styles.right ]: ( input.side === "right" ),
        [ styles.left ]: ( input.side === "left" )
    }, styles.component);

    /*** Component Attribute Destructuring */
    const { title, handler } = input;

    return (
        <div className={ styling } onClick={ handler }>
            <span className={ styles.red } { ... properties }>
                {
                    title
                }
            </span>
        </div>
    );
};

import type { Types } from "./types";

export default Tag;