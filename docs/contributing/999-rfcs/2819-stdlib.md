---
search: false
---
# #2819 Wing Utility Library (approved)

- **Author(s):**: @eladb
- **Submission Date**: 2023-06-07
- **Stage**: Proposal
- **Stage Date**: 2023-06-07

> A specification for the Wing SDK utility libraries.

This is a very initial non-exhaustive sketch of Wing's utility library.
We plan to conduct a more thorough design of this library in the future,
establish design tenets and determine the boundaries of the library.

## Design

The Wing SDK includes a set of submodules which offer a set of useful functionality for building
cloud applications.

> This is just an initial spec and will likely change in the future.

For each module, we show a list of function declarations. For each function, we specify which phase this function
is bound to: `inflight` (inflight only - async), `preflight` (preflight only - synchronous) or
`preflight inflight` (for phase-independent).

## `math` module

```js
preflight inflight min(arr: Set<num>): num
preflight inflight max(arr: Set<num>): num
preflight inflight abs(value: num): num
preflight inflight floor(value: num): num;
preflight inflight ceil(value: num): num;
```

## `util` module

```js
// read environment variables
preflight inflight env(name: str): str;
preflight inflight tryEnv(name: str): str?;

// sleep
inflight sleep(d: duration): void; // inflight only!

// hash/random/uid generation
preflight inflight uuidv4(): str;
preflight inflight sha256(data: str): str;
preflight inflight nanoid(): str; // https://www.npmjs.com/package/nanoid

// returns an pseudo random double random number between [0, max] (inclusive).
preflight inflight random(max: num? = 1.0): num;
preflight inflight randomInt(max: num): num;

preflight inflight class RegExp {
  test(s: str): bool;
  match(s: str): RegExpMatch;
}

preflight inflight regex(pattern: str): RegExp;
```

## `fs` module

File APIs are phase-independent and at the moment are all implemented using the "sync" node.js `fs` APIs.
In the future we might separate preflight/inflight versions and the inflight versions will be async.

All file paths must be POSIX file paths (`/` instead of `\`) and will be
normalized to the target platform if running on Windows.

```js
preflight inflight readFile(path: str): str;
preflight inflight tryReadFile(path: str): str?; // nil if not found
preflight inflight readJson(path: str): Json;
preflight inflight tryReadJson(path: str): Json?;

preflight inflight writeFile(path: str, data: str): void;
preflight inflight writeJson(path: str, obj: Json): void;
preflight inflight writeYaml(path: str, obj: Json): void;
preflight inflight readYaml(path: str): Json;
preflight inflight tryReadYaml(path: str): Json?;

preflight inflight readDir(dir: str): Array<str>;
preflight inflight tryReadDir(dir: str): Array<str>?; // nil if dir not found

preflight inflight exists(path: str): bool;


// paths (paths are always posix)
inflight preflight join(p1: str, p2: str): str;
inflight preflight dirname(p: str): str;
inflight preflight basename(p: str): str;
inflight preflight relative(p: str): str;
inflight preflight absolute(p: str): str;

// ...
```

## `http` module

Note that the APIs here are inflight-only.

```
enum RequestCache {
  DEFAULT,
  NO_STORE,
  RELOAD,
  NO_CACHE,
  FORCE_CACHE,
}

enum RequestRedirect {
  FOLLOW, ERROR
}

struct RequestOptions {
  method: str = "GET";
  headers: Map<str> = {};
  body: str?;
  cache: RequestCache = RequestCache.DEFAULT,
  redirect: RequestRedirect = RequestRedirect.FOLLOW,
  referrer: str?,
  // omitted: mode, credentials, referrerPolicy, integrity, keepalive, signal, priority
}

struct Response {
  status: num;
  url: str;
  ok: bool;
  headers: Map<str>;
  body: str;
}

inflight fetch(url: str, options: RequestOptions?): Response;
inflight get(url: str, options: RequestOptions?): Response;
inflight post(url: str, options: RequestOptions?): Response;
inflight put(url: str, options: RequestOptions?): Response;
```

## Implementation Notes

All global functions should be implemented under a class named `Util` of each submodule.

