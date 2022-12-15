---
title: Deploying to AWS using Terraform
id: aws
---

So far we've tested our program locally using our Wing Console. Next we'll see how you can deploy your
program to AWS using Terraform.

## Wing compiler supports multiple targets

The Wing compiler supports multiple compilation targets. Each resource in the
Wing ecosystem can support any number of *backends*. For example, the
`cloud.Queue` resource we used in our app can be backed by [Amazon
SQS](https://aws.amazon.com/sqs/) by [Azure Queue
Storage](https://azure.microsoft.com/en-us/products/storage/queues/) or by
[RabbitMQ by CloudAMQP](https://www.cloudamqp.com/).

:::info Under Construction

:construction: We plan to support AWS, Azure and Google Cloud as targets out of
the box. In addition, we are planning support for other provisioning engines
such as AWS CloudFormation and Kubernetes.

Click :thumbsup: on the relevant issue and tell us what you think.

:::

## Compile to Terraform/AWS

We will use the `tf-aws` target to tell the compiler to bind all of our resources
to the default set of AWS resources and use Terraform as the provisioning engine.

```sh
wing compile --target tf-aws hello.w
```

## Examine the output

Our target directory now contains a `cdktf.out` directory which is the output of
[CDK for Terraform](https://developer.hashicorp.com/terraform/cdktf) used under
the hood to produce the Terraform configuration for this application.

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
cd ./target/cdktf.out/stacks/root
export AWS_REGION=us-east-1 # or any other region
terraform init
```

## Terraform deploy

Now we are ready to deploy to our AWS account:

```sh
terraform apply
```

You'll be asked to confirm the provisioning of all of these resources:

```
aws_iam_role.root_cloudQueue_OnMessagef9e5f4b154bf0692_IamRole_0F5B0FAB
aws_iam_role_policy.root_cloudQueue_OnMessagef9e5f4b154bf0692_IamRolePolicy_D4EB5385
aws_iam_role_policy_attachment.root_cloudQueue_OnMessagef9e5f4b154bf0692_IamRolePolicyAttachment_EEE67DAF
aws_lambda_event_source_mapping.root_cloudQueue_EventSourceMapping_A2041279
aws_lambda_function.root_cloudQueue_OnMessagef9e5f4b154bf0692_7D66EFB8
aws_s3_bucket.root_cloudBucket_4F3C4F53
aws_s3_bucket.root_cloudQueue_OnMessagef9e5f4b154bf0692_Bucket_22152053
aws_s3_bucket_public_access_block.root_cloudBucket_PublicAccessBlock_319C1C2E
aws_s3_bucket_server_side_encryption_configuration.root_cloudBucket_Encryption_8ED0CD9C
aws_s3_object.root_cloudQueue_OnMessagef9e5f4b154bf0692_S3Object_A34E0128
aws_sqs_queue.root_cloudQueue_E3597F7A
```

> This is a good opportunity to observe how much complexity the Wing compiler
> was able to abstract away for you when you wrote your Wing code. Just
> saying...

And Terraform will do its magic and will create all of these resources in your
account.

```
Apply complete! Resources: 8 added, 0 changed, 0 destroyed.
```

## Explore your app on AWS

After our application has been deployed to AWS, you should be able to interact with it
through the AWS Management Console.

1. Open the [Amazon SQS Console](https://console.aws.amazon.com/sqs)
2. Select your AWS region
3. You should be able to see that you have a queue there
4. Click **Send and receive messages**.
5. In the **Message Body** box type `cloud` and hit **Send message**.
6. Jump over to the [CloudWatch Console](https://console.aws.amazon.com/cloudwatch) 
7. Under **Log groups** you should see a log group called `/aws/lambda/...`. 
8. Click on it and you should see the log message `Hello, cloud!`.
