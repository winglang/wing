import { ISimulatorResourceInstance } from "./resource";
import { TimerSchema } from "./schema-resources";
import { Function, IFunctionClient, ITimerClient } from "../cloud";
import { Duration } from "../std";
import { ISimulatorContext } from "../testing/simulator";

export class Timer implements ITimerClient, ISimulatorResourceInstance {
  private pendingTimeouts = new Set<NodeJS.Timeout>();

  public constructor(
    props: TimerSchema["props"],
    private readonly context: ISimulatorContext
  ) {
    props;
  }

  public async init(): Promise<void> {}

  public async cleanup(): Promise<void> {
    // drain all pending timeouts
    const drain = (resolve: () => void) => {
      if (this.pendingTimeouts.size === 0) {
        resolve();
      } else {
        setImmediate(() => drain(resolve));
      }
    };

    return new Promise(drain);
  }

  public async setTimeout(
    after: Duration,
    callback: Function,
    payload?: string
  ): Promise<void> {
    await this.context.withTrace({
      message: `setting a timeout to expire in ${after.milliseconds}ms`,
      activity: async () => {
        const callbackClient = callback as unknown as IFunctionClient;
        const timeout = setTimeout(() => {
          this.pendingTimeouts.delete(timeout);
          callbackClient.invoke(payload ?? "").catch((err) => {
            throw err;
          });
        }, after.milliseconds);
        this.pendingTimeouts.add(timeout);
      },
    });
  }
}
