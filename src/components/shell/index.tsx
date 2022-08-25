import React, {Suspense} from "react";

import {Outlet} from "react-router";

import {Responsive} from "..";
import {Container} from "..";
import {Awaitable} from "..";

import {Menu} from "..";
import {Footer} from "..";

interface Properties {
    /***
     * Temporary Text to Display to User during Stateful Render(s).
     *
     * @see {@link Awaitable}
     */
    label?: string;

    /***
     * Children to Render within the {@link Shell} Component
     */
    children?: JSX.Element | null;
}

/***
 * Shell - UI Application Wrapper around `<Outlet>`.
 *
 * *An <Outlet> should be used in parent route elements to render their child route elements. This allows nested UI to
 * show up when child routes are rendered. If the parent route matched exactly, it will render a child index
 * route or nothing if there is no index route.*
 *
 * @returns {JSX.Element}
 *
 * @see {@link https://reactrouter.com/docs/en/v6/api#outlet Outlets}
 *
 * @constructor
 */
export const Shell = ({label, children}: Properties): JSX.Element => {
    const Proxy = () => (children) ?? (<Outlet/>);

    return (
        <Responsive>
            <Menu/>
            <Container>
                <Suspense fallback={(<Awaitable label={label}/>)}>
                    <Proxy/>
                </Suspense>
            </Container>
            <Footer.Component/>
        </Responsive>
    );
};

export default Shell;
