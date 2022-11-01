export const HANDLES: Record<string, IResourceSim> = {};

export class HandleManager {
  public static addInstance(instance: IResourceSim): string {
    const handle = instance.handle;
    if (HANDLES[handle]) {
      throw new Error(`Handler instance already exists at ${handle}`);
    }
    HANDLES[handle] = instance;
    return handle;
  }

  public static getInstance(handle: string): IResourceSim {
    if (!HANDLES[handle]) {
      throw new Error(`No handler instance at ${handle}`);
    }
    return HANDLES[handle];
  }

  public static removeInstance(handle: string): IResourceSim {
    if (!HANDLES[handle]) {
      throw new Error(`No handler instance at ${handle}`);
    }
    const instance = HANDLES[handle];
    delete HANDLES[handle];
    return instance;
  }
}

// TODO
export interface IResourceSim {
  readonly handle: string;
}

export function makeResourceHandle(
  simulatorId: string,
  resourceType: string,
  path: string
): string {
  return `sim://${simulatorId}/${resourceType.toUpperCase()}/${path}`;
}
