import { simulator } from "@winglang/sdk";
import Emittery from "emittery";

import type { Trace } from "../types.js";

import { formatWingError } from "./format-wing-error.js";

export interface SimulatorEvents {
  starting: { instance: simulator.Simulator };
  started: undefined;
  error: Error;
  stopping: undefined;
  trace: Trace;
}

export interface Simulator {
  instance(statedir?: string): Promise<simulator.Simulator>;
  start(simfile: string): Promise<void>;
  stop(): Promise<void>;
  reload(): Promise<void>;
  on<T extends keyof SimulatorEvents>(
    event: T,
    listener: (event: SimulatorEvents[T]) => void | Promise<void>,
  ): void;
}

export interface CreateSimulatorProps {
  stateDir?: string;
}

const stopSilently = async (simulator: simulator.Simulator) => {
  try {
    await simulator.stop();
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("There is no running simulation to stop.")
    ) {
      return;
    } else {
      throw error;
    }
  }
};

export const createSimulator = (props?: CreateSimulatorProps): Simulator => {
  const events = new Emittery<SimulatorEvents>();
  let instance: simulator.Simulator | undefined;
  const handleExistingInstance = async (simfile: string): Promise<boolean> => {
    if (!instance) {
      return true;
    }
    await events.emit("starting", { instance });
    await instance.update(simfile);
    await events.emit("started");
    return false;
  };
  const start = async (simfile: string) => {
    try {
      const shouldStartSim = await handleExistingInstance(simfile);
      if (shouldStartSim) {
        instance = new simulator.Simulator({
          simfile,
          stateDir: props?.stateDir,
        });
        instance.onTrace({
          callback(trace) {
            events.emit("trace", trace);
          },
        });
        await events.emit("starting", { instance });
        await instance.start();
        await events.emit("started");
      }
    } catch (error) {
      await events.emit(
        "error",
        new Error(
          `Failed to start simulator.\n\n${await formatWingError(error)}`,
          {
            cause: error,
          },
        ),
      );
    }
  };

  const reload = async () => {
    if (instance) {
      await events.emit("starting", { instance });
      await instance.reload(true);
      await events.emit("started");
    } else {
      throw new Error("Simulator not started");
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
    async reload() {
      await reload();
    },
    on(event, listener) {
      events.on(event, listener);
    },
  };
};
