import { Construct } from "constructs";
import { SimApp } from "../../wingsdk/test/sim-app";
import { cloud, expect } from "../../wingsdk/src";
import { Bucket, IBucketClient } from "../../wingsdk/src/cloud";
import {
  IFunctionClient,
  IFunctionHandler,
  IFunctionHandlerClient,
} from "../../wingsdk/src/cloud/function";
import { liftObject } from "../../wingsdk/src/core/internal";
import {
  IInflight,
  IInflightHost,
  IResource,
  Node,
  Resource,
} from "../../wingsdk/src/std";
import { parse } from "acorn";
import { walk } from "estree-walker";
import is_reference from "is-reference";
import { inflightId } from "../../wingsdk/src/shared/misc";

type AnyFunction = (...args: any[]) => any;

interface SuperInterface<THandler extends AnyFunction> {
  handle: THandler;
  [key: string]: any;
}

export function inflight<THandlerClient extends { handle: AnyFunction }>(
  options: SuperInterface<THandlerClient["handle"]>
): IInflight {
  const clients: Record<string, string> = {};
  const handler = options.handle;
  let scope = options.scope;

  // get everything from the options except handle, id, and scope
  const bindings: { [key: string]: any } = options;
  delete bindings.handle;

  if (!scope) {
    // find the first construct in the stack and use its scope
    for (const val of Object.values(bindings)) {
      if (val instanceof Construct) {
        scope = val.node.scope;
        break;
      }
    }
    if (!scope) {
      throw new Error("Could not find a scope for this inflight");
    }
  }

  for (const [k, v] of Object.entries(bindings)) {
    clients[k] = liftObject(v);
  }
  const code = handler.toString();
  const ast = parse(code, { ecmaVersion: "latest" });

  // inject the clients into the handler
  const newCode = code.replace(
    "{",
    `{${Object.keys(bindings)
      .map((name) => `const ${name} = this[\"${name}\"];`)
      .join("")}`
  );

  return {
    _id: inflightId(),
    _registerOnLift: (host: IInflightHost, _ops: string[]) => {
      for (const v of Object.values(bindings)) {
        Resource._registerOnLiftObject(v.obj, host, v.ops);
      }
    },
    _supportedOps: () => [],
    onLift: () => {},
    _toInflight: () => `new ((function(){
      return class Handler {
      constructor(clients) {
        for (const [name, client] of Object.entries(clients)) {
          this[name] = client;
        }
      }
      ${newCode}
      };
      })())({
      ${Object.entries(clients)
        .map(([name, client]) => `${name}: ${client}`)
        .join(",\n")}
      })`,
  };
}

const app = new SimApp();

let bucket: Bucket & IBucketClient = new cloud.Bucket(app, "my_bucket") as any;

// bucket.addFile("util.ts", "./util.ts");

// inflight`(event){
//   bucket.put("event", event);
// }`;

new cloud.Function(
  app,
  "my_function",
  inflight<IFunctionHandlerClient>({
    bucket,
    expect,
    async handle(event) {
      await bucket.put("event", event);
      const file = await bucket.get("event");
      expect.Util.equal(file, event);
    },
  })
);

void (async () => {
  const s = await app.startSimulator();
  s.onTrace({
    callback(event) {
      console.log(event);
    },
  });
  const fn = s.getResource("/my_function") as IFunctionClient;
  await fn.invoke("hello");
  await s.stop();
})();

// export interface PreflightResource<TClient> {
//   client: TClient;
// }

// export interface IFunctionHandler2Inflight {}
// export interface IFunctionHandler2
//   extends PreflightResource<IFunctionHandler2Inflight> {}

// // get client type
// export type InflightClient<T extends { client: any }> = T["client"];

// type TTT = InflightClient<IFunctionHandler2>;

// // export class Inflight<TClient> extends Resource {
// //   constructor(scope: Construct, id: string, handler: SuperInterface) {
// //     super(scope, id);
// //   }
// //   public _supportedOps(): string[] {
// //     return ["handle"];
// //   }
// //   public _toInflight(): string {
// //     throw new Error("Method not implemented.");
// //   }
// // }

// let currentConstruct: Construct | undefined;

// // modify the Construct prototype to keep track of the current construct
// // use a proxy to assign to currentConstruct every time a new construct is created

// const cRoot = new Construct(undefined as any, "my_construct");
// // new Construct(cRoot, "my_construct2");

// console.log("Done");
// console.log(currentConstruct);
