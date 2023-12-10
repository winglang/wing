---
title: "#2726 Wing Inputs"
description: "How to create, share, manage inputs"
---

# Wing Inputs
- **Author(s)**: @Hasanaburayyan
- **Submission Date**: {2023-12-08}
- **Stage**: Draft

Using Wing inputs in your application

## Background

Frequently applications have the need to read inputs, whether those inputs are sensitive data like passwords, connection strings, ssh keys or non-sensitive configuration such as retry counts, endpoint urls, etc..

## Use cases

- Sensitive Data Management
	- Handling passwords, API keys, and secret tokens.
	- Managing SSH keys for secure server access.
	- Database connection strings.

- Configuration Management
	- Setting up environment-specific endpoint URLs (e.g., for different stages like development, staging, production).
	- Configuring retry logic parameters such as retry counts and backoff strategies.
	- Defining feature flags or toggle switches to enable/disable certain features dynamically.

- Application Scaling
	- Adjusting resource allocation parameters like CPU, memory limits, and autoscaling thresholds based on the environment.

- Service Integrations
	- Configuring webhook URLs and listener settings for external service events.

- Security Policies
	- Setting up access control lists or role-based access control parameters.

- Network Configuration
	- Specifying IP ranges, domain names, and port numbers for network settings.
	- Configuring API gateway endpoints and routing rules.

- Monitoring and Logging
	- Setting up log levels, log retention policies, and monitoring thresholds.
	- Configuring alerting rules and notification settings.

- Deployment and Continuous Integration
	- Specifying deployment targets and versioning details.
	- Configuring build and test parameters for CI/CD pipelines.
- Data Processing and Analytics
	- Defining data retention policies and archival settings.
	- Specifying parameters for data processing jobs

-  Miscellaneous Settings
	- Setting time zone, date formats, and other general application settings.
	- Customizing email templates, notification contents, and messaging formats.

## Managing Inputs

The lifecycle management of inputs in Wing is a crucial aspect of ensuring seamless integration and usability. This section outlines different potential approaches for managing inputs, considering their creation, definition, and usage

### Compilation Time Input Generation
- CLI-Based input Generation: This feature in the Wing CLI allows the ability to generate and store inputs during the compilation process. (perhaps either interactively or through cli-flag)
```js
wing compile -t tf-aws --input "/some/input=wow"
```
- In-Code Input Declaration: Inputs resources can be defined inline in code. 
```js
bring cloud;

let input = new cloud.Input(name: "/some/input", value: "wow");
```

### Runtime Input Management
- Runtime assignment of Inputs: This allows inputs like database connection strings or API keys that can be created at runtime
```js
bring cloud;

let dbConnectionString = new cloud.Input(name: "/db/connection/string");

new cloud.Function(inflight() => {
	let conncectionString = someCallToGetConnectionString();
	// Assign the connection string input during runtime
	dbConnectionString.setValue(connectionString)
});
```

### Pre-compilation Input Configuration
- CLI Input configuration: This would introduce some pre-compile cli command that will prompt the user for input values for their Wing application
```js
wing -t tf-aws configure-inputs app.main.w

...
please provide a value for: "/some/input": 
```
- Manual creation (through script or other means)
