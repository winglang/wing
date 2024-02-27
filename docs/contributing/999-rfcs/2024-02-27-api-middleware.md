---
title: API Middlware
description: Changes and addition for API middleware support
---

# #{RFC Number} - {RFC_TITLE}

- **Author(s):**: @{AUTHOR}, @{AUTHOR}
- **Submission Date**: {YYYY-MM-DD}
- **Stage**: {RFC Stage}
- **Stage Date**: {YYYY-MM-DD}

<!---
Directions for above:

Author(s): Git tag for PR authors and contributors
Submission Date: Fill in with date of initial submission, YYYY-MM-DD
Stage: Fill in with current stage in the RFC lifecycle
Stage Date: Fill in with date of last stage change
-->

> Identify changes needed for the SDK and Wing compiler to have first class support for writing and using middleware in APIs.

<!--
This RFCs have 3 sections: Requirements -> Design -> Implementation. We intentionally start with *Design* since it
is a great way to introduice the feature to readers.
-->

## Design

API middleware is a common pattern available in HTTP frameworks of different tools and programming languages that allows API logic to be further customized in a composable way.
A middleware handler typically takes in an HTTP handler of some kind (a function that takes a request and returns a response), and adds additional pre- or post-processing of the request.
Middleware can be used for adding logging, allowing APIs to be callable cross-origin, ensuring the current user is authenticated, and more.

Today, creating API middleware in Wing is confusing or challening in a number of ways.

Suppose we want to add two pieces of middleware: one that logs information about each request/response, and one that checks that the request is authenticated via the presence of a "x-service-token" header.

Here is one way to do that in Wing:

```js
bring cloud;

let api = new cloud.Api();

let authMiddleware = (handler: inflight (cloud.ApiRequest): cloud.ApiResponse): inflight (cloud.ApiRequest): cloud.ApiResponse => {
  return inflight (req) => {
    let token = req.headers?.tryGet("x-service-token");
    if let token = token {
      return handler(req);
    } else {
      return {
        status: 404,
        body: "no x-service-token header"
      };
    }
  };
};

let loggingMiddleware = (handler: inflight (cloud.ApiRequest): cloud.ApiResponse): inflight (cloud.ApiRequest): cloud.ApiResponse => {
  return inflight (req) => {
    let res = handler(req);
    log("{req.method} {req.path} {res.status}");
    return res;
  };
};

api.get("/hello", loggingMiddleware(authMiddleware(inflight () => {
  return {
    status: 200,
    body: "Hello world!"
  };
})));

api.get("/error", loggingMiddleware(authMiddleware(inflight () => {
  return {
    status: 404,
    body: "Not found"
  };
})));
```

The existing middleware pattern satisfies basic requirements: it allows the function to customize the request, customize the response, choose when to call the next handler, and even end the call chain early (for example, to return an error response).

A few observations:
- The user needs to provide a very long type signature for the middleware.
  - If the user omits the types of `handler` it will not be inferred.
  - The types are associated with `cloud.Api` instead of the language's general HTTP facilities in the `http` module. The naming implies these middleware are only designed for use with `cloud.Api`.
- It's not possible to chain middleware one step at a time
  - The example below raises an incorrect type checking error, `Expected type to be "inflight (ApiRequest): ApiResponse", but got "inflight (ApiRequest): ApiResponse" instead`

```js
let var handler = inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  return {
    status: 200,
    body: "Hello world!"
  };
};
handler = authMiddleware(handler);
handler = loggingMiddleware(handler);
```

- There is no way to apply middleware to all routes of `cloud.Api` automatically. The user needs to write out code that calls the middleware `middleware(...)` for each route.
- Middleware cannot be provided by Wing libraries because middleware implemented as static methods do not work as expected.
  - The example below errors during preflight compilation ("Cannot read properties of undefined"):

```js
bring cloud;

class MyMiddleware {
  pub static loggingMiddleware(handler: inflight (cloud.ApiRequest): cloud.ApiResponse): inflight (cloud.ApiRequest): cloud.ApiResponse {
    return inflight (req) => {
      let res = handler(req);
      log("{req.method} {req.path} {res.status}");
      return res;
    };
  }
}

let api = new cloud.Api();

let handler = inflight () => {
  return {
    status: 200,
    body: "Hello world!"
  };
};

api.get("/hello", MyMiddleware.loggingMiddleware(handler));
```

<!--
This section works backwards from an the end user. It is written as one or more "artifacts from the future" such as the getting started documentation (readme), user interface wireframes (or link to them), press release, changelog entry, etc.
-->

## Requirements

- Write new API middleware in Wing
- Import API middleware from Wing libraries
- Apply middleware to individual paths
- Apply middleware to all paths

<!--
This section is a "shopping list" of requirements for this feature.

We try to start by identifying the use cases that are expected to be addressed by this RFC.
Ideally they should not inform the design or implementation but rather state the problems/pains/results
that our users expect to achieve with this RFC.

The requirements are the "contract" of the feature you're developing - "what does it do?" (as opposed to "how does it do it" - the implementation). The requirements usually specify use cases as well as edge case scenarios and the desired behavior of the software described.

NOTES:
* It is highly recommended to split functional and non-functional requirements.
* Requirements should be prioritized P0 (must), P1 (nice to have) or P2 (future).
* It is also recommended to give requirements an identifier that will make them easier to reference later.
-->

<!--

### Functional

- REQ01 (P1): bla bla bla
- REQ02 (P0): another requirement

### Non-Functional

- REQ03 (P1): bla bla bla

-->

## Proposed changes

First, we would like to propose using standard types `http.Request` and `http.Response` instead of `cloud.ApiRequest` and `cloud.ApiResponse` for API handlers, encouraging reuse with any future Wing libraries and classes users write that also wish to use API middleware.

Related to the above, we would like to support the SDK exporting a type `http.Handler` that is simply a type alias for `inflight (http.Request): http.Response` to reduce the amount of boilerplate in middleware code.

Second, we would like to propose an `addMiddleware` method that will allow an inflight function to be automatically applied to all routes:

```js
api.addMiddleware(loggingMiddleware); // runs on all routes
```

Lastly, to support middleware being shared between Wing libraries, we would like to prioritize fixes for the two bugs mentioned in the Design section:
- Fix issue with reassignment to variables typed as inflight functions.
- Fix issue where inflight functions cannot be created inside preflight static methods.

Here is a finished example illustrating how middleware would be shown in our docs:

```js
bring cloud;
bring http;

let api = new cloud.Api();

let authMiddleware = (handler: http.Handler): http.Handler => {
  return inflight (req) => {
    let token = req.headers?.tryGet("x-service-token");
    if let token = token {
      return handler(req);
    } else {
      return {
        status: 404,
        body: "no x-service-token header"
      };
    }
  };
};

let loggingMiddleware = (handler: http.Handler): http.Handler => {
  return inflight (req) => {
    let res = handler(req);
    log("{req.method} {req.path} {res.status}");
    return res;
  };
};

// apply auth middleware to /hello route only
api.get("/hello", authMiddleware(inflight () => {
  return {
    status: 200,
    body: "Hello world!"
  };
}));

api.get("/error", inflight () => {
  return {
    status: 404,
    body: "Not found"
  };
});

// apply logging middleware to all routes
api.addMiddleware(loggingMiddleware);
```


<!--
This section has a list of topics related to the implementation. We have some examples/ideas for topics below. Feel free to add as needed

The goal of this section is to help decide if this RFC should be implemented.
It should include answers to questions that the team is likely ask.
Contrary to the rest of the RFC, answers should be written "from the present" and likely
discuss approach, implementation plans, alternative considered and other considerations that will
help decide if this RFC should be implemented.
-->

<!--

### Why are we doing this?

> What is the motivation for this change?

### Why should we _not_ do this?

> Is there a way to address this use case with the current product? What are the downsides of implementing this feature?

### What is the technical solution (design) of this feature?

> Briefly describe the high-level design approach for implementing this feature.
>
> As appropriate, you can add an appendix with a more detailed design document.
>
> This is a good place to reference a prototype or proof of concept, which is highly recommended for most RFCs.

### Is this a breaking change?

> Describe what ways did you consider to deliver this without breaking users? Make sure to include a `BREAKING CHANGE` clause under the CHANGELOG section with a description of the breaking changes and the migration path.

### What alternative solutions did you consider?

> Briefly describe alternative approaches that you considered. If there are hairy details, include them in an appendix.

### What are the drawbacks of this solution?

> Describe any problems/risks that can be introduced if we implement this RFC.

### What is the high-level project plan?

> Describe your plan on how to deliver this feature from prototyping to GA. Especially think about how to "bake" it in the open and get constant feedback from users before you stabilize the APIs.
>
> If you have a project board with your implementation plan, this is a good place to link to it.

### Are there any open issues that need to be addressed later?

> Describe any major open issues that this RFC did not take into account. Once the RFC is approved, create GitHub issues for these issues and update this RFC of the project board with these issue IDs.

## Appendix

> Feel free to add any number of appendices as you see fit. Appendices are expected to allow readers to dive deeper to certain sections if they like. For example, you can include an appendix which describes the detailed design of an algorithm and reference it from the FAQ.

-->
