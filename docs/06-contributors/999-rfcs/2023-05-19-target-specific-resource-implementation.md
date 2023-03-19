---
title: (Draft) Target Specific Resources Implementation
description: How should you define a custom resource that is implmemented differently on diffetent targets
---

- **Author(s):**: @eleren
- **Submission Date**: {2023-05-19}
- **Stage**: Draft
- **Stage Date**: {YYYY-MM-DD}

How should a wing developer define a custom target that is implemented differtently on different targets

## Background

Wing is unique by allowing the developer to initiating abstract classes, consider the following code
```ts (wing)
bring cloud;

let b = new cloud.Bucket();
```

At a first glance on this line, one could think that this code will initiate the cloud.Bucket instance.
But in fact that resource is actually an abstract class and an instance of this class is never initilized.
The actual class that will be initiated is determined by the target of compilation, the actual implementation of this
dependency injection mechanism is described in this [PR]([url](https://github.com/winglang/wing/pull/1681)).

Currenlty, wing doesn't have a way to express different implementations for different targets in the language. 
The actual `cloud.Bucket` implementation for different target is in typescript.
The document propose a solution for defining different implementations for different targets in wing

## Requirements

Here are the requirements

## Proposals

### Using familiar abstract class syntax

When an abstract resource gets instantiated, the system looks for a `<resource_name>.<target_name>` class that extends that resource

Consider this KVStore.w file 
```ts (wing)

abstract resource KVStore {
  
  abstract on_upload(inflight fn: (str, str)): void; 
  
  abstract inflight put(k: str, v:str): void;
  
  inflight put_json(k: str, j: Json) {
     return this.put(k, Json.stringify(v));
  }
}

resource KVStore.tf-aws extends KVStore {
  init() { 
    throw("Not implemented tf-aws");
  } 
  
  on_upload(inflight fn: (str, str)): void {
     throw("Not implemented tf-aws");
  }
  
  inflight put(k: str, v:str): void {
    throw("Not implemented tf-aws");
  }
} 

resource KVStore.sim extends KVStore {
  init() { 
    throw("Not implemented for sim");
  } 
  
  on_upload(inflight fn: (str, str)): void {
     throw("Not implemented for sim");
  }
  
  inflight put(k: str, v:str): void {
    throw("Not implemented for sim");
  }
}
```


## Example


## FAQ

**Q:** 

**A:** 

**Q:** 

**A:** 

**Q:** 
**A:**

## Open Questions

**Q:** Is this mechanism restricted for resource or is it allowed for classes as welll
