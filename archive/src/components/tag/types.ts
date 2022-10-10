export module Types {
    export enum Color {
        blue = "blue",
        green = "green",
        red = "red",
        magenta = "magenta",
        yellow = "yellow",
        purple = "purple",
        orange = "orange"
    }

    export enum Side {
        right = "right",
        left = "left"
    }

    export type Colors = keyof typeof Color;
    export type Sides = keyof typeof Side;

    export interface Parameters {
        title: string,
        handler?: Function["prototype"],
        color: Colors,
        side?: Sides
    }

    export type HTML = import("react").AllHTMLAttributes<HTMLElement> & Parameters;

    export interface Properties extends HTML {
        /*** [...] */
    }
}