import type { IFunctionHandlerClient, IServiceOnStopHandlerClient } from "../cloud";

export class ServiceOnStopHandler implements IServiceOnStopHandlerClient {
  private readonly handler: IFunctionHandlerClient;

  constructor({ handler }: { handler: IFunctionHandlerClient }) {
    this.handler = handler;
  }

  public async handle(context: any): Promise<void> {
    return await this.handler.handle(context);
  }
}
