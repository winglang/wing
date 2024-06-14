// This file was auto generated from an example found in: secret.md_example_2
// Example metadata: {"valid":true}
bring cloud;

let secret = new cloud.Secret(
  name: "my-api-key",
);

new cloud.Function(inflight () => {
  let secretValue = secret.value(); // retrieve the secret as a `str` value
  let secretValueAsJson = secret.valueJson(); // retrieve the secret as a `Json` value
});
