import { sep } from "path";

/**
 * @param path path to the test/s file
 * @returns the file name and parent dir in the following format: "folder/file.ext"
 */
export const renderTestName = (path: string) => path.split(sep).slice(-2).join("/");

