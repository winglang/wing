import packageJson from "@winglang/compiler/package.json" assert { type: "json" };

const version = packageJson.version;

export const getWingVersion = async (): Promise<string> => {
  return version;
};
