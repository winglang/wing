---
title: Deploy to AWS
id: aws
keywords: [Wing deploy, Wing deployment, deploy to AWS, deploy using Terraform]
---

So far we've tested our program locally using our Wing Console. Next we'll see how you can deploy your
program to AWS using Terraform.

## Wing compiler supports multiple platforms

The Wing compiler supports multiple compilation platforms. Each resource in the
Wing ecosystem can support any number of *backends*. For example, the
`cloud.Queue` resource we used in our app can be backed by [Amazon
SQS](https://aws.amazon.com/sqs/) by [Azure Queue
Storage](https://azure.microsoft.com/en-us/products/storage/queues/) or by
[RabbitMQ by CloudAMQP](https://www.cloudamqp.com/).

A platform represents both the cloud provider and the provisioning engine. For
example, the `tf-aws` platform will compile your program to a set of AWS
resources, using Terraform as the provisioning engine.


:::info Under Construction

:construction: We plan to also support [Azure](https://github.com/winglang/wing/issues?q=is:issue+is:open+sort:updated-desc+label:azure) and [Google Cloud](https://github.com/winglang/wing/issues?q=is:issue+is:open+sort:updated-desc+label:gcp) as platforms out of
the box. In addition, we are planning support for other provisioning engines
such as AWS CloudFormation and Kubernetes.

Click :thumbsup: on the relevant issue and tell us what you think.

:::

## Prerequisites

In order to deploy to AWS, you will need:

* [Terraform](https://terraform.io/downloads)
* AWS CLI with configured credentials. See
[here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
for more information.

## Compile to Terraform/AWS

We will use the `tf-aws` platform to tell the compiler to bind all of our resources
to the default set of AWS resources and use Terraform as the provisioning engine.

```sh
wing compile --platform tf-aws main.w
```

## Examine the output

Our `target` directory now contains a `main.tfaws` directory which has all of the Terraform configuration for this application.

## Initialize Terraform state

Now, let's deploy our program to AWS.

:::tip Credentials Required

You will need to have AWS credentials configured on your system. See
[here](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-files.html)
for more information.

:::

Let's change the working directory to where our Terraform configuration is and
initialize the state file:

```sh
cd ./target/main.tfaws
export AWS_REGION=us-east-1 # or any other region
terraform init
```

## Terraform deploy

Now we are ready to deploy to our AWS account:

```sh
terraform apply
```

You should expect output similar to this: 
```sh
Terraform used the selected providers to generate the following execution
plan. Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # aws_dynamodb_table.cloudCounter will be created
  + resource "aws_dynamodb_table" "cloudCounter" {...}

  # aws_iam_role.cloudQueue-SetConsumer-cdafee6e_IamRole_2548D828 will be created
  + resource "aws_iam_role" "cloudQueue-SetConsumer-cdafee6e_IamRole_2548D828" {...}

  # aws_iam_role_policy.cloudQueue-SetConsumer-cdafee6e_IamRolePolicy_37133937 will be created
  + resource "aws_iam_role_policy" "cloudQueue-SetConsumer-cdafee6e_IamRolePolicy_37133937" {...}

  # aws_iam_role_policy_attachment.cloudQueue-SetConsumer-cdafee6e_IamRolePolicyAttachment_45079F65 will be created
  + resource "aws_iam_role_policy_attachment" "cloudQueue-SetConsumer-cdafee6e_IamRolePolicyAttachment_45079F65" {...}

  # aws_lambda_event_source_mapping.cloudQueue_EventSourceMapping_41814136 will be created
  + resource "aws_lambda_event_source_mapping" "cloudQueue_EventSourceMapping_41814136" {...}

  # aws_lambda_function.cloudQueue-SetConsumer-cdafee6e will be created
  + resource "aws_lambda_function" "cloudQueue-SetConsumer-cdafee6e" {...}

  # aws_s3_bucket.Code will be created
  + resource "aws_s3_bucket" "Code" {...}

  # aws_s3_bucket.cloudBucket will be created
  + resource "aws_s3_bucket" "cloudBucket" {...}

  # aws_s3_bucket_public_access_block.cloudBucket_PublicAccessBlock_5946CCE8 will be created
  + resource "aws_s3_bucket_public_access_block" "cloudBucket_PublicAccessBlock_5946CCE8" {...}

  # aws_s3_bucket_server_side_encryption_configuration.cloudBucket_Encryption_77B6AEEF will be created
  + resource "aws_s3_bucket_server_side_encryption_configuration" "cloudBucket_Encryption_77B6AEEF" {...}

  # aws_s3_object.cloudQueue-SetConsumer-cdafee6e_S3Object_8868B9FB will be created
  + resource "aws_s3_object" "cloudQueue-SetConsumer-cdafee6e_S3Object_8868B9FB" {...}

  # aws_sqs_queue.cloudQueue will be created
  + resource "aws_sqs_queue" "cloudQueue" {...}

Plan: 12 to add, 0 to change, 0 to destroy.
```

> This is a good opportunity to observe how much complexity the Wing compiler
> was able to abstract away for you when you wrote your Wing code. Just
> saying...

If you choose to proceed, Terraform will do its magic and will create all of these resources in your
account.

```  
Apply complete! Resources: 12 added, 0 changed, 0 destroyed.
```

## Explore your app on AWS

After our application has been deployed to AWS, you should be able to interact with it
through the AWS Management Console.

1. Open the [Amazon SQS Console](https://console.aws.amazon.com/sqs)
2. Select your AWS region
3. You should be able to see that you have a queue there prefixed with `cloud-Queue-`
4. Click **Send and receive messages**.
5. In the **Message Body** box type `cloud` and hit **Send message**.
6. Jump over to the [S3 Console](https://s3.console.aws.amazon.com/s3/buckets) 
7. There should be some buckets prefixed with `cloud-bucket-`. 
8. Cycle through the buckets until you find one that contains `wing-1.txt`.
9. Click `wing-1.txt` then click the `Open` button.
10. The file should contain `Hello, cloud`.

### Exploring the counter on AWS
1. Open the [Amazon Dynamo DB Console](https://console.aws.amazon.com/dynamodb), and search for a table prefixed with `wing-counter-cloud`.
2. Use the `Explore table items` button to view the value of the `counter` id attribute, which represents the current value of the counter.
3. Optional - repeat step 5 from the above list as many times as you want. While doing it, see how the bucket fills and how the `counter` id increments.


## Cleanup

Terraform doesn't allow destroying a non-empty bucket by default. To prepare for
easy cleanup, you may delete the newly created file(s) by marking the checkbox next
to the bucket name on the S3 console, clicking the `Empty` button, typing `permanently delete` in the
confirmation box and clicking the `Empty` button.

Once you're done, you can destroy all of the resources that were created on your AWS account by running:

```sh
terraform destroy

{...}

Destroy complete! Resources: 12 destroyed.
```
