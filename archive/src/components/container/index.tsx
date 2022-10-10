import "./index.scss";

import { setConfiguration } from "react-grid-system";

export { Container as Grid } from "react-grid-system";
export { ScreenClassProvider as Responsive } from "react-grid-system";
export { Col as Column } from "react-grid-system";

/***
 * | Setting              | Default Value                       | Description                                                                                           |
 * | -------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
 * | `breakpoints`        | `[576, 768, 992, 1200, 1600, 1920]` | The breakpoints (minimum width) of devices in screen class `sm`, `md`, `lg`, `xl`, `xxl`, and `xxxl`. |
 * | `containerWidths`    | `[540, 740, 960, 1140, 1540, 1810]` | The container widths in pixels of devices in screen class `sm`, `md`, `lg`, `xl`, `xxl`, and `xxxl`.  |
 * | `gutterWidth`        | `30`                                | The gutter width in pixels. A gutter width of 30 means 15px on each side of a column.                 |
 * | `gridColumns`        | `12`                                | The number of columns in the grid .                                                                   |
 * | `defaultScreenClass` | `xxl`                               | The screen class used when the view port cannot be determined using `window`.                         |
 * | `maxScreenClass`     | `xxl`                               | The maximum screen class to be used.                                                                  |
 */

setConfiguration({
    breakpoints: [ 768, 992, 1200, 1600, 1920, 2480 ],
    containerWidths: [ 750, 960, 1140, 1540, 1810, 2200 ],
    gutterWidth: 32,
    gridColumns: 16,
    defaultScreenClass: "xxl",
    maxScreenClass: "xxl"
});

export * from "./grid";