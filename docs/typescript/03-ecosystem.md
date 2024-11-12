---
title: Ecosystem
id: ecosystem
---

### Trusted libraries

Dependencies can be installed like any other npm package and used in your project.
There is an ecosystem of trusted libraries written in winglang called [winglibs](https://github.com/winglang/winglibs)

```shell
npm install @winglibs/checks
```

```ts
import { main, inflight } from "@wingcloud/framework";
import checks from "@winglibs/checks";

main((root) => {
  new checks.Check(
    root,
    "MyCheck",
    inflight(async () => {
      console.log("Looks good to me!");
    })
  );
});
```

Other libraries can be used as well, including any CDKs:

```ts
import { main, inflight } from "@wingcloud/framework";
import { s3Bucket } from "@cdktf/provider-aws";

main((root) => {
  new s3Bucket.S3Bucket(root, "B1");
});
```

### Platform-specific code

Some resources are only available on certain platforms (clouds and provisioning systems). For example, if you import `@cdktf/provider-aws` and use `s3Bucket.S3Bucket`, you can only use it with the `tf-aws` target. To have platform-specific code, you can use the `WING_TARGET` environment variable to conditionally execute certain code:

```ts
import { main } from "@wingcloud/framework";
import { s3Bucket } from "@cdktf/provider-aws";

main((root) => {
  if (process.env.WING_TARGET === "tf-aws") {
    new s3Bucket.S3Bucket(root, "B1");
  }
});
```

More details about targets can be found [here](/docs/category/platforms).
