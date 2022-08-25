export enum Language {
    javascript = "javascript",
    typescript = "typescript",
    js = "js",
    ts = "ts",
    yaml = "yaml",
    sql = "sql",
    swift = "swift",
    scss = "scss",
    rust = "rust",
    nginx = "nginx",
    markdown = "markdown",
    dockerfile = "dockerfile",
    c = "c",
    bash = "bash",
    json = "json",
    json5 = "json5"
}

export type Languages = keyof typeof Language;

export default Language;