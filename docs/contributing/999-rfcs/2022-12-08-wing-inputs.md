---
title: "#2726 Wing Inputs"
description: "How to create, share, manage inputs"
---

# Wing Inputs
- **Author(s)**: @Hasanaburayyan
- **Submission Date**: {2023-12-08}
- **Stage**: Draft

## Background

An input is a value used by either an application or platform that is not defined within the application's source code.

Inputs can be Platform agnostic, such as an a retry count that is dictated by business requirements. Other inputs may be Platform specific, like a DNS configurations.

### Context

There are a few things that are considered out-of-scope for this RFC. 
- Inputs are all treated as string data
- Inputs cannot be created, or updated inflight

## Use cases

The following table contains some use cases and is by no means exhaustive. 

| **Use case** | **Secure** | Consumed |
|-----------|---------| ----------- |
| Connection strings | Yes | Inflight |
| SSH Keys | Yes | Inflight |
| Bucket count | No | Both | 
| Retry counts | No | Inflight |
| API Keys | Yes | Inflight |
| DNS information (certificates, hosted zones) | No | Preflight |
| Autoscaling parameters | No | Preflight |
| Feature Flags | No | Both |


## Configuring and Managing Inputs

(Note): this section is just some initial thoughts I dont want to lose track of as I play with this idea of inputs.

The following Wing application contains several inputs, in this section of the RFC we will see how inputs can be managed

(draft sketch)
```js
let enableNotifications = input("/features/notifications");
let emailList = input("/email-list"); // comma seperated string

let inbox = new cloud.Bucket() as "inbox";

// conditionally provision infrastructure based on enableNotification
if (enableNotifications.asBool()) {
	inbox.onCreate(inflight () => {
		// use emailList input inflight
		for email in emailList.asStr().split(",") {
			// ...
		}
	});
}
```

In order for the above code to run there are 2 required inputs `enableNotifications` and `emailList` either one of these inputs can be used inflight or preflight. 

To manage these inputs we will create a `inputs.json` file within our project's folder.
```json
{
	"features": {
		"notifications": "true"
	},
	"email-list": "one@email.com,two@email.com"
}
```

### Creating the inputs Interactively

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

### Platform specific inputs

In some cases input values need to vary based on the target Platform. Take for example the email list input. This input should use some dev email when running in the `sim` target. 
