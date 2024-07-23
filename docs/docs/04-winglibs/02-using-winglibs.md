---
title: Using winglibs
id: using-winglibs
description: Documentation for using winglibs
sidebar_label: Importing winglibs
keywords: [Wing reference, Wing libraries, libraries, packaging, packages]
---


Wing libraries ([winglibs](https://github.com/winglang/winglibs)) can be installed using the npm command line tool.

Here is an example of installing the [wing-redis winglib](https://github.com/winglang/winglibs/tree/main/redis).

```
npm i wing-redis
```

Then in your Wing source code, the library can be imported by name using a `bring` statement:

```js
bring "wing-redis" as redis;

new redis.Redis();
```

Libraries can expose the following kinds of API elements:

- Classes
- Structs
- Interfaces
- Enums
- Constants (coming soon - see https://github.com/winglang/wing/issues/3606 to track)

APIs in libraries can also be organized hierarchically for better organization.
For example, a library may split up its API elements between multiple modules (also sometimes called "namespaces"):

```js
bring "my-wing-payments-library" as payments;

new payments.charges.Charge();
new payments.customer.Customer();
```
