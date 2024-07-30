---
title: "Deploy a static website with Wing"
subtitle: "Example application that deploys a static website into the cloud"
type: 
  - "pattern"
platform:
  - "awscdk"
  - "tf-aws"
  - "sim"
language:
  - "wing"
githubURL: "https://github.com/winglang/examples.git"
repoDirectory: "examples/static-website"
coverImage: "/img/examples/static-website.png"
coverImageInPage: true
coverImageOptions: 
  awscdk: "/img/examples/static-website-aws.png"
  "tf-aws": "/img/examples/static-website-aws.png"
resources:
  - label: "Understanding inflight and preflight"
    href: "/docs/concepts/inflights"
  - label: "Explore the Wing website cloud resource"
    href: "/docs/api/standard-library/cloud/website"
  - label: "Explore the Wing api cloud resource"
    href: "/docs/api/standard-library/cloud/api"
authors:
  - name: "David Boyne"
    role: "Developer Advocate, Wing"
    twitter: "https://twitter.com/boyney123"
    github: "https://github.com/boyney123"
cloudResources:
  - website
  - api
  - counter
---

This example application deploys a static website to the cloud using a [website](/docs/api/standard-library/cloud/website) resource. Additionally, it includes an [API resource](/docs/api/standard-library/cloud/api) featuring a `/hello-static` **POST** endpoint. 

The deployed website shows a button which makes a POST request to the API to increment a counter value.

> The `/hello-static` POST endpoint in this example returns an [inflight function](/docs/concepts/inflights#inflight-code). This is runtime code. When a request is received at this endpoint, the inflight code is executed.

```js playground
bring cloud;
bring util;
bring http;
bring expect;

let website = new cloud.Website(
  path: "./static",
);

let api = new cloud.Api({
  cors: true,
  corsOptions: {
    allowHeaders: ["*"],
    allowMethods: [http.HttpMethod.POST],
  },
});
website.addJson("config.json", { api: api.url });

let counter = new cloud.Counter() as "website-counter";

api.post("/hello-static", inflight (request) => {
  return {
    status: 200,
    headers: {
      "Content-Type" => "text/html",
      "Access-Control-Allow-Origin" => "*",
    },
    body: "<div id=\"hello\" class=\"mt-4\">Hello {counter.inc()}</div>",
  };
});

```

### Resources used in this example

- [Website](/docs/api/standard-library/cloud/website) - Deploy static websites into the cloud
- [API](/docs/api/standard-library/cloud/api) - Create APIs and deploy them into the cloud
- [Counter](/docs/api/standard-library/cloud/counter) - Stateful container for one or more numbers in the cloud

