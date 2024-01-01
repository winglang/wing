---
title: Terraform Backends
id: terraform-backends
keywords: [CICD, Terraform, Backends, S3, Local, Wing]
---

# Terraform Local State

When you run Terraform for the first time, it creates a file known as the `terraform.tfstate`. This is a JSON format file that records mapping between your resources in the configuration files and the real resources in the infrastructure provider. By default, Terraform uses a [local backend](https://developer.hashicorp.com/terraform/language/settings/backends/local) which stores state files on your local filesystem. This is known as the "local" state.

The local state works perfectly for small scale, individual, or testing projects where there's no need for collaboration or sharing of state data. It is simple and doesn't require any additional setup or configuration to use. However, it lacks many features required for team-based work or production-level infrastructure.

The local state is stored unencrypted on your local filesystem and is not versioned, meaning you could lose or overwrite your state file without any way to recover it. Also, it doesn't support state locking, so concurrent runs could potentially corrupt your state file. These shortcomings could lead to inconsistencies between your real infrastructure and your Terraform configuration, leading to potential infrastructure drift.

The local state backend is a great way to get started with Terraform, but for production workloads, especially where team collaboration is required, a remote backend like S3 is generally a better option. This is why we will be focusing on setting up a Terraform [S3 backend](https://developer.hashicorp.com/terraform/language/settings/backends/s3) in the next section of this document.

# Transitioning to an S3 Backend

The default local state storage is useful for getting started with Terraform, but as your infrastructure grows, or if you need to collaborate with a team, the local backend becomes less suitable. To handle such situations, Terraform supports [multiple backend types](https://developer.hashicorp.com/terraform/language/settings/backends/configuration), one of which is Amazon S3.

Storing your Terraform state file on an S3 backend allows your team to share access to the state and collaborate efficiently, maintaining a consistent view of the infrastructure. It also enables state versioning, preserving, retrieving, and restoring every version of your state file. This versioning feature of S3 provides a means to roll back to a previous state if necessary.

In addition, an S3 backend offers state locking via a DynamoDB table, preventing concurrent modifications of the state that could lead to conflicts and potential data loss. S3's high durability and availability ensure that your state data is resilient, safe, and accessible whenever you need it. Furthermore, by using Amazon S3, you can leverage server-side encryption to secure your state data, providing an additional layer of security.

In the following sections, we will guide you through the process of setting up an S3 backend for your Terraform configurations, empowering you to handle larger, more complex, and collaborative infrastructure projects.

# Setting up an S3 Terraform Backend

## Prerequisites

- AWS Account
- AWS CLI configured
- Terraform installed

## Step 1: Create the S3 Bucket

Firstly, we need to create the S3 bucket that will store our Terraform state file. You can do this using the AWS Management Console, AWS CLI, or even with Terraform or Wing itself. For simplicity, let's use the AWS CLI:

```sh
aws s3api create-bucket --bucket <bucket-name> --region <region> --create-bucket-configuration LocationConstraint=<region>
```

This could be looking like the following when replacing the placeholder `<bucket-name>` and `<region>`

```sh
aws s3api create-bucket --bucket my-tfstate-bucket-with-a-uniue-name --region us-east-2 --create-bucket-configuration LocationConstraint=us-east-2
```

(If you are using us-east-1, you must omit the `--create-bucket-configuration` flag since it is the default region.)

## Step 2: Enable Versioning

To take advantage of the S3 backend's versioning capabilities, we must enable versioning on our bucket. Versioning allows us to preserve, retrieve, and restore every version of every object in our bucket. This will be particularly beneficial when dealing with Terraform's state file as it allows us to roll back to a previous state if needed.

```sh
aws s3api put-bucket-versioning --bucket <bucket-name> --versioning-configuration Status=Enabled
```

The code provided will enable versioning for the bucket, thus allowing you to keep track of and manage different versions of your Terraform state file.

## Step 3: Create a DynamoDB Table

We need a DynamoDB table for state locking and consistency. The DynamoDB table requires a single attribute, `LockID`, to function.

DynamoDB supports two read/write capacity modes for processing reads and writes on your tables: provisioned and on-demand. For this walkthrough, we will use the on-demand mode, which provides flexible billing and doesn't require capacity planning.

```sh
aws dynamodb create-table --table-name <table-name> --attribute-definitions AttributeName=LockID,AttributeType=S --key-schema AttributeName=LockID,KeyType=HASH --billing-mode PAY_PER_REQUEST
```

This revised command creates a DynamoDB table with the On-Demand capacity mode, eliminating the need for capacity planning and managing throughput.

## Step 4: Configure Terraform Backend with a Wing Plugin

Winglang provides the functionality of a `postSynth` plugin which can be leveraged to modify the Terraform configuration during the compilation phase. In our scenario, we will utilize this feature to configure the S3 backend for Terraform. This facilitates the separation of concerns by allowing us to develop the Wing application independently from its deployment logistics.

Now, utilize the Winglang static plugin for injecting the S3 backend configuration during the compilation phase:

```javascript
// plugin.static-backend.js

exports.Platform = class TFBackend {
  postSynth(config) {
    config.terraform.backend = {
      s3: {
        bucket: "<bucket-name>",
        region: "<region>",
        key: "path/to/my/key/terraform.tfstate",
        dynamodb_table: "<table-name>"
      }
    }
    return config;
  }
}
```

Replace `<bucket-name>`, `<region>`, `path/to/my/key/terraform.tfstate` and `<table-name>` with your specific S3 bucket name, bucket region, key and table respectively.


```bash
wing compile -t tf-aws --plugins=plugin.static-backend.js main.w
```

You can find a more detailed example [here](https://github.com/winglang/examples/tree/main/examples/s3-backend).

## Step 5: Initialize Backend

After configuring the backend with the Wing plugin, the final step is to initialize it. When using the static plugin, we can change the directory to the synthesized application, e.g. `cd target/main.tfaws` and run

:::info

This command will require valid AWS credentials with the correct [permissions](https://developer.hashicorp.com/terraform/language/settings/backends/s3#s3-bucket-permissions) to access the specified S3 Bucket and DynamoDB Table.

:::

```sh
terraform init
```

This command initializes your Terraform workspace by installing the necessary Terraform provider and plugins. During this process, it will also set up the S3 backend with the parameters provided by the Wing plugin and output a confirmation that the backend was successfully initialized.

## Summary

Congratulations! You have successfully set up an S3 backend for Terraform. You are now able to store your state file in a highly durable and available environment, collaborate efficiently with your team, and track different versions of your state. Enjoy the enhanced capabilities and flexibility this setup provides for managing your infrastructure.
