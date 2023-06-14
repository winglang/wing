import {
  spawnSync,
  type SpawnSyncOptionsWithBufferEncoding,
} from "node:child_process";

export const spawn = (
  command: string,
  arguments_: string[],
  options?: SpawnSyncOptionsWithBufferEncoding,
) => {
  const result = spawnSync(command, arguments_, {
    ...options,
    stdio: "inherit",
  });

  const { status } = result;

  if (status && status !== 0) {
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(status);
  }

  return result;
};
