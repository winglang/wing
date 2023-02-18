exports.postSynth = function(config) {
  if (!process.env.TF_BACKEND_BUCKET) {throw new Error("env var TERRAFORM_BACKEND_BUCKET not set")}
  config.terraform.backend = {
    s3: {
      bucket: process.env.TF_BACKEND_BUCKET,
      key: process.env.STATE_FILE ?? "wing-tf.tfstate",
      region: process.env.AWS_REGION ?? "us-east-1",
    }  
  }
  return config;
}