export const Application = async () => void await (async () => {
    document.addEventListener("readystatechange", async (event) => {
        if (event.target.readyState === "interactive") {
            console.debug("[Debug] (HTML-Document)", "DOM State := Interactive");
        } else if (event.target.readyState === "complete") {
            console.debug("[Debug] (HTML-Document)", "DOM State := Complete");
            void await Initialize();
            console.debug("[Debug] (HTML-Document)", "Successfully Established IO-Application HTML Element");
        }
    });

    console.debug("[Debug] (HTML-Document)", "Establishing IO-Application Callable");

    const Initialize = async () => (async () => {
        /*** Will have compatability issue(s) with Internet Explorer, and *very old* browsers */
        const IO = new Proxy(HTMLElement, Object.create({}));

        IO.disabledFeatures = [ "shadow", "canvas" ];

        window.customElements.define("io-application", IO);
    })();

    console.debug("[Debug] (HTML-Document)", "Callable was Initialized. Instantiating Tag Definition");
})();

(async () => Application())();