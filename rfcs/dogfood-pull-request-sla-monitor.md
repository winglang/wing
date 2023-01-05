# Dogfooding Wing - Pull Request SLA 

- **Author(s):**: @ekeren
- **Submission Date**: {2023-01-04}
- **Stage**: Draft

**Goal**: Have a real application in production that we develop with wing, debug it, extend its capabilities and monitor it

## Reasoning For Dogfooding

One of the p1 of our beta launch is having a real applications that we use in production,
AKA as dogfooding, it is believed that without it: 
> **We will not know what we don't know about the readiness of Wing**

## This RFC scope

This request for comments is focusing on a specific application **pull request SLA monitor**,
that will be extended in the future for a community companion tool that can monitor 
and respond to issues/pull requests/slack posts, etc... 

The specific code presented here is just the initial work, it is not completed but I still believe I can 
get valuable feedback from the team before I move forward. 

There is also an emphasis here on not future proofing anything, or creating future abstractions.
For example the slack is basicaly an alerting mechanism, but right now it is just plain old slack 

```ts (wing)
bring cloud;
/** 
* Using octokit as rest client for github api
* I've decided not to create a github Resource because
* I don't see a reason to mock this resource in the sim.
* This is different from the slack resource, where I don't want to
* go back and forth to slack and spam some channel in my developement mode.
*/ 
bring untyped octokit as octokit; // syntax TBD 

/**
* This is an initial, quick and dirty API of 
* wing's equivilant to javascript setTimeout api
* There are many options how the API for capability can look like
* for example, It might be a capability of the cloud.Function object.
* But I decided to focus on a designated Resource for this capability, 
* so we can implement this as a custom resource and not an sdk resource (to begin with) 
*/ 
resource FutureCloudFunctionInvoker { 
  /**
  * Invoke an inflight function in the future
  * @praram delay - when to lauch this 
  * @param fn - which function to invoke
  */
  inflight invoke(delay: duration, fn: inflight () => void): void {
    // TODO implement for different targets:
    //  - Sim: setTimeout (hours -> seconds :shrug) 
    //  - AWS: StepFunctions
  }
}

/**
* A dumb down Slack Resource that abstracts posting to channel as a single user
* In a non Sim implementation this Resouce should handle secrets of that single user (or we should use Secret?) 
* In the sim implementation we can just print the posting, for easy localhost debugging
*/
resource SlackWorkspace {
  /** 
  * Post a message of the auth users into a slack channel
  * Notice that this resource is a very degenerate version of what a 
  * real slack resource should look like, in this case the posting of the message
  * is always done by a specific user.
  */ 
  inflight post(channel: str, message: str){
    // TODO implement:
    //  - Sim: show Log of events 
    //  - !Sim: slack API 
    //     - What about secrets  
  }
}

/** 
* A simple SLA configuration
*/
struct SLA {
  pull_request_new_contributor = 2h;
  pull_request_recurring_contributor = 1d; 
}

let future_invoker = new FutureCloudFunctionInvoker();
let api = new cloud.Api();
let slack = new Slack();
let contributors_counter = new cloud.Counter(); // str => int map

let determine_sla = inflight (github_username: str) : num => {
  let username_contributions = contributors_counter.inc(github_username, 1);
  if (username_contributions == 1){
    return SLA.pull_request_new_contributor;
  } 
  return SLA.pull_request_recurring_contributor;
};

api.on_post("/pull-request-created",  inflight (req: ApiRequest): ApiResponse => {
  // I kinda expected to see req.body here and not req.payload
  // Also it kinda made me think about express.js body json parser middleware idea that we can "borrow"
  let orbit_data = Struct.from_json(req.payload); 
  // I assume we have a nicer API for this comparison, but I haven't checked yet
  assert(
    orbit_data.source == 'github' 
    && orbit_data.entity == 'pull-request' 
    && orbit_data.action == 'created',
    "Wrong data '${orbit_data}' sent to ${req.path}"
  );
  
  let sla = determine_sla(orbit_data.github_user);
  future_invoker.invoke_in(sla, inflight (): void => {
    let comments = await octokit.rest.pulls.listReviewComments({
      owner: orbit_data.payload.github_repo.owner,
      name: orbit_data.payload.github_repo.name,
      pull_number: orbit_data.payload.pull_number,
    }); // comments is still an any object from untyped bring
    if comments.data.length() == 0 { // length is the javascript method
        slack.post("#community-monitor", 
          "Pull Request https://github.com/${orbit_data.payload.github_repo.owner}/${orbit_data.payload.github_repo.name}/pull/${orbit_data.payload.pull_number} requires some :love"
        );
    }
  });
});
```
