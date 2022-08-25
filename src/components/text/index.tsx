import "./index.scss";

import Styles from "./index.module.scss";
import type {AllHTMLAttributes} from "react";

interface Parameters {
    /*** Component Display Text */
    input?: string;
    /*** Component Display Text Color (Theme) */
    theme?: "dark" | "light";
    /*** Component Display Text Alignment */
    center?: boolean;
}

export type Properties = { [Property in keyof AllHTMLAttributes<HTMLElement>]: AllHTMLAttributes<HTMLElement>[Property] }

export const Text = (input: Parameters = {input: "...", theme: "dark", center: false}, props: Properties) => {
    const Theme = (input.theme === "light") ? Styles.light : Styles.dark;

    return (
        <span className={[Styles.component, Theme, (input.center) ? Styles.center : null].join(" ")}>
            {
                input.input
            }
        </span>
    );
};

export default Text;