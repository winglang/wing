import { join } from "path";
import { Construct } from "constructs";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as sim from "../../src/target-sim";
import * as tfaws from "../../src/target-tf-aws";
import * as tfazure from "../../src/target-tf-azure";
import * as testing from "../../src/testing";

// TODO: support multiple sandboxes
class HelloWorld extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const bucket = new cloud.Bucket(this, "Bucket");
    bucket.addObject("hello.txt", "Hello, world!");
  }
}

const app = new tfaws.App({ outdir: __dirname });
new HelloWorld(app, "HelloWorld");
app.synth();
