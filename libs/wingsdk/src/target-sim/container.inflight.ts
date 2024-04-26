import * as fs from "fs";
import { join } from "path";
import { IContainerClient, HOST_PORT_ATTR } from "./container";
import { ContainerAttributes, ContainerSchema } from "./schema-resources";
import { exists } from "./util";
import { isPath, runCommand, shell } from "../shared/misc";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
  UpdatePlan,
} from "../simulator/simulator";
import { Duration, TraceType } from "../std";
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

    // if this a reference to a local directory, build the image from a docker file
    if (isPath(this.props.image)) {
      // check if the image is already built
      try {
        await runCommand("docker", ["inspect", this.imageTag]);
        this.log(`image ${this.imageTag} already exists`);
      } catch {
        this.log(
          `building locally from ${this.props.image} and tagging ${this.imageTag}...`
        );
        await runCommand(
          "docker",
          ["build", "-t", this.imageTag, this.props.image],
          { cwd: this.props.cwd }
        );
      }
    } else {
      try {
        await runCommand("docker", ["inspect", this.imageTag]);
        this.log(`image ${this.imageTag} already exists`);
      } catch {
        this.log(`pulling ${this.imageTag}`);
        await runCommand("docker", ["pull", this.imageTag]);
      }
    }

    // start the new container
    const dockerRun: string[] = [];
    dockerRun.push("run");
    dockerRun.push("--detach");
    dockerRun.push("--rm");

    dockerRun.push("--name", this.containerName);

    if (this.props.containerPort) {
      dockerRun.push("-p");
      dockerRun.push(this.props.containerPort.toString());
    }

    if (this.props.env && Object.keys(this.props.env).length > 0) {
      dockerRun.push("-e");
      for (const k of Object.keys(this.props.env)) {
        dockerRun.push(`${k}=${this.props.env[k]}`);
      }
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

    this.log(`starting container from image ${this.imageTag}`);
    this.log(`docker ${dockerRun.join(" ")}`);

    await shell("docker", dockerRun);

    this.log(`containerName=${this.containerName}`);

    // wait until the container is running
    await waitUntil(async () => {
      const container = JSON.parse(
        await runCommand("docker", ["inspect", this.containerName])
      );
      return container?.[0]?.State?.Running;
    });

    if (!this.props.containerPort) {
      return {};
    }

    const container = JSON.parse(
      await runCommand("docker", ["inspect", this.containerName])
    );

    const hostPort =
      container?.[0]?.NetworkSettings?.Ports?.[
        `${this.props.containerPort}/tcp`
      ]?.[0]?.HostPort;

    if (!hostPort) {
      throw new Error(
        `Container does not listen to port ${this.props.containerPort}`
      );
    }

    return {
      [HOST_PORT_ATTR]: hostPort,
    };
  }

  public async cleanup(): Promise<void> {
    this.log(`Stopping container ${this.containerName}`);
    await runCommand("docker", ["rm", "-f", this.containerName]);
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

  private async saveState(state: StateFileContents): Promise<void> {
    fs.writeFileSync(
      join(this.context.statedir, STATE_FILENAME),
      JSON.stringify(state)
    );
  }

  public async plan() {
    return UpdatePlan.AUTO;
  }

  private log(message: string) {
    this.context.addTrace({
      data: { message },
      sourcePath: this.context.resourcePath,
      sourceType: "container",
      timestamp: new Date().toISOString(),
      type: TraceType.RESOURCE,
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
