import CX from "classnames";
import styles from "./index.module.scss";

export const Text = (input: Parameters = {input: "...", theme: "dark", center: false}, properties: Properties) => {
    const CXS = CX.bind(styles);

    const styling = CXS({
        [styles.light]: (input.theme === "light"),
        [styles.center]: (input.center),
        [styles.dark]: (input.theme === "dark")
    }, styles.component);

    return (
        <span className={styling} {...properties}>
            {
                input.input
            }
        </span>
    );
};

interface Parameters {
    /*** Component Display Text */
    input?: string;
    /*** Component Display Text Color (Theme) */
    theme?: "dark" | "light";
    /*** Component Display Text Alignment */
    center?: boolean;
}

type Properties = { [Property in keyof import("react").AllHTMLAttributes<HTMLElement>]: import("react").AllHTMLAttributes<HTMLElement>[Property] }

export default Text;