/**
 * Plugin: tf-s3-backend
 * 
 * Description: 
 * Allow dev to specify the use of a s3 backend for Terraform state file. Replaces 
 * default local state. Compatible with any Terraform based target.
 * 
 * Required Env Variables:
 * TF_BACKEND_BUCKET - The name of the s3 bucket to use for storing Terraform state
 * TF_BACKEND_BUCKET_REGION - The region the bucket was deployed to
 * 
 * Optional Env Variables:
 * STATE_FILE - The object key used to store state file (default: wing-tf.tfstate)
 */

// compatibleTargets not currently used see: https://github.com/winglang/wing/issues/1474
exports.compatibleTargets = ["tf-aws", "tf-azure", "tf-gcp"]

exports.postSynth = function(config) {
  if (!process.env.TF_BACKEND_BUCKET) {throw new Error("env var TF_BACKEND_BUCKET not set")}
  if (!process.env.TF_BACKEND_BUCKET_REGION) {throw new Error("env var TF_BACKEND_BUCKET_REGION not set")}
  config.terraform.backend = {
    s3: {
      bucket: process.env.TF_BACKEND_BUCKET,
      region: process.env.TF_BACKEND_BUCKET_REGION,
      key: process.env.STATE_FILE ?? "wing-tf.tfstate",
    }  
  }
  return config;
}