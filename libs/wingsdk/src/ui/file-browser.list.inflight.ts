import { IFileBrowserListHandlerClient } from "./file-browser";

export class FileBrowserListHandlerClient
  implements IFileBrowserListHandlerClient
{
  private readonly handler: IFileBrowserListHandlerClient;
  constructor({ handler }: { handler: IFileBrowserListHandlerClient }) {
    this.handler = handler;
  }
  public async handle(): Promise<string[]> {
    try {
      return await this.handler.handle();
    } catch (e) {
      throw new Error("Invalid payload for file browser list handler client");
    }
  }
}
