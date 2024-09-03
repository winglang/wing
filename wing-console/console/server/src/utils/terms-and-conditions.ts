import * as fs from "node:fs";

import envPaths from "env-paths";

// @ts-ignore-next-line
import License from "../../LICENSE.md?raw";

const PROJECT_NAME = "@wingconsole/server";
const CONFIG_KEY = "termsAndConditions";

const paths = envPaths(PROJECT_NAME);

const configFilename = `${paths.config}/config.json`;

const getConfig = () => {
  if (!fs.existsSync(configFilename)) {
    return;
  }

  try {
    return JSON.stringify(
      fs.readFileSync(configFilename, "utf8"),
    ) as unknown as Record<string, any>;
  } catch (error) {
    console.error(error);
  }
};

const saveConfig = (config: Record<string, any>) => {
  try {
    fs.mkdirSync(paths.config, { recursive: true });
    fs.writeFileSync(configFilename, JSON.stringify(config, undefined, 2));
  } catch (error) {
    console.error(error);
  }
};

export const isTermsAccepted = (): boolean => {
  const config = getConfig();

  const accepted = config?.[CONFIG_KEY];
  return accepted === true;
};

export const acceptTerms = (value: boolean) => {
  const config = getConfig();

  saveConfig({
    ...config,
    [CONFIG_KEY]: value,
  });
};

export const getLicense = (): string => {
  return License;
};
