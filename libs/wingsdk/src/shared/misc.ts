import { execFile } from "child_process";
import { readFileSync } from "fs";
import { IConstruct } from "constructs";
import { App } from "../core";

export function readJsonSync(file: string) {
  return JSON.parse(readFileSync(file, "utf-8"));
}

/**
 * Normalize windows paths to be posix-like.
 */
export function normalPath(path: string) {
  if (process.platform === "win32") {
    return (
      path
        // force posix path separator
        .replace(/\\+/g, "/")
    );
  } else {
    return path;
  }
}

/**
 * Just a helpful wrapper around `execFile` that returns a promise.
 */
export async function runCommand(cmd: string, args: string[]): Promise<any> {
  const raw = await new Promise((resolve, reject) => {
    execFile(cmd, args, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr);
        reject(error);
      }
      resolve(stdout);
    });
  });
  return raw;
}

export interface runDockerImageProps {
  imageName: string;
  containerName: string;
  containerPort: string;
}

/**
 * Runs a given docker image and returns the host port for the new container.
 */
export async function runDockerImage({
  imageName,
  containerName,
  containerPort,
}: runDockerImageProps): Promise<{ hostPort: string }> {
  // Pull docker image
  await runCommand("docker", ["pull", imageName]);

  // Run the container and allow docker to assign a host port dynamically
  await runCommand("docker", [
    "run",
    "--detach",
    "--name",
    containerName,
    "-p",
    containerPort,
    imageName,
  ]);

  // Inspect the container to get the host port
  const out = await runCommand("docker", ["inspect", containerName]);
  const hostPort =
    JSON.parse(out)[0].NetworkSettings.Ports[`${containerPort}/tcp`][0]
      .HostPort;

  return { hostPort };
}

const SEQUENTIAL_ID_SYMBOL = Symbol.for(
  "@winglang/sdk.shared.makeSequentialId"
);

/**
 * Generate a unique ID for the given scope and prefix. The newly generated ID is
 * guaranteed to be unique within the given scope.
 * It will have the form '<prefix><n>', where '<prefix>' is the given prefix and '<n>' is an
 * increasing sequence of integers starting from '0'.
 */
export function makeSequentialId(scope: IConstruct, prefix: string = "") {
  const key = `${scope.node.addr}|${prefix}`;
  const app = App.of(scope) as any;
  app[SEQUENTIAL_ID_SYMBOL] = app[SEQUENTIAL_ID_SYMBOL] ?? {};
  const counterMap: Record<string, number> = app[SEQUENTIAL_ID_SYMBOL];

  counterMap[key] = counterMap[key] ?? 0;

  return `${prefix}${counterMap[key]++}`;
}
