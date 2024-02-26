import {
  InflightBindings,
  LiftDepsMatrixRaw,
  closureId,
  liftObject,
} from "../core";
import { IInflight, IInflightHost } from "../std";

/**
 * Test utilities.
 * TODO: move this to `test/` - it should not be under `src/`
 */
export class Testing {
  /**
   * Make an `IFunctionHandler`, `IQueueSetConsumerHandler` or any other handler
   * on the fly. The resource will have a single method named "handle".
   *
   * The JavaScript code passed to the handler must be in the form of
   * `async handle(event) { ... }`, and all references to resources must be
   * made through `this.<resource>`.
   *
   * @param code The code of the handler.
   * @param bindings The bindings of the handler.
   */
  public static makeHandler(
    code: string,
    bindings: InflightBindings = {}
  ): IInflight {
    const liftDeps: LiftDepsMatrixRaw = {};
    liftDeps.handle = [];
    for (const v of Object.values(bindings)) {
      liftDeps.handle.push([v.obj, v.ops ?? []]);
    }

    return {
      _id: closureId(),
      _toInflight: () => {
        const clients: Record<string, string> = {};

        for (const [k, v] of Object.entries(bindings)) {
          clients[k] = liftObject(v.obj);
        }

        const inflightCode = `\
new ((function(){
return class Handler {
  constructor(clients) {
    for (const [name, client] of Object.entries(clients)) {
      this[name] = client;
    }
  }
  ${code}
};
})())({
${Object.entries(clients)
  .map(([name, client]) => `${name}: ${client}`)
  .join(",\n")}
})`;

        return inflightCode;
      },
      _liftMap: liftDeps,
      onLift: (_host: IInflightHost, _ops: string[]) => {},
      _supportedOps: () => [],
    };
  }
}
