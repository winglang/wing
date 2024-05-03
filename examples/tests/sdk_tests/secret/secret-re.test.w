bring util;
bring aws;
bring expect;

if (util.env("WING_TARGET") == "tf-aws") {
  let someExistingSecretArn = "arn:aws:secretmanager:::someSecret";
  let secret = new aws.SecretRef(someExistingSecretArn);

  test "secretArn" {
    expect.equal(someExistingSecretArn, secret.secretArn);
  }
} 