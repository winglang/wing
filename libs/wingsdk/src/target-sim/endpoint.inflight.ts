import { writeFileSync } from "fs";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { connect, ConnectResponse } from "@winglang/wingtunnels";
import { EndpointAttributes, EndpointSchema } from "./schema-resources";
import { exists } from "./util";
import { IEndpointClient } from "../cloud";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";

const STATE_FILENAME = "state.json";

/**
 * Contents of the state file for this resource.
 */
interface StateFileContents {
  /**
   * The last subdomain used by the tunnel on a previous simulator run.
   */
  readonly subdomain?: string;
}

export type EndpointExposeStatus = "connected" | "disconnected" | "connecting";

export class Endpoint implements IEndpointClient, ISimulatorResourceInstance {
  private connectResponse?: ConnectResponse;
  private lastSubdomain?: string;
  private status: EndpointExposeStatus = "disconnected";
  private _context: ISimulatorContext | undefined;

  constructor(private readonly _props: EndpointSchema["props"]) {}

  private get context(): ISimulatorContext {
    if (!this._context) {
      throw new Error("Cannot access context during class construction");
    }
    return this._context;
  }

  public async init(context: ISimulatorContext): Promise<EndpointAttributes> {
    this._context = context;
    const state: StateFileContents = await this.loadState();
    if (state.subdomain) {
      await this.connect(state.subdomain);
    }

    return {
      inputUrl: this._props.inputUrl,
      url: this.connectResponse?.url ?? this._props.url,
      label: this._props.label,
      browserSupport: this._props.browserSupport,
    };
  }

  public async cleanup(): Promise<void> {
    this.connectResponse?.close();
  }

  public async save(): Promise<void> {
    return this.saveState({
      ...(this.lastSubdomain && { subdomain: this.lastSubdomain }),
    });
  }

  public async expose(): Promise<void> {
    if (this.status === "connecting" || this.status === "connected") {
      throw new Error("Can only expose when status is disconnected.");
    }
    return this.connect();
  }

  public async hide(): Promise<void> {
    this.connectResponse?.close();
    this.connectResponse = undefined;
    this.lastSubdomain = undefined;
    this.status = "disconnected";
  }

  public async exposeStatus(): Promise<EndpointExposeStatus> {
    return this.status;
  }

  private async loadState(): Promise<StateFileContents> {
    const stateFileExists = await exists(
      join(this.context.statedir, STATE_FILENAME)
    );
    if (stateFileExists) {
      const stateFileContents = await readFile(
        join(this.context.statedir, STATE_FILENAME),
        "utf-8"
      );
      return JSON.parse(stateFileContents);
    } else {
      return {};
    }
  }

  private async saveState(state: StateFileContents): Promise<void> {
    writeFileSync(
      join(this.context.statedir, STATE_FILENAME),
      JSON.stringify(state)
    );
  }

  private async connect(subdomain?: string) {
    try {
      await this.context.withTrace({
        message: `Creating tunnel for endpoint. ${
          subdomain ? `Using subdomain: ${subdomain}` : ""
        }`,
        activity: async () => {
          this.status = "connecting";
          this.connectResponse = await connect(this._props.inputUrl, {
            subdomain,
          });
          this.lastSubdomain = new URL(this.connectResponse.url).hostname.split(
            "."
          )[0];
          this.status = "connected";
        },
      });
    } catch {
      this.status = "disconnected";
    }
  }
}
