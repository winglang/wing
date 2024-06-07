import { writeFileSync, readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { Construct } from "constructs";
import { platform, core, std } from "@winglang/sdk";
import { PolyconFactory } from "@winglang/sdk/lib/core";

const PARENT_PROPERTIES: Set<string> = new Set([
  "node",
  "onLiftMap",
  ...Object.getOwnPropertyNames(Construct),
]);

export class Platform implements platform.IPlatform {
  public readonly target = "*";
  /**
   * A summary of methods and property usage for each resource time
   * @internal
   */
  public _usageContext: Map<string, Set<string>> = new Map();
  private readonly jsii;
  constructor() {
    this.jsii = JSON.parse(
      readFileSync(
        join(require.resolve("@winglang/sdk"), "..", "..", ".jsii"),
        {
          encoding: "utf8",
        }
      )
    );
  }

  newInstance(fqn: string, scope: Construct, id: string, ...args: any) {
    const type = PolyconFactory.of(scope).resolveType(fqn);

    if (!type) {
      return undefined;
    }

    const jsiiType = this.jsii.types[fqn];
    const allowedMethods = [
      ...(jsiiType?.methods ?? []),
      ...(jsiiType?.properties ?? []),
    ];

    return new Proxy(new type(scope, id, ...args), {
      get: (target, prop: string | Symbol) => {
        // capturing the lifted ops
        if (prop === "onLift") {
          return (host: std.IInflightHost, ops: string[]) => {
            ops.forEach((op: string) => this._addToUsageContext(target, op));
            return target[prop](host, ops);
          };
        }

        if (
          typeof prop === "string" &&
          !prop.startsWith("_") &&
          !PARENT_PROPERTIES.has(prop) &&
          !!allowedMethods.find(
            (o: { name: string; protected?: boolean }) =>
              o.name === prop && !o.protected
          )
        ) {
          this._addToUsageContext(target, prop);
        }
        return target[prop as string];
      },
      set: (target, prop, newValue) => {
        if (typeof prop === "string" && !prop.startsWith("_")) {
          this._addToUsageContext(target, prop);
        }

        target[prop] = newValue;
        return true;
      },
    });
  }

  preSynth(app: Construct) {
    this._writeAppUsage(app as core.App);
  }

  /**
   * Adds an op to usage context
   * @param op
   * @internal
   */
  public _addToUsageContext(parent: any, op: string): void {
    const className = parent.constructor.name;

    if (["handle", "$inflight_init"].includes(op)) {
      return;
    }
    const usageContext = this._usageContext.get(className);
    if (!usageContext) {
      this._usageContext.set(className, new Set([op]));
    } else {
      usageContext.add(op);
    }
  }

  /**
   * Write the usage context into a file in the out dir
   * @internal
   */
  private _writeAppUsage(app: core.App): void {
    const context: Record<string, string[]> = {};
    for (const key of this._usageContext.keys()) {
      context[key] = Array.from(this._usageContext.get(key) ?? []);
    }

    writeFileSync(
      resolve(app.outdir, "usage_context.json"),
      JSON.stringify(context, null, 2)
    );
  }
}
