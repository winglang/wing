bring aws;
bring expect;

if @target == "tf-aws" {
  let someExistingSecretArn = "arn:aws:secretsmanager:::secret:mysecret";
  let secret = new aws.SecretRef(someExistingSecretArn);

  test "secretArn" {
    expect.equal(someExistingSecretArn, secret.secretArn);
  }
} 
