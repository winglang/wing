import { execFile } from "child_process";
import { createHash } from "crypto";
import { readFileSync } from "fs";
import { IInflight } from "../std";

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

// const hashCounters = new Map<string, number>();

export function inflightId(inflight: IInflight) {
  const hash =
    inflight._hash ??
    createHash("sha256").update(inflight._toInflight()).digest("hex");
  // const counter = hashCounters.get(hash) ?? 0;
  // hashCounters.set(hash, counter + 1);

  return hash.slice(0, 5);
}
