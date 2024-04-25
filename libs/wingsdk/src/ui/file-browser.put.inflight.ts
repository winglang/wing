import { IFileBrowserPutHandlerClient } from "./file-browser";

export class FileBrowserPutHandlerClient
  implements IFileBrowserPutHandlerClient
{
  private readonly handler: IFileBrowserPutHandlerClient;
  constructor({ handler }: { handler: IFileBrowserPutHandlerClient }) {
    this.handler = handler;
  }
  public async handle(payload: string): Promise<void> {
    try {
      const { fileName, fileContent } = JSON.parse(payload);
      return await this.handler.handle(fileName, fileContent);
    } catch (e) {
      throw new Error("Invalid payload for file browser put handler client");
    }
  }
}
