import { spawn } from "child_process";
import * as fs from "fs";
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

interface DockerProcess {
  readonly started: boolean;
  join: () => Promise<string>;
  kill: (code: any) => Promise<void>;
}

interface DockerSpawnOptions {
  stderr?: boolean;
  stdout?: boolean;
  onError?: (err: Error) => void;
}

export class Container implements IContainerClient, ISimulatorResourceInstance {
  private readonly imageTag: string;
  private readonly containerName: string;
  private _context: ISimulatorContext | undefined;
  private managedVolumes: Record<string, string>;
  private child: DockerProcess | undefined;

  public constructor(private readonly props: ContainerSchema) {
    this.imageTag = props.imageTag;

    this.containerName = `wing-container-${Util.ulid()}`;
    this.managedVolumes = {};
  }

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<ContainerAttributes> {
    this._context = context;

    // Check for a previous state file to see if there was a port that was previously being used
    // if so, try to use it out of convenience
    const state: StateFileContents = await this.loadState();
    if (state.managedVolumes) {
      this.managedVolumes = state.managedVolumes;
    }

    if (!(await this.tryInspect(this.imageTag))) {
      // if this a reference to a local directory, build the image from a docker file
      if (isPath(this.props.image)) {
        this.addTrace(
          `Image ${this.imageTag} not found, building from ${this.props.image}...`,
          TraceType.RESOURCE
        );
        await this.docker("build", ["-t", this.imageTag, this.props.image], {
          stdout: true,
          stderr: true,
        });
      } else {
        this.addTrace(
          `Image ${this.imageTag} not found, pulling...`,
          TraceType.RESOURCE
        );
        await this.docker("pull", [this.imageTag], {
          stdout: true,
          stderr: true,
        });
      }
    } else {
      this.addTrace(
        `Image ${this.imageTag} found, No need to build or pull.`,
        TraceType.RESOURCE
      );
    }

    // start the new container
    const dockerRun: string[] = [];
    dockerRun.push("-i");
    dockerRun.push("--rm");
    dockerRun.push("--name", this.containerName);

    if (this.props.containerPort) {
      dockerRun.push("-p", this.props.containerPort.toString());
    }

    const envFile = this.createEnvFile();
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

    dockerRun.push(this.imageTag);

    for (const a of this.props.args ?? []) {
      dockerRun.push(a);
    }

    this.addTrace(
      `Starting container from ${this.imageTag}...`,
      TraceType.RESOURCE
    );

    this.child = this.dockerSpawn("run", dockerRun, {
      stdout: true,
      stderr: true,
      onError: (err) => {
        this.addTrace(err.stack ?? err.message, TraceType.LOG, LogLevel.ERROR);
      },
    });

    let hostPort: number | undefined;
    await waitUntil(async () => {
      if (!this.child?.started) {
        throw new Error(`container ${this.imageTag} stopped unexpectedly`);
      }

      const container = await this.tryInspect(this.containerName);

      // if we are waiting for a port, check if the container is listening to it
      if (this.props.containerPort) {
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
      LogLevel.INFO
    );

    return {
      [HOST_PORT_ATTR]: hostPort,
    };
  }

  private createEnvFile() {
    const env = this.props.env ?? {};
    if (Object.keys(env).length === 0) {
      return undefined;
    }

    const envFile = join(Fs.mkdtemp(), "env.json");
    const envLines = [];
    for (const k of Object.keys(env)) {
      envLines.push(`${k}=${env[k]}`);
    }

    Fs.writeFile(envFile, envLines.join("\n"));
    return envFile;
  }

  private async tryInspect(name: string): Promise<any | undefined> {
    try {
      return JSON.parse(
        await this.docker("inspect", [name], {
          stderr: false,
          stdout: false,
        })
      );
    } catch {
      return undefined;
    }
  }

  public async cleanup(): Promise<void> {
    this.addTrace(
      `Stopping container ${this.containerName}`,
      TraceType.RESOURCE
    );
    await this.child?.kill("SIGKILL");
    await this.docker("rm", ["-f", this.containerName]);
  }

  public async save(): Promise<void> {
    await this.saveState({ managedVolumes: this.managedVolumes });
  }

  private async loadState(): Promise<StateFileContents> {
    const stateFileExists = await exists(
      join(this.context.statedir, STATE_FILENAME)
    );
    if (stateFileExists) {
      const stateFileContents = await fs.promises.readFile(
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
    options: DockerSpawnOptions = {}
  ): Promise<string> {
    const child = this.dockerSpawn(command, args, options);
    return child.join();
  }

  private dockerSpawn(
    command: string,
    args: string[],
    options: DockerSpawnOptions = {}
  ): DockerProcess {
    let logStdout = options.stdout ?? false;
    const logStderr = options.stderr ?? false;
    const onError = options.onError;

    // can be used to hide container logs (used in our end to end tests)
    if (process.env.WING_HIDE_CONTAINER_LOGS) {
      logStdout = false;
    }

    this.addTrace(
      `Running: docker ${command} ${args.join(" ")}`,
      TraceType.RESOURCE,
      LogLevel.VERBOSE
    );

    const child = spawn("docker", [command, ...args], {
      cwd: this.props.cwd,
      stdio: "pipe",
    });

    let started = true;

    child.once("exit", (code) => {
      started = false;

      if (onError && code !== 0 && code != null) {
        onError(new Error(`non-zero exit code: ${code}`));
      }
    });

    const output: Buffer[] = [];

    child.stdout.on("data", (data) => {
      output.push(data);

      if (logStdout) {
        this.addTrace(data.toString(), TraceType.LOG, LogLevel.INFO);
      }
    });

    if (logStderr) {
      child.stderr.on("data", (data) => {
        this.addTrace(data.toString(), TraceType.LOG, LogLevel.INFO);
      });
    }

    child.on("error", (err) => {
      started = false;

      if (logStderr) {
        this.addTrace(err.stack ?? err.message, TraceType.LOG, LogLevel.ERROR);
      }

      if (onError) {
        onError(err);
      }
    });

    return {
      get started() {
        return started;
      },
      async kill() {
        return new Promise((ok, ko) => {
          if (!started) {
            return ok();
          }

          child.kill("SIGKILL");
          child.once("error", ko);
          child.once("exit", ok);
        });
      },
      async join() {
        return new Promise((ok, ko) => {
          if (!started) {
            return ok(output.join(""));
          }

          child.once("error", ko);
          child.once("exit", (code) => {
            if (code === 0) {
              return ok(output.join(""));
            } else {
              return ko(
                new Error(`non-zero exit code ${code}: ${output.join("")}`)
              );
            }
          });
        });
      },
    };
  }

  private async saveState(state: StateFileContents): Promise<void> {
    fs.writeFileSync(
      join(this.context.statedir, STATE_FILENAME),
      JSON.stringify(state)
    );
  }

  public async plan() {
    return UpdatePlan.AUTO;
  }

  private addTrace(
    message: string,
    type: TraceType,
    level: LogLevel = LogLevel.VERBOSE
  ) {
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
  const timeout = Duration.fromMinutes(1);
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
