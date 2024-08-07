---
title: "API using basic authentication"
subtitle: "Example application that exposes an API behind basic authentication"
type: 
  - "pattern"
platform:
  - "awscdk"
  - "tf-aws"
  - "sim"
language:
  - "wing"
githubURL: "https://github.com/winglang/examples.git"
repoDirectory: "examples/api-basic-auth"
coverImage: "/img/examples/basic-api-auth.png"
coverImageInPage: true
resources:
  - label: "Understand preflight and inflight concepts"
    href: "/docs/concepts/inflights"
  - label: "Explore the Wing api resource"
    href: "/docs/api/standard-library/cloud/api"
authors:
  - name: "David Boyne"
    role: "Developer Advocate, Wing"
    twitter: "https://twitter.com/boyney123"
    github: "https://github.com/boyney123"
cloudResources:
  - api
---

This example application deploys an [API](/docs/api/standard-library/cloud/api) with a GET route called `/user`. The route is behind basic authentication and returns a 401 if un-authorized.

In this example a custom **BasicAuth** class is created. This class exposes a public inflight method (called verify) that is used within the API to verify the request. 

> **Did you know resources have a preflight and inflight API?** [Preflight](/docs/concepts/inflights) code runs once, at compile time whereas [inflight](/docs/concepts/inflights) code is run at runtime. In this example we create the BasicAuth and API resources on preflight (default for Wing files) and then use the BasicAuth method (verify) in the API itself (on inflight). To learn more you can read [preflight and inflight](/docs/concepts/inflights#preflight-code) core concepts.


```js example playground
bring cloud;
bring util;
bring http;

struct Credentials {
  username: str;
  password: str;
}

// Custom class for the authentication logic
class BasicAuth {
  user: str;
  password: str;

  new(user: str?, password: str?) {
    // Default credentials
    this.user = user ?? "admin";
    this.password = password ?? "admin";

    // Custom icon and color for the node
    nodeof(this).icon = "lock-closed";
    nodeof(this).color = "red";
  }

  // public function to verify the requests
  pub inflight verify(req: cloud.ApiRequest): bool {
    try {
      let authHeader = this.authHeader(req.headers);
      let credentials = this.authCredentials(authHeader);
      let username = credentials.username;
      let password = credentials.password;
      return username == this.user && password == this.password;
    } catch e {
      log("exception caught {e}");
      return false;
    }
  }

  // Decodes the given header and returns username and password
  inflight authCredentials(header: str): Credentials {
    let auth = util.base64Decode(header.split(" ").at(1));
    let splittedAuth = auth.split(":");
    let username = splittedAuth.at(0);
    let password = splittedAuth.at(1);

    return Credentials {
      username: username,
      password: password
    };
  }
  // Returns the authorization header
  inflight authHeader(headers: Map<str>?): str {
    if this.authHeaderPresent(headers) {
      let authHeaderOptional = headers?.tryGet("authorization");
      let var authHeader = headers?.tryGet("Authorization");

      if (authHeader == nil) {
        authHeader = authHeaderOptional;
      }

      return authHeader!;
    } else {
      log("headers: {Json.stringify(headers)}");
      log("no auth header");
      throw("no auth header");
    }
  }

  inflight authHeaderPresent(headers: Map<str>?): bool {
    if (headers?.has("authorization") == false) && (headers?.has("Authorization") == false) {
      return false;
    }
    return true;
  }

}

// Create a new instance of the BasicAuth class
let auth = new BasicAuth() as "Basic auth verification";

// Create a new API 
let api = new cloud.Api() as "Users API";

// Create the route /user and protect with basic auth
api.get("/user", inflight (req) => {
  let authenticated = auth.verify(req);

  if !authenticated {
    return {
      status: 401,
      headers: {
        "Content-Type" => "text/plain"
      },
      body: "Unauthorized"
    };
  }

  return {
    status: 200,
    headers: {
      "Content-Type" => "text/plain"
    },
    body: Json.stringify({ "firstname": "David", "lastname": "Boyne" })
  };
});
```

### Resources used in this example

- [Api](/docs/api/standard-library/cloud/api) - Resource for cloud api

