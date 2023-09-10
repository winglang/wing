import { IFunctionClient } from "../cloud";
import * as functions from "@google-cloud/functions-framework"
import { log } from "console";

export class FunctionClient implements IFunctionClient {
  constructor(
    private readonly functionName: string,
  ) { }

  invoke(payload: string): Promise<string> {
    let result;

    functions.http.call(payload, this.functionName, (req, res) => {
      log(req);
      result = res;
    });

    throw new Error(`baad: ${result}`);
  }
}
