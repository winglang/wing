---
title: Website
id: website
description: A built-in resource for creating static websites.
keywords:
  [
    Wing reference,
    Wing language,
    language,
    Wing standard library,
    Wing programming language,
    Schedule,
    Cron job,
  ]
sidebar_position: 1
---

The `cloud.Website` resource represents a static website that can be hosted in the cloud.
Websites are typically used to serve static content, such as HTML, CSS, and JavaScript files, which are updated whenever the application is redeployed.

## Usage

### Website

```ts
bring cloud;

let website = new cloud.Website(path: "./public");
```

Under `./public/index.html`

```html
<!DOCTYPE html>
<html>
  Hello Winglang!!!
</html>
```

### Webapp

An extended Web App example including static Website, API Gateway and a Redis database, can be found in this [example project](https://github.com/winglang/research/tree/main/dogfooding/where-to-eat).

## Target-specific details

Review the [Website RFC](https://www.winglang.io/contributing/rfcs/2023-04-16-website-resource) for detailed information.

### Pass variables to the website
You can pass dynamic variables from the main.w file to the website, and recuperate them by fetching the config.js file.
// inside main.w

```ts
bring cloud;

let website = new cloud.Website(path: "./static");
let api = new cloud.Api();

website.addJson("config.json", { api: api.url });
```

inside ./static/index.html

```html
<html lang="en">
<html>
<body>
...
    <script>
        // Fetch the config file and get the API URL
        let ApiUrl;
        fetch('/config.json')
            .then(response => response.json())
            .then(data => {
                ApiUrl = data.api;
            });
    </script>
</body>
</html>
```


### Simulator (`sim`)

sim implementations of `cloud.Website` is using [nodejs express](https://expressjs.com/).

### AWS (`tf-aws` and `awscdk`)

AWS implementations of `cloud.Website` uses [Amazon S3](https://aws.amazon.com/s3/) & [Amazon CloudFront](https://www.amazonaws.cn/en/cloudfront/).

### Azure (`tf-azure`)

🚧 Not supported yet (tracking issue: [#1295](https://github.com/winglang/wing/issues/1295))

### GCP (`tf-gcp`)

🚧 Not supported yet (tracking issue: [#1296](https://github.com/winglang/wing/issues/1296))
