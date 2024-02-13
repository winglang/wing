import type {
  IFunctionHandlerClient,
  IStreamSetConsumerHandlerClient,
  IStreamData,
} from "../cloud";

export class StreamSetConsumerHandlerClient
  implements IStreamSetConsumerHandlerClient
{
  private readonly handler: IFunctionHandlerClient;

  constructor(handler: { handler: IFunctionHandlerClient }) {
    this.handler = handler.handler;
  }

  public async handle(event: IStreamData[]) {
    // for each data in event
    // todo: figure out what to do with metadata from IStreamData
    for (const data of event) {
      // call handler
      await this.handler.handle(data.data);
    }
  }
}
