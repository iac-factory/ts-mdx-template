(async () => onmessage = function (event) {
    const subset = [
        "javascript",
        "typescript",
        "yaml",
        "sql",
        "swift",
        "scss",
        "rust",
        "nginx",
        "markdown",
        "dockerfile",
        "c",
        "bash",
        "json",
        "json5"
    ];

    importScripts("./syntax.js");

    const target = self.hljs.highlightAuto(event.data, subset);

    postMessage(target.value);
})();

