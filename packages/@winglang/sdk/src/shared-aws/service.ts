import { resolve } from "path";

export function createServiceDockerfile(assetName: string) {
  return `FROM --platform=linux/amd64 node:20-slim
WORKDIR /app
COPY ./${assetName}_wrapper.js.bundle .
CMD [ "node", "index.cjs" ]`;
}

export function createServiceWrapper(entrypoint: string) {
  return `
const service = require("${resolve(entrypoint)}");
let isShuttingDown = false;

const startService = async () => {
while (!isShuttingDown) {
  // Check if shutting down at each iteration or task
  await service.start();
}
};

const handleShutdown = async () => {
console.log("Received shutdown signal, stopping service...");
isShuttingDown = true; // Signal to stop infinite loop
await service.stop();
process.exit(0);
};

process.on('SIGTERM', handleShutdown);
process.on('SIGINT', handleShutdown);

(async () => {
try {
  await startService();
} catch (error) {
  console.error("Error during service operation:", error);
  process.exit(1);
}
})();
`;
}
