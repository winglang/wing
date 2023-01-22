import httpServer from "http-server";
import { ISimulatorContext } from "../testing";
import { ISimulatorResourceInstance } from "./resource";
import { WebAppSchema } from "./schema-resources";
import * as http from "http";

export class WebApp implements ISimulatorResourceInstance {
  private readonly dist: string;
  private server?: http.Server = undefined;

  constructor(props: WebAppSchema["props"], context: ISimulatorContext) {
    this.dist = props.dist;
    context;
  }

  async init(): Promise<void> {
    this.server = httpServer.createServer({ root: this.dist, autoIndex: true }).listen(8080);
    console.log("dist:", this.dist);
    console.log("server started on http://localhost:9000");
  }

  async cleanup(): Promise<void> {
    return new Promise((ok, ko) => {
      this.server?.close((err) => {
        if (err) {
          return ko(err);
        } else {
          return ok();
        }
      });
    });
  }
}
