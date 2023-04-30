---
title: (Draft) Unique Preflight Instances ID
description: How to create unique IDs for preflight instances
---
- **Author(s):**: @ekeren
- **Submission Date**: {2022-04-30}
- **Stage**: Draft

## Background

In the current implementation of Wing, when instantiating a new preflight class, the compiler provides a default ID for the instance. 
In cases where the default ID cannot be made unique, a compiler error occurs.

In the last wingathon, more than 70% of preflight instances in the Wing research repository are created with a custom ID. 

## Observed Patterns

When examining the code, the following patterns can be observed:

1. Improved readability of preflight instances, e.g.:
  
    [dogfooding/publications-etl](https://github.com/winglang/research/blob/926453f5c5abd2e3158b4c8c659f1e790c99d741//app.w#L70)
     ```ts (wing)
     this.initialized = new cloud.Counter() as "initialized";
     ```
2. Name duplications - situations where the ID (or part of it) is also reflected in the constructor:
  
    [dogfooding/release-webhoo](https://github.com/winglang/research/blob/926453f5c5abd2e3158b4c8c659f1e790c99d741/dogfooding/release-webhook/main.w#L207):
     ```ts (wing)
     let slack_token = new cloud.Secret(name: "slack-token") as "Slack Token";
     ```
     You can also consider situations where `cloud.Bucket` and `cloud.Test` where the ID of the instance and the name of bucket/test are connected 
3. Multiple instances of the same type in the same scope:
   
     [dogfooding/publications-et](https://github.com/winglang/research/blob/926453f5c5abd2e3158b4c8c659f1e790c99d741/dogfooding/publications-etl/app.w#LL31-L33C58)
     ```ts (wing)
     this.inbox = new cloud.Bucket() as "inbox";
     this.transformations = new cloud.Bucket() as "transformations";
     this.catalogs = new cloud.Bucket() as "xslt catalog";
     ```

## Proposal

Differentiate between stateful instance (cloud.Bucket, Redis, cloud.Counter, cloud.Table, cloud.Queue) that require a stable ID, 
and stateless instances where the ID is essential for discoverability and debuggability.

- For stateful instances, provide the instance name as the first argument:
  ```ts (wing)
  new cloud.Bucket("inbox");
  this.ingestion = new cloud.Queue("ingestion work queue");
  new cloud.Test("bucket get and test", ...);
  ```
  
- For stateless instances, default the instance name to the corresponding variable:
  ```ts (wing)
  // ./app.w
  bring cloud; 
  let my_func = new cloud.Function(...); // named "my_func"
  new cloud.Function(...); // when no variable, default to named "cloud.Function$1"
  new cloud.Function(...); // when no variable, default to named "cloud.Function$2"
  ```
  
Stateful preflight class: A class that is either defined as stateful or instantiates any stateful preflight class.







