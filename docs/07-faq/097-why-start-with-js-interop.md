---
title: Why start with JavaScript interop and not some other language?
sidebar_label: Why start with JavaScript interop?
id: why-start-with-js-interop
keywords: [faq, winglang, Wing programming language, Wing language, JavaScript, Interop]
---

We chose to start with JavaScript interoperability in Wing for the following reasons:

1. **Popularity of JavaScript**: JavaScript is one of the most widely used programming languages, particularly in the cloud domain.
2. **SDK using [JSII]**: Wing's SDK is written in TypeScript and utilizes JSII to export it for consumption in other languages like Go, Python, and Java.
3. **Compilation to JavaScript**: Since Wing compiles to JavaScript, it's easier to add interoperability with it. The choice to compile to JS is due to the two points above.

While Wing currently supports interoperability with JavaScript, this doesn't exclude the possibility of adding more languages to compile and interoperate with Wing in the future.

It's important to note that even though you cannot directly call non-Wing or non-JS code from Wing, you can still use other languages inside cloud functions and invoke those functions with Wing. Although you won't receive the full benefits of the compiler seeing everything in this manner, it will still function.

[JSII]: https://github.com/aws/jsii
