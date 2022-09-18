import Piscina from "piscina";
import { IFunctionClient } from "../cloud";
import { FunctionSchema } from "./schema";

export interface FunctionResource extends IFunctionClient {
  type: FunctionSchema["type"];
}

export interface CreateFunctionResourceOptions {
  /**
   * The URL for the local server.
   */
  serverURL: string;

  /**
   * The function filename.
   */
  filename: string;
}

export function createFunctionResource({
  serverURL,
  filename,
}: CreateFunctionResourceOptions): FunctionResource {
  const piscina = new Piscina({
    filename,
    env: {
      WING_LOCAL_URL: serverURL,
    },
  });

  return {
    type: "cloud.Function",
    async invoke(input) {
      return piscina.run(input, { name: "handler" });
    },
  };
}
