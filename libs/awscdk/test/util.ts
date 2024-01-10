import { Template } from "aws-cdk-lib/assertions";
import * as awscdk from "../src";
import path from "path";
import { PlatformManager } from "@winglang/sdk/lib/platform";

export function createApp(props: awscdk.CdkAppProps): awscdk.App {
  const platformManager = new PlatformManager({ platformPaths: [path.join(__dirname, "..", "lib")] });
  return new awscdk.App({_platformManager: platformManager, ...props})
}

/**
 * Sanitize the text of a code bundle to remove path references that are system-specific.
 */
export function sanitizeCode(code: string): string {
  function removeAbsolutePaths(text: string) {
    const regex = /"[^"]+?\/libs\/awscdk\/(.+?)"/g;

    // replace first group with static text
    return text.replace(regex, '"[REDACTED]/awscdk/$1"');
  }

  return removeAbsolutePaths(code);
}

export function awscdkSanitize(template: Template): any {
  let json = template.toJSON();

  let jsonString = JSON.stringify(json, (key, value) => {
    if (key === "S3Key" && value.endsWith(".zip")) {
      return "<S3Key>";
    }

    return value;
  });

  jsonString = jsonString.replace(
    /CurrentVersion.+?"/g,
    'CurrentVersion<GUID>"'
  );

  return JSON.parse(jsonString);
}