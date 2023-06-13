import packageJson from "../../package.json" assert { type: "json" };

const version = packageJson.dependencies["@winglang/compiler"].slice(1);

export const getWingVersion = async (): Promise<string> => {
  console.log({ version });
  return version;
};
