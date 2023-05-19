import * as path from "path";
import * as util from "util";
import { NodeVM } from "vm2";
import {
  FunctionAttributes,
  FunctionSchema,
  FUNCTION_TYPE,
} from "./schema-resources";
import { IFunctionClient, TraceType } from "../cloud";
import {
  ISimulatorContext,
  ISimulatorResourceInstance,
} from "../testing/simulator";

export class Function implements IFunctionClient, ISimulatorResourceInstance {
  private readonly filename: string;
  private readonly env: Record<string, string>;
  private readonly context: ISimulatorContext;
  private readonly timeout: number;

  constructor(props: FunctionSchema["props"], context: ISimulatorContext) {
    if (props.sourceCodeLanguage !== "javascript") {
      throw new Error("Only JavaScript is supported");
    }
    this.filename = path.resolve(context.simdir, props.sourceCodeFile);
    this.env = props.environmentVariables ?? {};
    this.context = context;
    this.timeout = props.timeout;
  }

  public async init(): Promise<FunctionAttributes> {
    return {};
  }

  public async cleanup(): Promise<void> {
    return;
  }

  public async invoke(payload: string): Promise<any> {
    return this.context.withTrace({
      message: `Invoke (payload=${JSON.stringify(payload)}).`,
      activity: async () => {
        const vm = new NodeVM({
          console: "redirect", // we hijack `console.xxx` in `cloud/function.ts`
          require: {
            external: true,
            builtin: ["*"], // allow using all node modules
            context: "sandbox", // require inside the sandbox (addresses #1871)
          },
          sandbox: {
            $simulator: this.context,
          },
          env: {
            ...process.env,
            ...this.env,
          },
          timeout: this.timeout,
        });

        // see https://github.com/patriksimek/vm2/blob/master/lib/nodevm.js#L89
        const levels = [
          "debug",
          "info",
          "log",
          "warn",
          "error",
          "dir",
          "trace",
        ];

        for (const level of levels) {
          vm.on(`console.${level}`, (...args) => {
            const message = util.format(...args);
            this.context.addTrace({
              data: { message },
              type: TraceType.LOG,
              sourcePath: this.context.resourcePath,
              sourceType: FUNCTION_TYPE,
              timestamp: new Date().toISOString(),
            });
          });
        }

        const index = vm.runFile(this.filename);
        return index.handler(payload);
      },
    });
  }
}
