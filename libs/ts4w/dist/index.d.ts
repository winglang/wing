import { Construct } from 'constructs';
export { i as internal } from './internal-chSgcVDE.js';

/**
 * Properties for a Wing app.
 */
interface AppProps {
    /**
     * The name and id of the app.
     * @default "main"
     */
    name?: string;
}
/**
 * Create a Wing app.
 *
 * ```ts
 * import { main } from "ts4w";
 * import { cloud } from "@winglang/sdk";
 *
 * main(app => {
 *   new cloud.Bucket(app, "Bucket");
 * });
 * ```
 *
 * @param fn Define your application using the provided root construct.
 *           Note that this function may be called multiple times when used with `wing test`.
 */
declare function main(fn: (root: Construct) => void, props?: AppProps): void;

export { type AppProps, main };
