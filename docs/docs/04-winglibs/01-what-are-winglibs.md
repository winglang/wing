---
title: Wing Libraries
id: what-are-winglibs
description: Documentation about Wing libraries (winglibs)
sidebar_label: What are winglibs?
keywords: [Wing reference, Wing libraries, libraries, packaging, packages]
---

As you write larger Wing applications, organizing your code becomes increasingly important.
By grouping related functionality and separating code with distinct features, you'll make it easier to find code that implements a particular feature and where to go to change how a feature works.
As the project grows further, you can extract parts into separate libraries that become external dependencies. 

Any Wing project can be packaged as a library, which will export all public types (like classes and structs) so that they can be used by multiple applications.

Wing libraries are also known as [**winglibs**](https://github.com/winglang/winglibs). 

The [Wing Trusted Library Ecosystem](https://github.com/winglang/winglibs) has an open source list of winglibs you can use including [openai](https://github.com/winglang/winglibs/tree/main/openai), [cognito](https://github.com/winglang/winglibs/tree/main/cognito), [dynamodb](https://github.com/winglang/winglibs/tree/main/dynamodb), and [many more](https://github.com/winglang/winglibs).

### How to use a Wing library

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
