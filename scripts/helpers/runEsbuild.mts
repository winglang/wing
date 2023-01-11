import esbuild from "esbuild";

export interface RunEsbuildOptions {
  port?: number;
  watch?: esbuild.WatchMode;
  minify?: boolean;
}

export const runEsbuild = ({ port, watch, minify }: RunEsbuildOptions) => {
  return esbuild.build({
    entryPoints: ["electron/main/index.ts", "electron/preload/index.ts"],
    outdir: "dist/vite/electron",
    target: "node16.17.1",
    platform: "node",
    format: "cjs",
    bundle: true,
    external: ["electron", "fsevents"],
    define: {
      "import.meta.env": JSON.stringify({
        BASE_URL: port ? `http://localhost:${port}` : "",
        MODE: watch ? "development" : "production",
        DEV: watch !== undefined,
        PROD: watch === undefined,
        SSR: false,
      }),
    },
    logLevel: "info",
    watch,
    minify,
  });
};
