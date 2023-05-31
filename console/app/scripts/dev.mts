import { ChildProcess, spawn } from "node:child_process";
import { AddressInfo } from "node:net";

import { BuildContext } from "esbuild";
import * as vite from "vite";

import { createEsbuildContext } from "./helpers/index.mjs";

const createElectronPlugin = (): vite.Plugin => {
  let esbuildProcess: Promise<BuildContext> | undefined;
  const killEsbuildProcess = async () => {
    const { dispose } = (await esbuildProcess) ?? {};
    dispose?.();
  };
  const startEsbuildProcess = async (port: number) => {
    await killEsbuildProcess();

    esbuildProcess = createEsbuildContext({
      define: {
        "process.env.PROD": "false",
        "import.meta.env": JSON.stringify({
          BASE_URL: port ? `http://localhost:${port}` : "",
          MODE: "development",
          DEV: true,
          PROD: false,
          SSR: false,
        }),
        "process.env.SEGMENT_WRITE_KEY": JSON.stringify(
          process.env.SEGMENT_WRITE_KEY || "",
        ),
      },
      plugins: [
        {
          name: "electron",
          setup(build) {
            build.onEnd(async () => {
              await startElectronProcess();
            });
          },
        },
      ],
    });

    const { watch } = await esbuildProcess;
    await watch();
  };

  let electronProcess: ChildProcess | undefined;
  const killElectronProcess = () => {
    electronProcess?.removeAllListeners();
    electronProcess?.kill();
  };
  const startElectronProcess = async () => {
    killElectronProcess();

    const { default: electronPath } = (await import("electron")) as unknown as {
      default: string;
    };
    electronProcess = spawn(electronPath, ["dist/vite/electron/main"], {
      stdio: "inherit",
    });
    electronProcess.on("exit", async () => {
      await killEsbuildProcess();
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(0);
    });
  };

  return {
    name: "electron",
    apply: "serve",
    async configureServer(server) {
      server.httpServer!.on("listening", async () => {
        const address = server.httpServer!.address() as AddressInfo;
        await startEsbuildProcess(address.port);
        await startElectronProcess();
      });
    },
    async closeBundle() {
      killElectronProcess();
      await killEsbuildProcess();
    },
  };
};

const server = await vite.createServer({
  plugins: [createElectronPlugin()],
});
await server.listen();
