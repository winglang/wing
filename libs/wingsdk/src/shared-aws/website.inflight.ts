import { IWebsiteClient } from "../cloud";
import { VisualModel } from "../std";

export class WebsiteClient implements IWebsiteClient {
  public constructor() {}

  public async visualModel(): Promise<VisualModel | undefined> {
    return undefined;
  }
}
