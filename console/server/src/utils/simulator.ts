import { testing, cloud } from "@winglang/sdk";
import Emittery from "emittery";

export interface SimulatorEvents {
  starting: { instance: testing.Simulator };
  started: undefined;
  error: Error;
  stopping: undefined;
  trace: cloud.Trace;
}

export interface Simulator {
  instance(): Promise<testing.Simulator>;
  start(simfile: string): Promise<void>;
  stop(): Promise<void>;
  on<T extends keyof SimulatorEvents>(
    event: T,
    listener: (event: SimulatorEvents[T]) => void | Promise<void>,
  ): void;
}

const stopSilently = async (simulator: testing.Simulator) => {
  try {
    await simulator.stop();
  } catch (error) {
    console.error("ignore this error:", error);
  }
};

export const createSimulator = (): Simulator => {
  const events = new Emittery<SimulatorEvents>();
  let instance: testing.Simulator | undefined;
  const start = async (simfile: string) => {
    try {
      if (instance) {
        await events.emit("stopping");
        await stopSilently(instance);
      }

      instance = new testing.Simulator({ simfile });
      instance.onTrace({
        callback(trace) {
          events.emit("trace", trace);
        },
      });

      await events.emit("starting", { instance });

      await instance.start();
      await events.emit("started");
    } catch (error) {
      await events.emit(
        "error",
        new Error(`Failed to start simulator.\n\n${error}`, { cause: error }),
      );
    }
  };

  return {
    async instance() {
      return (
        instance ?? events.once("starting").then(({ instance }) => instance)
      );
    },
    async start(simfile: string) {
      await start(simfile);
    },
    async stop() {
      await instance?.stop();
    },
    on(event, listener) {
      events.on(event, listener);
    },
  };
};
