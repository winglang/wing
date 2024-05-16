bring cloud;
bring aws;

class Host impl aws.IAwsInflightHost {
  pub addPolicyStatements(...policies: Array<aws.PolicyStatement>) {
    log("addPolicy {Json.stringify(policies)}");
  }

  pub addNetwork(config: aws.NetworkConfig) {
    log("addNetwork");
  }

  pub addEnvironment(key: str, value: str) {
    log("addEnvironment {key}={value}");
  }
}

let b = new cloud.Bucket();

let host = new Host();
b.onLift(host, ["put"]);