import { IFileBrowserDeleteHandlerClient } from "./file-browser";

export class FileBrowserDeleteHandlerClient
  implements IFileBrowserDeleteHandlerClient
{
  private readonly handler: IFileBrowserDeleteHandlerClient;
  constructor({ handler }: { handler: IFileBrowserDeleteHandlerClient }) {
    this.handler = handler;
  }
  public async handle(payload: string): Promise<void> {
    try {
      const fileName = JSON.parse(payload).fileName;
      return await this.handler.handle(fileName);
    } catch (e) {
      throw new Error("Invalid payload for file browser delete handler client");
    }
  }
}
