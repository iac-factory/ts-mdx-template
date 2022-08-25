import React from "react";

import { Text } from "..";
import { Spinner } from "..";

interface Properties {
    /***
     * Temporary Text to Display to User during Stateful Render(s).
     *
     * @default {@link String} "Loading ..."
     */
    label?: string
}

const Defaults: Properties = { label: "Loading ..." };

export const Awaitable = ( { label }: Properties = Defaults ) => {
    return ( <Spinner children={ ( label ) ? ( <Text input={ label }/> ) : null }/> );
};

export default Awaitable;