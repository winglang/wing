import { Construct } from "constructs";
import { ISimulatorResource } from "./resource";
import { ContainerSchema } from "./schema-resources";
import { simulatorAttrToken } from "./tokens";
import { bindSimulatorResource, makeSimulatorJsClient } from "./util";
import { fqnForType } from "../constants";
import { App } from "../core";
import { INFLIGHT_SYMBOL } from "../core/types";
import { Util as fs } from "../fs";
import { isPath } from "../shared/misc";
import { BaseResourceSchema } from "../simulator/simulator";
import { IInflightHost, Resource } from "../std";

export const SIM_CONTAINER_FQN = fqnForType("sim.Container");
export const HOST_PORT_ATTR = "host_port";

/**
 * Initialization properties for `sim.Container`.
 */
export interface ContainerProps {
  /**
   * A name for the container.
   */
  readonly name: string;

  /**
   * A name of a public Docker image to pull and run or a path to a local directory with a `Dockerfile`.
   */
  readonly image: string;

  /**
   * Internal container port to expose.
   * @default - no port exposed
   */
  readonly containerPort?: number;

  /**
   * Environment variables to set in the container.
   * @default {}
   */
  readonly env?: Record<string, string>;

  /**
   * Container arguments
   * @default []
   */
  readonly args?: string[];

  /**
   * A glob of local files to consider as input sources for the container, relative to the build
   * context directory.
   *
   * @default - all files
   */
  readonly sourcePattern?: string;

  /**
   * An explicit source hash that represents the container source. if not set, and `sourcePattern`
   * is set, the hash will be calculated based on the content of the source files.
   * @default - calculated based on the source files
   */
  readonly sourceHash?: string;
}

/**
 * Represents a container running in the Wing Simulator.
 *
 * @inflight `@winglang/sdk.sim.IContainerClient`
 */
export class Container extends Resource implements ISimulatorResource {
  /** @internal */
  public [INFLIGHT_SYMBOL]?: IContainerClient;

  private readonly imageTag: string;

  /**
   * A token that resolves to the host port of this container.
   */
  public readonly hostPort?: string;

  constructor(
    scope: Construct,
    id: string,
    private readonly props: ContainerProps
  ) {
    super(scope, id);

    // determine image tag - if the image is a path, we use a source hash (either explicitly
    // provided or calculated based on the source files). if the image is a name, we use the name
    if (isPath(props.image)) {
      const hash = props.sourceHash ?? fs.md5(props.image, props.sourcePattern);
      this.imageTag = `${props.name}:${hash}`;
    } else {
      this.imageTag = props.image;
    }

    if (props.containerPort) {
      this.hostPort = simulatorAttrToken(this, HOST_PORT_ATTR);
    }
  }

  public toSimulator(): BaseResourceSchema {
    const schema: ContainerSchema = {
      type: SIM_CONTAINER_FQN,
      path: this.node.path,
      addr: this.node.addr,
      props: {
        image: this.props.image,
        imageTag: this.imageTag,
        containerPort: this.props.containerPort,
        env: this.props.env,
        args: this.props.args,
        cwd: App.of(this).entrypointDir,
      },
      attrs: {} as any,
    };

    return schema;
  }

  public onLift(host: IInflightHost, ops: string[]): void {
    bindSimulatorResource(__filename, this, host, ops);
    super.onLift(host, ops);
  }

  /** @internal */
  public _supportedOps(): string[] {
    return [];
  }

  /** @internal */
  public _toInflight(): string {
    return makeSimulatorJsClient(__filename, this);
  }
}

/**
 * List of inflight operations available for `sim.Container`.
 * @internal
 */
export enum ContainerInflightMethods {}

/**
 * Inflight interface for `Redis`.
 */
export interface IContainerClient {}
