import chalk from "chalk";
import { loadAnalyticsConfig, saveAnalyticsConfig } from "./storage";

const disclaimer = `
🧪 This is an early pre-release of the Wing Programming Language.
  
We are working hard to make this a great tool, but there's still a pretty good
chance you'll encounter missing pieces, rough edges, performance issues and even,
god forbid, bugs 🐞.

Please don't hesitate to ping us at ${chalk.blueBright.bold.underline(
      "https://t.winglang.io/slack"
    )} or file an issue at
${chalk.blueBright.bold.underline(
  "https://github.com/winglang/wing"
)}. We promise to do our best to respond quickly and help out.

To help us identify issues early, we are collecting anonymous analytics.
To turn this off, set ${chalk.yellowBright.bold("WING_DISABLE_ANALYTICS=1")}.
For more information see ${chalk.blueBright.bold.underline("https://winglang.io/docs/analytics")}
${chalk.redBright("(This message will self-destruct after the first run)")}
`;

function displayDisclaimer() {
  console.log(`${chalk.hex("#2AD5C1")(disclaimer)}`);
}

export function optionallyDisplayDisclaimer() {
  try {
    const analyticsConfig = loadAnalyticsConfig();
    if (!analyticsConfig.disclaimerDisplayed) {
      displayDisclaimer();
      analyticsConfig.disclaimerDisplayed = true;
      saveAnalyticsConfig(analyticsConfig);
    }
  } catch (error) {
    // Incase there was any reason the config could not be loaded, 
    // just display to be super transparent :)
    displayDisclaimer();
  }
}