import { execFile } from "child_process";
import { readFileSync } from "fs";
import { promisify } from "util";
import { v4 as uuidv4 } from "uuid";

const execFilePromise = promisify(execFile);

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
  const { stdout } = await execFilePromise(cmd, args);
  return stdout;
}

export function generateDockerContainerName(prefix: string): string {
  // Docker checks against [a-zA-Z0-9][a-zA-Z0-9_.-]
  const name = prefix.replace(/[^a-zA-Z0-9_.-]/g, "-");
  return `${name}-${uuidv4()}`;
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
  try {
    await runCommand("docker", ["inspect", imageName]);
  } catch {
    await runCommand("docker", ["pull", imageName]);
  }
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
