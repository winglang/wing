import { Simulator, SimulatorProps } from "@winglang/wingsdk/lib/testing";

export interface CreateSimulatorProps {
  simulator: SimulatorProps;
  onError?: (error: unknown) => void;
}

// Creates a helper around the simulator that only returns the simulator instance
// when it's ready. The simulator is not ready to be used if it's starting,
// stopping or reloading.
export function createSimulator(props: CreateSimulatorProps) {
  const reportPromise = <T>(callback: () => Promise<T>) => {
    return async () => {
      try {
        return await callback();
      } catch (error) {
        props.onError?.(error);
        throw error;
      }
    };
  };

  const simulator = new Simulator(props.simulator);
  let currentProcess: Promise<void> | undefined;
  const start = reportPromise(async () => {
    await currentProcess;
    currentProcess = simulator.start();
    await currentProcess;
    return simulator;
  });
  const stop = reportPromise(async () => {
    await currentProcess;
    currentProcess = simulator.stop();
    await currentProcess;
    return simulator;
  });
  const reload = reportPromise(async () => {
    await currentProcess;
    currentProcess = simulator.reload();
    await currentProcess;
    return simulator;
  });
  const get = reportPromise(async () => {
    await currentProcess;
    return simulator;
  });

  void start();

  return {
    start,
    stop,
    reload,
    get,
  };
}
