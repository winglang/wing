import chalk from "chalk";
import { AnalyticsConfig, AnalyticsStorage } from "./storage";

// simplest way I could think of to allow us to update the disclaimer
// and force it to be displayed again
export const WING_DISCLAIMER_VERSION = "1";

export const WING_DISCLAIMER = `
🧪 This is an early pre-release of the Wing Programming Language.
  
We are working hard to make this a great tool, but there's still a pretty good
chance you'll encounter missing pieces, rough edges, performance issues and even,
god forbid, bugs 🐞.

Please don't hesitate to ping us at ${chalk.blueBright.bold.underline(
  "https://t.winglang.io/slack",
)} or file an issue at
${chalk.blueBright.bold.underline(
  "https://github.com/winglang/wing",
)}. We promise to do our best to respond quickly and help out.

To help us identify issues early, we are collecting anonymous analytics.
To turn this off, set ${chalk.yellowBright.bold("WING_DISABLE_ANALYTICS=1")}.
For more information see ${chalk.blueBright.bold.underline("https://winglang.io/docs/analytics")}
${chalk.redBright("(This message will self-destruct after the first run)")}
`;

function displayDisclaimer() {
  console.log(`${chalk.hex("#2AD5C1")(WING_DISCLAIMER)}`);
}

export function shouldDisplayDisclaimer(config: AnalyticsConfig): boolean {
  // only consider display if stdin is a TTY
  if (!process.stdin.isTTY) {
    return false;
  }

  // If never displayed, display
  if (!config.disclaimerDisplayed) {
    return true;
  }

  // If disclaimer version has changed, display
  if ((config.disclaimerVersion ?? "") !== WING_DISCLAIMER_VERSION) {
    return true;
  }

  return !(config.disclaimerDisplayed && config.disclaimerVersion === WING_DISCLAIMER_VERSION);
}

export function optionallyDisplayDisclaimer(existingStorage?: AnalyticsStorage) {
  try {
    const storage = existingStorage ?? new AnalyticsStorage();
    const analyticsConfig = storage.loadConfig();
    if (shouldDisplayDisclaimer(analyticsConfig)) {
      displayDisclaimer();
      analyticsConfig.disclaimerDisplayed = true;
      analyticsConfig.disclaimerVersion = WING_DISCLAIMER_VERSION;
      storage.saveConfig(analyticsConfig);
    }
  } catch (error) {
    // Incase there was any reason the config could not be loaded,
    // just display to be super transparent :)
    displayDisclaimer();
  }
}
