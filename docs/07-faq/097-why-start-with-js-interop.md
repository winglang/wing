---
title: Why start with Javascript interop and not some other language?
id: why-start-with-js-interop
keywords: [faq, winglang, Wing programming language, Wing language, JavaScript, Interop]
---

Wing chose to start with JavaScript interoperability for a few reasons:

1. **Compilation to JavaScript**: Wing compiles to JavaScript, making it easier to add interoperability with it.
2. **Popularity of JavaScript**: JavaScript is one of the most widely used programming languages, especially in the cloud.
3. **SDK using JSII**: Wing's SDK is written in TypeScript and uses JSII to export it for consumption in other languages, such as Go, Python, and Java.

While Wing currently supports interoperability with JavaScript, it doesn't exclude the possibility of adding more languages to compile and interoperate with Wing in the future.

It's important to note that even though you cannot directly call non-Wing or non-JS code from Wing, you can still use other languages inside cloud functions and invoke those functions with Wing. Although you won't get the full benefits of the compiler seeing everything in this way, it will work.

