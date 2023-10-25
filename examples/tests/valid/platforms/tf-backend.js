/**
 * Plugin: tf-backend
 * 
 * Description: 
 * Allow dev to specify the use of a alternate backends for Terraform state file. Replaces 
 * default local state. Compatible with any Terraform based target. For more on terraform 
 * backend configurations see: https://developer.hashicorp.com/terraform/language/settings/backends
 * 
 * Available Backends:
 * - s3
 * - azurerm
 * - gcs
 * 
 * Required Env Variables:
 * - TF_BACKEND - The name of the backend to use [s3, azurerm, gcs]
 * 
 * Backend Specific Env Variables:
 * - S3:
 *    - TF_BACKEND_BUCKET - The name of the s3 bucket to use for storing Terraform state
 *    - TF_BACKEND_BUCKET_REGION - The region the bucket was deployed to
 * - azurerm:
 *    - TF_BACKEND_STORAGE_ACCOUNT_NAME - The name of the storage account to use for storing Terraform state
 *    - TF_BACKEND_RESOURCE_GROUP_NAME - The name of the resource group the storage account is deployed to
 *    - TF_BACKEND_CONTAINER_NAME - The name of the container to use for storing Terraform state
 * - gcs:
 *    - TF_BACKEND_BUCKET - The name of the gcs bucket to use for storing Terraform state
 * 
 * Optional Env Variables:
 * STATE_FILE - The object key used to store state file (default: wing-tf.tfstate)
 */

exports.Platform = class TFBackend {
  model = "tf-*";
  postSynth(config) {
    if (!process.env.TF_BACKEND) {throw new Error("env var TF_BACKEND not set")}
  
    switch (process.env.TF_BACKEND) {
      case "s3":
        return configureS3Backend(config);
      case "azurerm":
        return configureAzurermBackend(config);
      case "gcs":
        return configureGcsBackend(config);
      default:
        throw new Error(`Invalid value for TF_BACKEND: ${process.env.TF_BACKEND} (valid values: s3, azurerm, gcs)`)
    }
  }
}

function configureS3Backend(config) {
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

function configureAzurermBackend(config) {
  if (!process.env.TF_BACKEND_STORAGE_ACCOUNT_NAME) {throw new Error("env var TF_BACKEND_STORAGE_ACCOUNT_NAME not set")}
  if (!process.env.TF_BACKEND_RESOURCE_GROUP_NAME) {throw new Error("env var TF_BACKEND_RESOURCE_GROUP_NAME not set")}
  if (!process.env.TF_BACKEND_CONTAINER_NAME) {throw new Error("env var TF_BACKEND_CONTAINER_NAME not set")}
  config.terraform.backend = {
    azurerm: {
      storage_account_name: process.env.TF_BACKEND_STORAGE_ACCOUNT_NAME,
      container_name: process.env.TF_BACKEND_CONTAINER_NAME,
      key: process.env.STATE_FILE ?? "wing-tf.tfstate",
      resource_group_name: process.env.TF_BACKEND_RESOURCE_GROUP_NAME,
    }  
  }
  return config;
}

function configureGcsBackend(config) {
  if (!process.env.TF_BACKEND_BUCKET) {throw new Error("env var TF_BACKEND_BUCKET not set")}
  config.terraform.backend = {
    gcs: {
      bucket: process.env.TF_BACKEND_BUCKET,
      prefix: process.env.STATE_FILE ?? "wing-tf.tfstate",
    }  
  }
  return config;
}