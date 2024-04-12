import type {
  IFunctionHandlerClient,
  IScheduleOnTickHandlerClient,
} from "../cloud";

export class ScheduleOnTickHandlerClient
  implements IScheduleOnTickHandlerClient
{
  private readonly handler: IFunctionHandlerClient;

  public constructor({ handler }: { handler: IFunctionHandlerClient }) {
    this.handler = handler;
  }

  public async handle(): Promise<void> {
    await this.handler.handle();
  }
}
