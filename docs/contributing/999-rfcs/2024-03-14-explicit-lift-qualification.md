---
title: "Explicit lift qualification"
description: Language spec for specifying explicit lift qualifications
---

# Explicit lift qualification

- **Author(s)**: @yoav-steinberg
- **Submission Date**: 2024-03-14
- **Stage**: Proposal
- **Stage Date**: 2024-03-14

This document describes the requirements and proposed syntax for explicit lift qualifications.

## Background

### Lifting

A lift in winglang is 2 things: 
1. A mechanism for capturing a preflight object in inflight code and generating an inflight client for that specific object. 
   In case of primitives this is mere serialization. In case of preflight classes the client is the object's inflight API.
2. A mechanism for setting up the host of the inflight closure (the `cloud.Function` for example) so it can safely use the client
   to access the preflight objet. For example setting up least privilege permissions for the host to access the resource.

This document deals with the 2nd of these two.

### Lift qualification

Lift qualification is the compilation process in which we qualify each lifted object with the operations being performed on it.
For example the inflight code `bucket.put("key", "value")`, requires the lifted object `bucket` to be qualified with the operation `put` for the given inflight method/closure. 
By qualifying lifts the compiler creates a map of all the preflight objects and how they are used in a given inflight method/closure.
This map is then used to configure the host running that inflight code so it can safely access the preflight objects (least privilege permissions).

### Automatic lift qualification
Lift qualification is currently done automatically by the compiler for all preflight expressions in inflight code. 

### Qualification errors

When the compiler encounters an inflight expression that references a preflight type, then, without static analysis, it cannot qualify the lift because it does not know what preflight objects might be referenced by this inflight expression. The result is a compilation error.

In the future we'd like to employ data flow analysis (probably through [reaching defintions analysis](https://en.wikipedia.org/wiki/Reaching_definition)) resolve these errors.

## Problems with the current solution

We need a mechanism for explicitly qualifying lifted objects. Consider the following cases:

1. When using inflight expressions to reference a preflight object we'd like to disable the compilation error and explicitly qualify the lift.
```js
let b1 = new cloud.Bucket() as "b1";
let b2 = new cloud.Bucket() as "b2";
inflight () => {
  let var b = b1;
  if true {
    b = b2;
  }
  b.put("key", "value"); // Need to explicitly qualify b1 and b2 with "put" since the compiler doesn't figure this out for us.
}
```

2. When there's a collection of preflight objects that are being used inflight:
```js
for b in buckets {
  b.put("key", "value"); // We need to qualify all `buckets` with "put"
}
```
3. When our knowledge of the application logic can produce better qualifications:
```js
for i in buckets.len {
  if i % 2 == 0 {
    buckets.at(i).put("key", "value"); // We only need to qualify the even buckets with "put" and not the odd ones
  }
}
```
4. Cases where just the method name isn't enough information to create least privilege permissions:
```js
for i in 0..5 {
  bucket.put("k{i}", "value");
}
```
Here we can benefit from an explicit qualification of `bucket` with `"put"` operation and a specific key pattern: `"k*"`. We currently don't
have a way to disable the automatic qualification and define the narrower qualification.

Note that in all the above exmaples except the last one we currently get a compilation error due to us trying to use a `Bucket.put` operation on an inflight expression.

## Requirements

So the aim of this proposal is to present:
1. A way to explicitly qualify the preflight objects that are being used by inflight methods/closures.
2. Disabling compilation errors where the explicit qualification applies.
3. Disabling automatic qualification where the explicit qualification applies. 
4. Provide a framework that can be extended to programatically defining and reusing lift qualifications.

## Naming

"qualifiations" is used because it qualifies how the preflight object is being used. 
Other words that we sometime used in the past and might be clearer are "capabilities" or "operations":
* "capabilities" makes sense because it describes the capabilities the host needs in order to successfully run the inflight code.
* "operations" makes sense because it describes the operations being performed on the preflight objects by the inflight code.

In this proposal I'll use "qualifications", but I'd be happy to hear what you think.

## Prior work

### Issue with discussion on the subject: 
[Mechanism for explicitly qualifying lifting](https://github.com/winglang/wing/issues/76)

### Existing PR
[feat(compiler): allow explicit lift qualifications of preflight objects](https://github.com/winglang/wing/pull/5935)

Issues with this PR:
* Confusing sytax that looks like an inflight function call might lead to [misuse](https://github.com/winglang/wing/pull/5935#issuecomment-1995051115).
* No scoping of where we're disabling compiler errors.
* Doesn't provide a mechanism to disable auto qualification.
* No mechanism or clear path to mechanism for programatically defining and reusing lift qualifications.

## Proposal

```js
let b1 = new cloud.Bucket() as "b1";
let b2 = new cloud.Bucket() as "b2";
inflight () => {
  let var b = b1;
  if true {
    b = b2;
  }
  // In the following scope we disable qualification compilation errors due to unknown preflight object
  // and we also disable automatic qualification.
  // We explicitly qualify b1 and b2 with "put" since the compiler doesn't figure this out for us.
  lift {b1: ["put"], b2: ["put"]} {
    b.put("key", "value"); 
  }
}
```

Internally the argument to the `lift` block creates a `std.Qualifications` object which is added to the closures lift qualifications. 

Note that multiple `lift` blocks in the code just create more `std.Qualifications`s for this closure. 
The actual qualification values (`b1` and `"put"`) are just appended to the closure/method and they don't strictly belong to the block.

What does apply to the block are the disabling of qualification errors within the block, so in our example we can use the inflight expression `b`, and inside the block we also don't automatically add qualifications even if the compiler can technically do this. 
This behavior ensures that we can create custom qualifications without worrying that the compiler with override this with something more general.

A few points worth highlighting about the design of the block-like syntax:

1. It's granular, meaning it's possible to scope usage to the exact code it's needed for, avoiding [spooky action at a distance](https://en.wikipedia.org/wiki/Action_at_a_distance_(computer_programming)). The syntax opts out of Winglang's automatic permission generation for just the lines of code inside it, which means if you have a function with dozens of lines of code, you don't necessarily have to opt the entire function out of the compiler's automatic qualification system.

2. The syntax makes it clear to people reading the code that something special is happening that can't be achieved in plain runtime / library code. For example it's not a function call, so it doesn't necessarily follow the rules of function calls.

3. It's compositional. When a user refactors their code (for example, to extract a few lines of code into a separate function), they can take a qualification/capabilities block along with it, and it's made easy because the qualifications are located adjacent to the relevant code.

4. Note that nesting `lift` blocks has no special effect. It'll just add the explicit qualifications to the method and disable the compiler's error generation and auto qualification at the top most `lift` block:

```js
// These two inflight closures are effectively the same:
let nesting = inflight () => {
  let b = bucket;
  let q = queue;
  lift {bucket: ["get"]} {
    b.get("key");
    lift {queue: ["push"]} {
      q.push("data");
    }
  }
}

let no_nesting = inflight () => {
  let b = bucket;
  let q = queue;
  lift {bucket: ["get"], queue: ["push"]} {
    b.get("key");
    q.push("data");
  }
}
```

## Next steps

The next step will be to provide use library APIs for programatically creating and manipulating `std.LiftQualification` objects and then reusing them. We can also inherit from them and to provide qualification objects that go beyond only the "operation" being performed on the object. Here's an example:

```js
// stdlib
class cloud.BucketPutQual extends std.Qualification {
  this.keyPattern: str;
  
  new(b: cloud.Bucket) {
    super(b, ["put"]);
    this.keyPattern = "*";
  }
  
  setKeyPattern(pattern: str) {
    this.keyPattern = pattern;
  }
}

// Create a qualifications container
let quals = new std.Qualifications();

let b1 = new cloud.Bucket() as "b1";
let b2 = new cloud.Bucket() as "b1";

// Define our explicit qualifications, b1 has a special key pattern when putting
let b1Quals = new cloud.BucketPutCap(b1);
b1Quals.setKeyPattern("k*");
// b2 can put any key
let b2Quals = new std.Qualification(b2, ["put"]);

// Add them to our explicit qualifications
quals.add(b1Quals);
quals.add(b2Quals);

let arr = [b1,b2];

// Define get access on all buckets
let getBucketQuals = new std.Qualifications();
for b in arr {
  getQuals.add(new std.Qualification(b, ["get"]));
}

class A {
  inflight foo() {
    lift qual { // Use the qualification object programatically defined in preflight code
      for b in arr {
        b.put("k99", "v"); // This key pattern should work for both buckets
      }
      // 
      b2.put("hello", "world"); // b2 accepts any key pattern
      b1.put("k100", "v"); // no automatic qualifications happen in this scope, the key pattern qualification on b1 isn't overriden
    }

    // use getBucketQuals for get access on all buckets in the bucket array
    lift getBucketQuals {
      for b in arr {
        b.get("k");
      }
    }
  }

  inflight bar() {
    lift qual { // reuse `qual` for another method of `A`
      let b = arr.at(randome(arr.len));
      b.put("k0", "bar");
    }
  }
}

```
