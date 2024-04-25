import { IFileBrowserGetHandlerClient } from "./file-browser";

export class FileBrowserGetHandlerClient
  implements IFileBrowserGetHandlerClient
{
  private readonly handler: IFileBrowserGetHandlerClient;
  constructor({ handler }: { handler: IFileBrowserGetHandlerClient }) {
    this.handler = handler;
  }
  public async handle(payload: string): Promise<string> {
    try {
      const fileName = JSON.parse(payload).fileName;
      return await this.handler.handle(fileName);
    } catch (e) {
      throw new Error("Invalid payload for file browser get handler client");
    }
  }
}
