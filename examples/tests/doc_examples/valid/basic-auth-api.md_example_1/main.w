// This file was auto generated from an example found in: basic-auth-api.md_example_1
// Example metadata: {"valid":true}
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
    if (this.authHeaderPresent(headers)) {
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

  if (!authenticated) {
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
