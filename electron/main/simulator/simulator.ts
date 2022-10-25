import { testing } from "@monadahq/wingsdk";

export const createSimulator = async (appPath: string) => {
  const simulator = new testing.Simulator({
    appPath,
  });
  await simulator.start();
  return simulator;
};
