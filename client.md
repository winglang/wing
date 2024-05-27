# Typescript Clients from wing


```wing
bring cloud;


let bucket = new cloud.Bucket();


let client = new TypeScriptClient();
client.lift(bucket, ["put"]);

// Create an npm package
client.export("./client_package")
```

```js
// client_package/index.js



```