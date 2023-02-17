import { Construct } from "constructs";
import * as cdk from "aws-cdk-lib";
import { IApp, AppProps } from "./app";
import { join } from "path";
import { mkdirSync, writeFileSync } from "fs";
import { Polycons } from "polycons";
// import { Logger } from "../cloud";

const CDK_STACK_NAME = "root";

/**
 * An app that knows how to synthesize constructs into CDK configuration.
 */
export class CdkApp extends Construct implements IApp {
  /**
   * Directory where artifacts are synthesized to.
   */
  public readonly outdir: string;

  private readonly cdkApp: cdk.App;
  // private readonly cdkStack: cdk.Stack;

  constructor(props: AppProps) {
    const outdir = props.outdir ?? ".";
    const cdkOutdir = join(outdir, "./cdk.out");

    mkdirSync(cdkOutdir, { recursive: true });

    const cdkApp = new cdk.App({ outdir: cdkOutdir });
    const cdkStack = new cdk.Stack(cdkApp, CDK_STACK_NAME);

    if (!props.customFactory) {
      throw new Error(
        "A custom factory must be passed to the base CdkApp class."
      );
    }
    Polycons.register(cdkStack, props.customFactory);

    super(cdkStack, "Default");

    this.outdir = outdir;
    this.cdkApp = cdkApp;
    // this.cdkStack = cdkStack;

    // register a logger for this app.
    // Logger.register(this);
  }

  synth(): string {
    // synthesize cdk.Stack files in `outdir/cdk.out`
    this.cdkApp.synth();
    this.synthPackageJson();
    this.synthDeploymentCode();

    return "";
  }

  synthDeploymentCode(): void {

    const code = [
      "const { intro, outro, spinner, text } = require(\"@clack/prompts\");",
      "const { execSync } = require(\"child_process\");",
      "const color = require(\"picocolors\");",
      "",
      "async function main() {",
      "  intro(`${color.bgCyan(color.black(\" CDK App \"))}`);",
      "",
      "  const appName = await text({",
      "    message: \"Choose the stack name\",",
      "  });",
      "",
      "  const s = spinner();",
      "  s.start(\"Upload assets\");",
      "  execSync('./node_modules/cdk-assets/bin/cdk-assets -p ./cdk.out/root.assets.json publish', { stdio: 'pipe' });",
      "  s.stop(\"Finish upload assets\");",
      "",
      "  s.start(\"Deploying stack\");",
      "  execSync(`aws cloudformation deploy --template-file cdk.out/root.template.json --capabilities CAPABILITY_NAMED_IAM --stack-name ${appName}`);",
      "  s.stop(\"Stack deployed\");",
      "",
      "  outro(`You're all set!`);",
      "}",
      "",
      "main().catch(console.error);",
    ];

    writeFileSync(this.outdir.concat("/index.js"), code.join("\n"), "utf8");
  }

  synthPackageJson(): void {
    const packageJson = JSON.stringify(
      {
        "name": "target",
        "version": "1.0.0",
        "description": "",
        "main": "index.js",
        "scripts": {
          "deploy": "node index.js"
        },
        "keywords": [],
        "author": "",
        "license": "ISC",
        "dependencies": {
          "@clack/prompts": "^0.4.3",
          "cdk-assets": "^2.64.0",
          "child_process": "^1.0.2",
          "picocolors": "^1.0.0"
        }
      }, undefined, 2);

    writeFileSync(this.outdir.concat("/package.json"), packageJson, "utf8");
  }
}