import { writeFileSync } from "fs";
import { resolve } from "path";
import { IPlatform } from "@winglang/sdk/lib/platform";
import { Construct } from "constructs";
import { App } from "@winglang/sdk/lib/core";

const PARENT_PROPERTIES: Set<string> = new Set([
  "node",
  "onLiftMap",
  ...Object.getOwnPropertyNames(Construct),
  ...Object.getOwnPropertyNames(Construct.prototype),
]);

export class Platform implements IPlatform {
  public readonly target = "*";
  /**
   * A summary of methods and property usage for each resource time
   * @internal
   */
  public _usageContext: Map<string, Set<string>> = new Map();

  newInstance(fqn: string, scope: Construct, id: string, args: any) {
    //@ts-expect-error - accessing protected method
    const type = App.of(scope).typeForFqn(fqn);

    if (!type) {
      return undefined;
    }

    return new Proxy(new type(scope, id, ...args), {
      get: (target, prop: string | Symbol) => {
        if (
          typeof prop === "string" &&
          !prop.startsWith("_") &&
          !PARENT_PROPERTIES.has(prop)
        ) {
          this._addToUsageContext(target, prop);
        }
        //@ts-ignore
        return target[prop];
      },
      set: (target, prop, newValue) => {
        if (typeof prop === "string" && !prop.startsWith("_")) {
          this._addToUsageContext(target, prop);
        }
        //@ts-ignore
        target[prop] = newValue;
        return true;
      },
    });
  }

  preSynth(app: Construct) {
    for (const c of app.node.findAll()) {
      if ((c as any).onLiftMap?.size) {
        (c as any).onLiftMap.forEach((ops: Set<string>) => {
          ops.forEach((op: string) => this._addToUsageContext(c, op));
        });
      }
    }
    this._writeAppUsage(app as App);
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
  private _writeAppUsage(app: App): void {
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
