# ts4w - Experimental TypeScript experience for Wing

```ts
// main.ts
import { main } from "ts4w";
import { cloud } from "@winglang/sdk";

main((app) => {
  new cloud.Bucket(app, "Bucket");
})
```

```shell
wing compile main.ts
wing compile -t tf-aws main.ts
wing test main.ts
```