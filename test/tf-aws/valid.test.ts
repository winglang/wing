import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as core from "../../src/core";
import * as tfaws from "../../src/tf-aws";
import { mkdtemp } from "../util";

// these tests are more expensive / time consuming to run
// because they run `terraform validate` under the hood

test("sample app is valid terraform", () => {
  const app = new core.App({
    synthesizer: new tfaws.Synthesizer({ outdir: mkdtemp() }),
  });
  new cloud.Bucket(app.root, "Bucket");

  expect(cdktf.Testing.toBeValidTerraform(tfSynth(app))).toBe(true);
});

function tfSynth(app: core.App) {
  return cdktf.Testing.fullSynth(app.root as cdktf.TerraformStack);
}
