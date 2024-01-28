# ts4w - Experimental TypeScript experience for Wing

```ts
// main.ts
import { main, cloud, std, lift } from "ts4w";

main((app) => {
  const bucket = new cloud.Bucket(app, "Bucket");

  new std.Test(
    app,
    "put stuff into bucket",
    lift({ bucket }).inflight(async function () {
      await this.bucket.put("hello.txt", "hello world");
    })
  );
});
```

```shell
wing compile main.ts
wing compile -t tf-aws main.ts
wing test main.ts
```