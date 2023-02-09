// https://vitejs.dev/guide/assets.html#explicit-url-imports
declare module "*?url" {
    const url: string;
    export default url;
}

// https://vitejs.dev/guide/assets.html#importing-asset-as-string
declare module "*?raw" {
    const content: string;
    export default content;
}
