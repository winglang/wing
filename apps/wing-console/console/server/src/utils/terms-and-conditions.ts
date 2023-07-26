import * as fs from "node:fs";

// @ts-ignore-next-line
import Conf from "conf";

const PROJECT_NAME = "@wingconsole/server";
const CONFIG_KEY = "termsAndConditions";

export const isTermsAccepted = (): boolean => {
  const config = new Conf({
    projectName: PROJECT_NAME,
  });

  const accepted = config.get(CONFIG_KEY) as boolean;
  return accepted === true;
};

export const acceptTerms = (value: boolean) => {
  const config = new Conf({
    projectName: PROJECT_NAME,
  });

  config.set(CONFIG_KEY, value);
};

export const getLicense = (): string => {
  return fs.readFileSync(
    new URL(process.env.LICENSE_FILE ?? "../../LICENSE.md", import.meta.url)
      .pathname,
    "utf8",
  );
};
