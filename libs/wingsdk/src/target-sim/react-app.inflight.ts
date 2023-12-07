import { ChildProcess, ExecOptions, exec } from "child_process";
import { writeFileSync } from "fs";
import { join } from "path";
import { promisify } from "util";
import { ReactAppAttributes, ReactAppSchema } from "./schema-resources";
import { IReactAppClient, REACT_APP_FQN, WING_JS } from "../ex";
import { ISimulatorContext, ISimulatorResourceInstance } from "../simulator";
import { TraceType } from "../std";

export class ReactApp implements IReactAppClient, ISimulatorResourceInstance {
  private readonly context: ISimulatorContext;
  private readonly startCommand: string;
  private readonly path: string;
  private readonly environmentVariables: Record<string, string>;
  private readonly useBuildCommand: boolean;
  private childProcess?: ChildProcess;
  private url: string;

  constructor(props: ReactAppSchema["props"], context: ISimulatorContext) {
    this.context = context;
    this.path = props.path;
    this.startCommand = props.startCommand;
    this.environmentVariables = props.environmentVariables;
    this.useBuildCommand = props.useBuildCommand;
    this.url = props.url;
  }

  public async init(): Promise<ReactAppAttributes> {
    this.addTrace(`Executing start command: ${this.startCommand}`);

    writeFileSync(
      join(`${this.path}`, `/public/${WING_JS}`),
      `// This file is generated by wing
window.wingEnv = ${JSON.stringify(this.environmentVariables, null, 2)};`
    );

    const options: ExecOptions = {
      cwd: this.path,
      maxBuffer: 10 * 1024 * 1024,
      windowsHide: true,
    };

    if (this.useBuildCommand) {
      // when we build before deployment, the waiting is necessary
      const { stderr, stdout } = await promisify(exec)(
        this.startCommand,
        options
      );

      if (stderr) {
        throw new Error(stderr);
      }
      if (stdout) {
        this.addTrace(stdout);
      }
    } else {
      // react usually offer hot reloading-
      // we're waiting for execution ending since it's ending only when manually terminating the process
      this.childProcess = exec(
        this.startCommand,
        options,
        (_, stdout, stderr) => {
          if (stderr) {
            throw new Error(stderr);
          }
          if (stdout) {
            this.addTrace(stdout);
          }
        }
      );
    }

    return {
      url: this.url,
    };
  }

  public async cleanup(): Promise<void> {
    this.childProcess?.kill("SIGINT");
  }

  public async save(_dir: string): Promise<void> {}

  private addTrace(message: string): void {
    this.context.addTrace({
      type: TraceType.RESOURCE,
      data: {
        message,
      },
      sourcePath: this.context.resourcePath,
      sourceType: REACT_APP_FQN,
      timestamp: new Date().toISOString(),
    });
  }
}
