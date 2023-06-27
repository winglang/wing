/**
 * Available targets for compilation.
 * This is passed from Commander to the `compile` function.
 */
export enum Target {
  TF_AWS = "tf-aws",
  TF_AZURE = "tf-azure",
  TF_GCP = "tf-gcp",
  SIM = "sim",
  AWSCDK = "awscdk",
}
