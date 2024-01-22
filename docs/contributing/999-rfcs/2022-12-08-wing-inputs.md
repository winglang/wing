---
title: "#2726 Wing Inputs"
description: "How to create, share, manage inputs"
---

# Wing Inputs
- **Author(s)**: @Hasanaburayyan
- **Submission Date**: {2023-12-08}
- **Stage**: Draft

## Background

An input is a value used by either an application or platform that is not necessarily defined within the application's source code.

Inputs can be Platform agnostic, such as an a retry count that is dictated by business requirements. Other inputs may be Platform specific, like a DNS configurations.

### Context

There are a few things that are considered out-of-scope for this RFC. 
- Inputs are all treated as string data, but helper methods can convert them to primitive Wing types like num, bool, and Json
- Inputs cannot be created, or updated inflight

## Use cases

The following table contains some use cases and is by no means exhaustive. 

| **Use case** | **Secure** | Consumed |
| ---- | ---- | ---- |
| Connection strings | Yes | Inflight |
| SSH Keys | Yes | Inflight |
| Bucket count | No | Both |
| Connection strings | Yes | Inflight |
| SSH Keys | Yes | Inflight |
| Bucket count | No | Both |
| Retry counts | No | Inflight |
| API Keys | Yes | Inflight |
| DNS information (certificates, hosted zones) | No | Preflight |
| Autoscaling parameters | No | Preflight |
| Feature Flags | No | Both |
| Platform Input (state-file name, etc..) | No | Preflight |


## Configuring and Managing Inputs

### The Wing Configuration File

Inputs are defined via a Wing configuration file. These configuration files are called `wing.toml` and support other file formats such as `json` and `yaml`. 

For instance in order to create a single input that will be used to determine how many buckets are created in our preflight code, we can do the following:

```toml
# wing.toml
bucketCount = 3
```

```js
// main.w
bring cloud;
let bucketCount = cloud.Input("bucketCount");

let buckets = MutArray<cloud.Bucket>[];

for i in 0..buckets.asNum() {
  buckets.push(new cloud.Bucket() as "bucket_${i}");
}
```


Additionally lets imagine we wanted to create resources based on feature flags provided at compile time.

```toml
email-list = "one@email.com, two@gmail.com"

[ features ]
notifications = false
```

```js
let enableNotifications = cloud.Input("/features/notifications");
let emailList = cloud.Input("/email-list"); // comma separated string

let inbox = new cloud.Bucket() as "inbox";

// conditionally provision infrastructure based on enableNotification
if enableNotifications.asBool() {
	inbox.onCreate(inflight () => {
		// use emailList input inflight
		for email in emailList.asStr().split(",") {
			// ...
		}
	});
}
```

### Inputs via CLI Flags

As an alternative to creating a `wing.toml` file, non-secure inputs can be defined via the cli.

```bash
wing compile main.w --input /feature/notifications=true --input /email-list=stuff
```

### Platform specific inputs

In some cases input values need to vary based on the target Platform. We can imagine we may have a input required for a Platform names: "TerraformS3Backend" which requires 2 inputs at minimum, `tf-s3-backend/bucket` and `tf-s3-backend/state-file-name` the non app providing Platforms are able to add inputs during the `preSynth` hook.

```js
export class TerraformS3Backend implements IPlatform {
  preSynth(app: App): void {
    const rootKey = "/tf-s3-backend";
	app.addInput("S3BackendBucket", {name: `${rootKey}/bucket`});
	app.addInput("S3BackendStateFile", {name: `${rootKey}/state-file`});
  }
}
```

Compiling the following platform with missing inputs will result in an error message like such:
```
Missing required inputs:
/tf-s3-backend/bucket
/tf-s3-backend/state-file-name
```

To satisfy the required inputs we would need to create a `wing.toml` with those required values
```toml
[ tf-s3-backend ]
bucket = "my-wing-bucket"
state-file = "my state file"
```

### Creating inputs in preflight

Sometimes we may just want to provide an input defined within our Wing application. Take for instance the following 
```js
let testEmail = new cloud.Input(name: "/test/email", defaultValue: "test@fake.com");

new cloud.Function(inflight() => {
	// some code that uses the testEmail
});
```

While more adhoc than creating an `wing.toml` file, this should be fine in most non-secure cases.
### Secure Inputs

Some inputs contain sensitive data and thus should be treated with enhanced scrutiny. I.E. Inputs with sensitive data should not be created by preflight code in order to keep any trace of them from state files. 

A secure input can be indicated using the optional prop, `secure` as such
```js
new cloud.Input({name: "/my-db/connection-string", secure: true})
```

This will result in an error like 
```
Cannot create secure Inputs in Preflight
... followed by some Platform specific text on how secure inputs are expected to be created
```

### Creating the inputs Interactively (P2)

Additionally inputs can be created through an interactive process by running `wing compile -i app.main.w` 

This interactive experience will prompt users to provide values for all of their inputs
```sh
wing compile -i app.main.w

Please enter an input value for /features/notifications: "true"
Please enter an input value for /email-list: "one@email.com,two@email.com"
```

As well re-running this command will give the opportunity to change input values
```sh
wing compile -i app.main.w

Please enter an input value for /features/notifications (true):
Please enter an input value for /email-list (one@email.com,two@email.com): ""
```
By default, not entering in a new value will keep the existing version.

### List Application Inputs

Its also possible to view a list of the inputs for a given application and target platforms. This can be achieved by using the `wing inputs --list` command 

For example using the below application code

```js
let enableNotifications = cloud.Input("/features/notifications");
let emailList = cloud.Input("/email-list"); // comma seperated string
```

combined with a Platform that has required inputs (such as the TerraformS3Backend one mentioned above) can be done with 
```bash
wing inputs --list -t tf-aws -t @tf-s3-backend
```

will produce an output like this:
```
Application inputs:
/features/notifications
/email-list
/tf-s3-backend/bucket
/tf-s3-backend/state-file-name
```