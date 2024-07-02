import { CustomApi } from "./api";

import {
  API_FQN,
} from "@winglang/sdk/lib/cloud";
import type { IPlatform } from "@winglang/sdk/lib/platform";
import type { Construct } from "constructs";

export class Platform implements IPlatform {
  public readonly target = "tf-aws";

  public newInstance(
    type: string,
    scope: Construct,
    id: string,
    props: any,
  ): any {
    if (type === API_FQN) {
      return new CustomApi(scope, id, props);
    }
  }
}