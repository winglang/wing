/**
 * Available builtin platforms for compilation.
 * This is passed from Commander to the `compile` function.
 */
export const BuiltinPlatform = {
  TF_AWS: "tf-aws",
  TF_AZURE: "tf-azure",
  TF_GCP: "tf-gcp",
  SIM: "sim",
  AWSCDK: "awscdk",
}
