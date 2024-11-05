---
title: "#3694 Website resource (approved)"
description: How to implement the website resource
search: false
---

# Website resource

- **Author(s):**: @tsuf239
- **Submission Date**: 2023-04-16
- **Stage**: draft
- **Stage Date**: 2023-04-16

<!---
Directions for above:

Author(s): Git tag for PR authors and contributors
Submission Date: Fill in with date of initial submission, YYYY-MM-DD
Stage: Fill in with current stage in the RFC lifecycle
Stage Date: Fill in with date of last stage change
-->

> Implementing the website resource following the [SDK spec](https://www.winglang.io/contributing/rfcs/2023-01-20-wingsdk-spec#website).

<!--
This RFC has 3 sections: Requirements -> Design -> Implementation. We intentionally start with *Design* since it
is a great way to introduice the feature to readers.
-->

## Requirements

The website resource represents a CDN-backed website. It is useful for hosting static content, such as a blog or a single-page application, but accepts dynamic data too.

## Design

The user will be able to point at a local directory, and create a static website holding those files in a single line of code. The website will accept dynamic content too, that will be added in the following lines of preflight code. The website will be served using a CDN and could be placed under a certain domain.

## Implementation - static content:

### Implementation for aws

Following a few AWS guides on the internet (brought in the end of the section), it seems that the common way to serve a static website is by using a bucket paired with cloudFront distribution.

After creating a public bucket, we'll upload the folder from the relative path.
AWS requires an index document name (to serve on the "/" path).
We'll start by hardcoding it to be "index.html", and can add it later to the website props upon request.

Then the bucket will be connected to a cloud front distribution. Cache related properties, geo-restrictions and price class are hardcoded for now could be added to the props upon request.

If a domain was specified it will be added to the CDN's url aliases. The domain should be bought in advance.
In the future we could separate the domain to be a standalone resource (that can later be attached to other resources, and be shared between them if needed).

The website resource supports preflight code only for now.
We can use an HTTP call in order to access the website pages and assets inflight.

#### References:

[Tutorial: Configuring a static website on Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/HostingWebsiteOnS3Setup.html)
[Use your domain for a static website in an Amazon S3 bucket](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/getting-started-s3.html)

### Implementation for the simulator

The website will be implemented by a static express server:

```js
const app = Express();

app.use(express.static("<resolved path to the website files folder>"));

app.listen(
  "<port, ideally will be specified by the user, otherwise generated>"
);
```

Since the website is served on the local machine, we cannot specify a domain, nor can we add a CDN while deploying to the simulator.

## Implementation - dynamic content:

Dynamic content is added by the developer in separation of the static content directory, and can be added during the preflight phase only. This content can include the url of other resource used by the website, for example, or any other data that is known only while running the application.

This can be achieved using the `cloud.Website.add_json` method.

### Implementation for aws

The method will upload a json object to the bucket, making it accessible within the static directory.

### Implementation for the simulator

A new express GET route will be added, returning a Json object containing the dynamic data. The route will be accessible within the static directory.

### point for thought:

I wonder if we should support .env files, in the future, (or any other kind of configuration-per-target system) for specifying different value for different targets:

For example:

In the wing file:

```
let main_website = new cloud.Website({path: "./website/main/dist", domain: MAIN_WEBSITE_DOMAIN})
let back_office_website = new cloud.Website({path: "./website/back-office/dist", domain: BO_WEBSITE_DOMAIN})
```

In tf-aws.env/ prod.env:

```
MAIN_WEBSITE_DOMAIN= "my-company.com"
BO_WEBSITE_DOMAIN= "bo.my-company.com"
```

In sim.env/ dev.env:

```
MAIN_WEBSITE_DOMAIN= "localhost:3000"
BO_WEBSITE_DOMAIN= "localhost:4000"
```

This, of course, rises more questions then answers-
how can we support different development environments? How do we tell wing which env file to use? Can we share those files between targets? (for example, running the same file for tf-gcp and tf-azure, and a different one for the sim).

- Website props are brought here for reference:

```ts
struct WebsiteProps {
  /**
   * Local path to the website's static files, relative to the Wing source file.
   * @example "./dist"
   */
  path: str;

  /**
   * The website's custom domain name.
   * @example "example.com"
   * @default - a domain is generated by the cloud provider
   */
  domain: str?;
}
```
