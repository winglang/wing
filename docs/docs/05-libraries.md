---
title: Wing Libraries
id: libraries
description: Documentation about Wing libraries
sidebar_label: Libraries
keywords: [Wing reference, Wing libraries, libraries, packaging, packages]
---

As you write larger Wing applications, organizing your code becomes increasingly important.
By grouping related functionality and separating code with distinct features, you'll make it easier to find code that implements a particular feature and where to go to change how a feature works.
As the project grows further, you can extract parts into separate libraries that become external dependencies. 

Any Wing project can be packaged as a library, which will export all public types (like classes and structs) so that they can be used by multiple applications.

Let's first start with how to consume a Wing library.

## Using a Wing library

Wing libraries can be installed using the npm command line tool.

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

### Creating a Wing library

Packaging your own Wing code as a library is straightforward.
Let's walk through it step by step.

First, check that your project is organized based on how you want to structure your library.
There are two main rules to be aware of:

1. APIs can only be exported from non-entrypoint files (files that do not end in `.main.w` or `.test.w`).
   Entrypoint files are perfect for writing tests and deployment scenarios that can be executed as-is - but if you have classes and other APIs you want to share, they have to be defined in non-entrypoint files (also known as module files).

2. APIs are organized based on the project's directory structure.
   If you want a group of classes to be part of a namespace named "storage", define them in a directory named "storage" (for example, some classes could be defined in `storage/file1.w`, several more in `storage/file2.w`, and so on).
   All public APIs defined at the root of your project will be available at top-level namespace in your library.

Next, run `npm init` to create a `package.json` file with information about your library.
Make sure you fill out the "name", "version", "description", "author", and "license" fields.

Finally, run `wing pack` at the root of your project directory.
`wing pack` will compile your project and create a .tgz file that can be published to [npm](https://www.npmjs.com/), [GitHub Packages](https://github.com/features/packages), or any other Node.js package managing service.
