import { Polycons } from "@monadahq/polycons";
import * as cdktf from "cdktf";
import * as cloud from "../../src/cloud";
import * as tfaws from "../../src/tf-aws";

test("it synthesizes a bucket", () => {
  const output = cdktf.Testing.synthScope((scope) => {
    const factory = new tfaws.PolyconFactory();
    Polycons.register(scope, factory);

    new cloud.Bucket(scope, "Bucket");
  });

  expect(cdktf.Testing.toHaveResource(output, "aws_s3_bucket")).toEqual(true);
});
