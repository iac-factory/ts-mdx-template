import React, {useEffect} from "react";

/*** Hook that alerts clicks outside of the passed ref */
export function useExternalClickDetection(reference: React.RefObject<any>, trigger: React.RefObject<Event & { contains: Function }>, state: [boolean, React.Dispatch<boolean>]) {
    useEffect(() => {
        /*** Handler for Click(s) Outside of Element(s) */
        function handler(event: Event) {
            const referrer = reference.current && !reference.current.contains(event.target);
            const origin = trigger.current && !trigger.current.contains(event.target);

            /*** A click has occurred both outside of the trigger and the wrapper context */
            (referrer && (origin)) && state[1](false);
            (referrer && (origin)) && console.debug("[Debug]", "External Context Click");

            /*** A click has occurred on the trigger context; therefore, it's assumed the client is already handling a state change */
            (referrer && !(origin)) && console.debug("[Debug]", "Trigger Context Click");
        }

        /*** Bind the Event Listener */
        document.addEventListener("mousedown", handler);
        return () => {
            /*** Unbind the Event Listener on Clean-Up */
            document.removeEventListener("mousedown", handler);
        };
    }, [reference, trigger, state]);
}

export default useExternalClickDetection;