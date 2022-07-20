import { s3 } from "@cdktf/provider-aws";
import { Construct } from "constructs";
import { Binding, ICapturable, ICaptureSource } from "../core";

export class Bucket extends Construct implements ICapturable {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new s3.S3Bucket(this, "Default");
  }

  public capture(_symbol: string, _binding: Binding): ICaptureSource {
    throw new Error("Method not implemented.");
  }
}
