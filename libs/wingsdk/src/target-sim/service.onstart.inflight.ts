import type {
  IFunctionHandlerClient,
  IServiceOnStartHandlerClient,
} from "../cloud";

export class ServiceOnStartHandler implements IServiceOnStartHandlerClient {
  private readonly handler: IFunctionHandlerClient;

  constructor({ handler }: { handler: IFunctionHandlerClient }) {
    this.handler = handler;
  }

  public async handle(): Promise<any | undefined> {
    return this.handler.handle("");
  }
}
