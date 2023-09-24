import type { IFunctionHandlerClient, IServiceOnEventClient } from "../cloud";

export class ServiceOnEventHandler implements IServiceOnEventClient {
  private readonly handler: IFunctionHandlerClient;

  constructor({ handler }: { handler: IFunctionHandlerClient }) {
    this.handler = handler;
  }

  public async handle() {
    await this.handler.handle("");
  }
}
