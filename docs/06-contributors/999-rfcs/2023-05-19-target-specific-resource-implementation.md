---
title: (Draft) Target Specific Resources Implementation
description: How should you define a custom resource that is implemented differently on different targets
---

- **Author(s):**: @ekeren
- **Submission Date**: {2023-05-19}
- **Stage**: Draft
- **Stage Date**: {YYYY-MM-DD}

How should a wing developer define a custom target that is implemented differently on different targets

## Background

Wing is unique by allowing the developer to initiating abstract classes, consider the following code
```ts (wing)
bring cloud;

let b = new cloud.Bucket();
```

At a first glance on this line, one could think that this code will initiate the cloud.Bucket instance.
But in fact that resource is actually an abstract class and an instance of this class is never initialized.
The actual class that will be initiated is determined by the target of compilation, the actual implementation of this
dependency injection mechanism is described in this [PR]([url](https://github.com/winglang/wing/pull/1681)).

Currently, wing doesn't have a way to express different implementations for different targets in the language. 
The actual `cloud.Bucket` implementation for different targets is in typescript.
The document propose a solution for defining different implementations for different targets in wing

## Requirements

The proposal should fulfill the following requirements:

- Allow defining target-specific implementations for custom resources.
- Maintain consistency with the existing language syntax and design.
- Enable easy integration with the current dependency injection mechanism.

## Proposal

Using familiar abstract class syntax with the `resource_name`.`target_name`.

When an abstract resource gets instantiated, the system looks for a `resource_name.target_name` class that extends that resource

Consider this KVStore.w file (that includes sim and tf-aws impl):
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
    // Add tf-aws impl
  } 
  
  on_upload(inflight fn: (str, str)): void {
    // Add tf-aws impl
  }
  
  inflight put(k: str, v:str): void {
    // Add tf-aws impl
  }
} 

resource KVStore.tf-gcp extends KVStore {
  init() { 
    // Add tf-gcp impl
  } 
  
  on_upload(inflight fn: (str, str)): void {
    // Add tf-gcp impl
  }
  
  inflight put(k: str, v:str): void {
    // Add tf-gcp impl
  }
}

// default implementation of the KVStore, when no specific KVStore.<specific-target> is found 
resource KVStore.* extends KVStore { 
  init() {
  } 

  on_upload(inflight fn: (str, str)): void {
    // Add default impl
  }
  
  inflight put(k: str, v:str): void {
    // Add default impl
  }
} 
```

Notes:
- if specific target resource is not found, and the `*` doesn't exists, produce compilation errors

Open Questions: 
- Is this mechanism restricted for resources or is it allowed for classes as well? 
- The `resource KVStore.tf-gcp extends KVStore {` breaks the DRY principle.
  - Is it important to `extends KVStore` here? 
  - Should extendability be mixed into this notion, we can alternatively make this an interface base solution see [Java default method](https://byexample.xyz/java/8/default/?gclid=CjwKCAjw5dqgBhBNEiwA7PryaJTWnHMem58AWVVOxQuOxOovp9RRJp0I9v3UQiIwS5UKCjoGaJtIYhoCoygQAvD_BwE)
 
## FAQ

**Q:** Why now?

**A:** With bring cdktf and extern "js" developers of wing can produce cloud resources and sim resources but they can't
create a resource that has both implementations.


