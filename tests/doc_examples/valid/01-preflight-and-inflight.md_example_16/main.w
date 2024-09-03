// This file was auto generated from an example found in: 01-preflight-and-inflight.md_example_16
// Example metadata: {"valid":true}
bring aws;

pub class Model {
  modelId: str;
  new(modelId: str) {
    this.modelId = modelId;
  }

  pub inflight invoke(body: Json): Json {
    // call the AWS SDK to invoke the model...
    return "success";
  }

  pub inflight printModelId() {
    log("Model ID: {this.modelId}");
  }

  pub onLift(host: std.IInflightHost, ops: Array<str>) {
    if ops.contains("invoke") {
      if let lambda = aws.Function.from(host) {
        lambda.addPolicyStatements({
          actions: ["bedrock:InvokeModel"],
          effect: aws.Effect.ALLOW,
          resources: [
            "arn:aws:bedrock:*::foundation-model/{this.modelId}"
          ],
        });
      } else {
        throw "Unsupported inflight host type";
      }
    } else {
      // no requirements for other operations
    }
  }
}
