---
title: "Intrinsic Functions"
description: Global compiler intrinsics
---

# Intrinsics

- **Author(s)**: @MarkMcCulloh
- **Submission Date**: 2024-05-07

### Use Case

In wing there are currently several built-in globals, all of which are injected with their own macro functionalities. These can intentionally have behaviors different from those possible to implement in wing itself. Some are simply macros that emit code, while some interact with the compiler in more novel/deep ways (e.g. `lift`). Even the simple macros have access to information that user-defined code would typically not (types, source position, etc.).

These are incredibly useful, but their behavior is surprising when to the user they appear no different than any other symbol/variable. Additionally they allow you to do things like do variable shadowing and assign them to variables which can actually break their functionality.

### Proposed Solution

Introduce a new syntax to reflect these special behaviors.

I propose `@x()` as a "compiler intrinsic", with the following notes:
- Having an intrinsic called `@x` does not mean that there is a symbol called `x`. Intrinsics are their own separate concept.
- It will not be possible to write `let variable = @x;` or otherwise use `@x` as an expression on its own, to prevent the impression that this a singular value being referenced
- While the arguments/return types must be normal wing types, the kind of expressions that can be passed as arguments may have certain restrictions. For example, it would be common to only allow non-interpolated string for certain cases to ensure all information is available statically.

- Why `@`?
  - It's not a valid identifier character, so there is no ambiguity that this is a special thing
  - A reasonable-looking alternative is x!(...) a la rust. Unfortunately ! is already used as the postfix unwrap. I think having a construct that is <identifier><!> mean 2 different things is ambiguous for both users and the compiler.
  - Having a special character as a prefix is useful for IDE completions because all you have to do is type `@` and you see all the available options.
  - It looks nice in [zig for builtins](https://ziglang.org/documentation/master/#Builtin-Functions) so there is at least some precedent
  - `@` is used in js for decorators which has a similar vibe of being special in the eyes of the compiler. It would not be unreasonable to use @ for decorators of some kind in wing as well.

With this, we can convert our existing globals to intrinsics instead and go forward implementing new ones. Some existing issues that I think would benefit:
- `@file` - https://github.com/winglang/wing/issues/5449
- `@inflight` - https://github.com/winglang/wing/issues/6045

### Other thoughts

I think it would be reasonable to expose the ability to create these in user-space via some sort of compiler API. This would be amazing but the design and implementation that would be a pretty huge task. Even if we did, we could still use the same syntax for invoke them even though we probably shouldn't call them "intrinsic" anymore.
