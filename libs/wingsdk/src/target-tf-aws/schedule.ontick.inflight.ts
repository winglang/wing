import type {
  IFunctionHandlerClient,
  IScheduleOnTickHandlerClient,
} from "../cloud";

export class ScheduleOnTickHandlerClient
  implements IScheduleOnTickHandlerClient {
  private readonly handler: IFunctionHandlerClient;
  constructor({ handler }: { handler: IFunctionHandlerClient }) {
    this.handler = handler;
  }
  public async handle(event: any) {
    await this.handler.handle(event.detail);
  }
}
