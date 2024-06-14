import { spawn } from "child_process";
import * as fs from "fs/promises";
import { join } from "path";
import { IContainerClient, HOST_PORT_ATTR } from "./container";
import { ContainerAttributes, ContainerSchema } from "./schema-resources";
import { exists } from "./util";
import { Util as Fs } from "../fs";
import { isPath } from "../shared/misc";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator/simulator";
import { Duration, LogLevel, TraceType } from "../std";
import { Util } from "../util";

const STATE_FILENAME = "state.json";

/**
 * Contents of the state file for this resource.
 */
interface StateFileContents {
  /**
   * A mapping of volume paths to the Wing-managed volume names, which will be reused
   * across simulator runs.
   */
  readonly managedVolumes?: Record<string, string>;
}

export class Container implements IContainerClient, ISimulatorResourceInstance {
  private readonly imageTag: string;
  private readonly containerName: string;
  private _context: ISimulatorContext | undefined;
  private managedVolumes: Record<string, string>;
  private child: DockerProcess | undefined;

  public constructor(private readonly props: ContainerSchema) {
    this.imageTag = props.imageTag;
    this.containerName = `wing-${Util.ulid()}`.toLocaleLowerCase();
    this.managedVolumes = {};
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<ContainerAttributes> {
    try {
      return await this.start(context);
    } catch (e: any) {
      this.addTrace(
        `Failed to start container: ${e.message}`,
        TraceType.RESOURCE,
        LogLevel.ERROR
      );

      return {};
    }
  }

  public async start(context: ISimulatorContext): Promise<ContainerAttributes> {
    this._context = context;

    // Check for a previous state file to see if there was a port that was previously being used
    // if so, try to use it out of convenience
    const state: StateFileContents = await this.loadState();
    if (state.managedVolumes) {
      this.managedVolumes = state.managedVolumes;
    }

    await this.prepareImage();

    // start the new container
    const dockerRun: string[] = [];
    dockerRun.push("-i");
    dockerRun.push("--rm");
    dockerRun.push("--name", this.containerName);

    if (this.props.network) {
      dockerRun.push(`--network=${this.props.network}`);
    }

    if (this.props.containerPort) {
      dockerRun.push("-p", this.props.containerPort.toString());
    }

    const envFile = await this.createEnvFile();
    if (envFile) {
      dockerRun.push("--env-file", envFile);
    }

    for (const volume of this.props.volumes ?? []) {
      dockerRun.push("-v");

      // if the user specified an anonymous volume
      if (volume.startsWith("/") && !volume.includes(":")) {
        // check if we have a managed volume for this path from a previous run
        if (this.managedVolumes[volume]) {
          const volumeName = this.managedVolumes[volume];
          dockerRun.push(`${volumeName}:${volume}`);
        } else {
          const volumeName = `wing-volume-${Util.ulid()}`;
          dockerRun.push(`${volumeName}:${volume}`);
          this.managedVolumes[volume] = volumeName;
        }
      } else {
        dockerRun.push(volume);
      }
    }

    if (this.props.entrypoint) {
      dockerRun.push("--entrypoint");
      dockerRun.push(this.props.entrypoint);
    }

    dockerRun.push(this.imageTag);

    for (const a of this.props.args ?? []) {
      dockerRun.push(a);
    }

    this.addTrace(
      `Starting container from ${this.imageTag}`,
      TraceType.RESOURCE,
      LogLevel.VERBOSE
    );

    this.child = this.dockerSpawn("run", dockerRun, {
      logLevel: LogLevel.INFO,
    });

    this.addTrace(
      `Waiting for container to ${
        this.props.containerPort
          ? `listen to ${this.props.containerPort}`
          : "start"
      }`,
      TraceType.RESOURCE,
      LogLevel.VERBOSE
    );

    let hostPort: string | undefined;
    await waitUntil(async () => {
      if (!this.child?.running) {
        throw new Error(`Container ${this.imageTag} stopped unexpectedly`);
      }

      const container = await this.tryInspect(this.containerName);

      // if we are waiting for a port, check if the container is listening to it
      if (this.props.containerPort) {
        // when using the host network, the host port is the same as the container port
        if (this.props.network === "host") {
          hostPort = this.props.containerPort.toString();
          return (
            container?.[0]?.Config?.ExposedPorts?.[`${hostPort}/tcp`] !==
            undefined
          );
        }

        hostPort =
          container?.[0]?.NetworkSettings?.Ports?.[
            `${this.props.containerPort}/tcp`
          ]?.[0]?.HostPort;

        return hostPort !== undefined;
      }

      // if we are not waiting for a port, just check if the container is running
      return container?.[0]?.State?.Running;
    });

    this.addTrace(
      `Container ${this.imageTag} started`,
      TraceType.RESOURCE,
      LogLevel.VERBOSE
    );

    return {
      [HOST_PORT_ATTR]: hostPort,
    };
  }

  /**
   * Builds or pulls the docker image used by this container.
   */
  private async prepareImage() {
    // if this image is already here, we don't need to do anything
    if (await this.tryInspect(this.imageTag)) {
      this.addTrace(
        `Image ${this.imageTag} found, No need to build or pull.`,
        TraceType.RESOURCE,
        LogLevel.VERBOSE
      );

      return;
    }

    // if this a reference to a local directory, build the image from a docker file
    if (isPath(this.props.image)) {
      this.addTrace(
        `Building ${this.imageTag} from ${this.props.image}...`,
        TraceType.RESOURCE,
        LogLevel.VERBOSE
      );
      await this.docker("build", ["-t", this.imageTag, this.props.image], {
        logLevel: LogLevel.VERBOSE,
      });
    } else {
      this.addTrace(
        `Pulling ${this.imageTag}...`,
        TraceType.RESOURCE,
        LogLevel.VERBOSE
      );
      await this.docker("pull", [this.imageTag], {
        logLevel: LogLevel.VERBOSE,
      });
    }
  }

  private async createEnvFile() {
    const env = this.props.env ?? {};
    if (Object.keys(env).length === 0) {
      return undefined;
    }

    const envFile = join(Fs.mkdtemp(), "env.json");
    const envLines = [];
    for (const k of Object.keys(env)) {
      envLines.push(`${k}=${env[k]}`);
    }

    await fs.writeFile(envFile, envLines.join("\n"));
    return envFile;
  }

  private async tryInspect(name: string): Promise<any | undefined> {
    try {
      return JSON.parse(
        await this.docker("inspect", [name], {
          quiet: true,
        })
      );
    } catch {
      return undefined;
    }
  }

  public async cleanup(): Promise<void> {
    this.addTrace(
      `Stopping container ${this.containerName}`,
      TraceType.RESOURCE,
      LogLevel.VERBOSE
    );

    await this.child?.kill();
  }

  public async save(): Promise<void> {
    await this.saveState({ managedVolumes: this.managedVolumes });
  }

  private async loadState(): Promise<StateFileContents> {
    const stateFileExists = await exists(
      join(this.context.statedir, STATE_FILENAME)
    );
    if (stateFileExists) {
      const stateFileContents = await fs.readFile(
        join(this.context.statedir, STATE_FILENAME),
        "utf-8"
      );
      return JSON.parse(stateFileContents);
    } else {
      return {};
    }
  }

  private async docker(
    command: string,
    args: string[],
    options: DockerOptions = {}
  ): Promise<string> {
    const child = this.dockerSpawn(command, args, options);
    return child.join();
  }

  private dockerSpawn(
    command: string,
    args: string[],
    options: DockerOptions = {}
  ): DockerProcess {
    let quiet = options.quiet ?? false;
    const level = options.logLevel ?? LogLevel.INFO;
    const logErrors = !quiet;

    // can be used to hide container logs (used in our end to end tests). yes, ugly bit pragmatic.
    // otherwise, test output will include lots of non deterministic stuff and that's really hard to
    // snapshot.
    if (process.env.WING_HIDE_CONTAINER_LOGS) {
      quiet = true;
    }

    const commandDesc = `docker ${command}`;

    this.addTrace(
      `$ ${commandDesc} ${args.join(" ")}`,
      TraceType.RESOURCE,
      LogLevel.VERBOSE
    );

    const child = spawn("docker", [command, ...args], {
      cwd: this.props.cwd,
      stdio: "pipe",
    });

    let started = true;

    child.once("exit", () => {
      started = false;
    });

    const stdout: Buffer[] = [];
    const allOutput: Buffer[] = [];
    child.stdout.on("data", (data) => {
      stdout.push(data);
      allOutput.push(data);
    });

    child.stderr.on("data", (data) => {
      allOutput.push(data);
    });

    if (!quiet) {
      child.stdout.on("data", (data) =>
        this.addTrace(data.toString(), TraceType.LOG, level)
      );

      child.stderr.on("data", (data) =>
        this.addTrace(data.toString(), TraceType.LOG, level)
      );
    }

    child.once("error", (err) => {
      started = false;

      if (logErrors) {
        this.addTrace(err.stack ?? err.message, TraceType.LOG, LogLevel.ERROR);
      }
    });

    const self = this;

    return {
      get running() {
        return started;
      },
      async kill() {
        return new Promise((resolve, reject) => {
          if (!started) {
            return resolve();
          }

          self.addTrace(
            "Sending SIGTERM to container",
            TraceType.RESOURCE,
            LogLevel.VERBOSE
          );

          child.kill("SIGTERM");

          // if the process doesn't exit in 2 seconds, kill it
          const timeout = setTimeout(() => {
            self.addTrace(
              `Timeout waiting for container ${self._context?.resourcePath} to shutdown, removing forcefully`,
              TraceType.RESOURCE,
              LogLevel.WARNING
            );

            self
              .docker("rm", ["-f", self.containerName], { quiet: true })
              .catch(() => {});
          }, 2000);

          child.once("error", (err) => {
            self.addTrace(
              `Error when shutting down container: ${err.stack ?? err.message}`,
              TraceType.RESOURCE,
              LogLevel.ERROR
            );

            clearTimeout(timeout);
            reject(err);
          });

          child.once("exit", () => {
            self.addTrace(
              "Container shutdown successfully",
              TraceType.RESOURCE,
              LogLevel.VERBOSE
            );
            clearTimeout(timeout);
            resolve();
          });
        });
      },
      async join() {
        return new Promise((ok, ko) => {
          if (!started) {
            return ok(stdout.join(""));
          }

          child.once("error", ko);
          child.once("exit", (code) => {
            if (code === 0) {
              return ok(stdout.join(""));
            } else {
              const message = `Command "${commandDesc}" exited with non-zero code ${code}`;
              if (logErrors) {
                self.addTrace(
                  `${message}}\n${allOutput.join("")}`,
                  TraceType.RESOURCE,
                  LogLevel.VERBOSE
                );
              }

              return ko(new Error(`${message} (see verbose logs)`));
            }
          });
        });
      },
    };
  }

  private async saveState(state: StateFileContents): Promise<void> {
    await fs.writeFile(
      join(this.context.statedir, STATE_FILENAME),
      JSON.stringify(state)
    );
  }

  public async plan() {
    return UpdatePlan.AUTO;
  }

  private addTrace(message: string, type: TraceType, level: LogLevel) {
    this.context.addTrace({
      data: { message: message.trim() },
      sourcePath: this.context.resourcePath,
      sourceType: "container",
      timestamp: new Date().toISOString(),
      type,
      level,
    });
  }
}

async function waitUntil(predicate: () => Promise<boolean>) {
  const timeout = Duration.fromSeconds(30);
  const interval = Duration.fromSeconds(0.1);
  let elapsed = 0;
  while (elapsed < timeout.seconds) {
    if (await predicate()) {
      return true;
    }
    elapsed += interval.seconds;
    await Util.sleep(interval);
  }

  throw new Error("Timeout elapsed");
}

/**
 * Represents the docker child process.
 */
interface DockerProcess {
  /**
   * Whether the process is running or not.
   */
  readonly running: boolean;

  /**
   * Waits for the process to exit and returns the output.
   * @returns The output of the process.
   */
  join: () => Promise<string>;

  /**
   * Kills the process.
   */
  kill: () => Promise<void>;
}

interface DockerOptions {
  /**
   * Can be used to surpress all logging from the command.
   * @default false
   */
  readonly quiet?: boolean;

  /**
   * The log level to use for container output (both STDOUT and STDERR will use the same log level).
   * @default LogLevel.INFO
   */
  readonly logLevel?: LogLevel;
}
