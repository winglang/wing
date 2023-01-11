import { ChildProcess, spawn } from "node:child_process";
import { AddressInfo } from "node:net";

import { BuildResult } from "esbuild";
import * as vite from "vite";

import { runEsbuild } from "./helpers/runEsbuild.mjs";

const createElectronPlugin = (): vite.Plugin => {
  let esbuildProcess: Promise<BuildResult> | undefined;
  const killEsbuildProcess = async () => {
    const { stop } = (await esbuildProcess) ?? {};
    stop?.();
  };
  const startEsbuildProcess = async (port: number) => {
    await killEsbuildProcess();

    esbuildProcess = runEsbuild({
      port,
      watch: {
        async onRebuild(error, result) {
          if (!error) {
            await startElectronProcess();
          }
        },
      },
    });

    await esbuildProcess;
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
    electronProcess = spawn(electronPath, ["."], {
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
