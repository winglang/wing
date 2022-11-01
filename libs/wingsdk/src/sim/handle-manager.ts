const HANDLES: Record<string, ISimulatorResource> = {};

/**
 * Maintain a mapping from handles to resource instances. This is used by the
 * simulator to find resources, both for the public API and for when user code
 * needs to call other resource clients.
 *
 * @internal
 */
export class HandleManager {
  public static addInstance(instance: ISimulatorResource): string {
    const handle = instance.handle;
    if (HANDLES[handle]) {
      throw new Error(`Handler instance already exists at ${handle}`);
    }
    HANDLES[handle] = instance;
    return handle;
  }

  public static findInstance(handle: string): ISimulatorResource {
    if (!HANDLES[handle]) {
      throw new Error(`No handler instance at ${handle}`);
    }
    return HANDLES[handle];
  }

  public static removeInstance(handle: string): ISimulatorResource {
    if (!HANDLES[handle]) {
      throw new Error(`No handler instance at ${handle}`);
    }
    const instance = HANDLES[handle];
    delete HANDLES[handle];
    return instance;
  }
}

/**
 * A simulated resource.
 */
export interface ISimulatorResource {
  /**
   * The resource's handle - a name that uniquely identifies the resource across
   * simulation runs.
   */
  readonly handle: string;

  /**
   * Perform any async initialization required by the resource.
   */
  init(): Promise<void>;

  /**
   * Stop the resource and clean up any physical resources it may have created
   * (files, ports, etc).
   */
  cleanup(): Promise<void>;
}

export function makeResourceHandle(
  simulatorId: string,
  resourceType: string,
  path: string
): string {
  return `sim://${simulatorId}/${resourceType.toUpperCase()}/${path}`;
}
