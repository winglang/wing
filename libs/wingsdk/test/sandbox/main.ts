import { join } from "path";
import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import * as tfaws from "../../src/target-tf-aws";
import * as tfazure from "../../src/target-tf-azure";
import * as tfgcp from "../../src/target-tf-gcp";
import * as testing from "../../src/testing";

// TODO: support multiple sandboxes
class HelloWorld extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new cloud.Bucket(this, "Bucket", { public: false });
    bucket.addObject("test.txt", "yoyoyo");
  }
}

const app = new tfgcp.App({
  outdir: join(__dirname, "target"),
  projectId: "my-project",
  storageLocation: "US",
});
new HelloWorld(app, "HelloWorld");
app.synth();
