# ts4wing - Experimental TypeScript experience for Wing

```ts
// main.ts
import { wing } from "ts4wing";
import { cloud } from "@winglang/sdk";

wing((app) => {
  new cloud.Bucket(app, "Bucket");
})
```

```shell
wing compile main.ts
wing compile -t tf-aws main.ts
wing test main.ts
```