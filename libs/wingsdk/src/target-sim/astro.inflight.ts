import { ApiAttributes, AstroSchema, ASTRO_TYPE } from "./schema-resources";
import { IAstroClient } from "../ex";
import { TraceType } from "../std";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../testing/simulator";

const LOCALHOST_ADDRESS = "127.0.0.1";

export class Astro implements IAstroClient, ISimulatorResourceInstance {
  private readonly root: string;
  private readonly context: ISimulatorContext;
  private server?: {
    stop(): Promise<void>;
  };
  private url?: string;

  constructor(props: AstroSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.root = props.root;
  }

  public async init(): Promise<ApiAttributes> {
    const { dev } = (await eval('import("astro")')) as typeof import("astro");
    const server = await dev({
      root: this.root,
      server: {
        host: LOCALHOST_ADDRESS,
      },
    });
    this.server = { stop: server.stop };

    const addrInfo = server.address;
    this.url = `http://${addrInfo.address}:${addrInfo.port}`;

    this.addTrace(`Astro Server listening on ${this.url}`);

    return {
      url: this.url,
    };
  }

  public async cleanup(): Promise<void> {
    this.addTrace(`Closing Astro Server on ${this.url}`);
    await this.server?.stop();
  }

  private addTrace(message: string): void {
    this.context.addTrace({
      type: TraceType.RESOURCE,
      data: {
        message,
      },
      sourcePath: this.context.resourcePath,
      sourceType: ASTRO_TYPE,
      timestamp: new Date().toISOString(),
    });
  }
}
