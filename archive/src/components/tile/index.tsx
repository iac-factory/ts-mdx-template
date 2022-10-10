import React, { lazy } from "react";

export enum Type {
    clickable = "clickable",
    default = "default"
}

export type Types = keyof typeof Type;

export const Clickable = lazy( async () => import("./clickable") );
export const Default = lazy( async () => import("./default") );
export const Tiles = lazy( async () => import("./tiles") );

export interface Properties {
    content: string;
    type?: Types
}

export const Tile = ( properties: Properties ) => {
    switch ( properties.type ) {
        case "clickable": {
            return (
                    <Clickable content={ properties.content }/>
            );
        }

        case "default": {
            return (
                    <Default content={ properties.content }/>
            );
        }

        default: {
            return (
                    <Default content={ properties.content }/>
            );
        }
    }

};

export default Tile;

