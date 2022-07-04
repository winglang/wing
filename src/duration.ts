export class Duration {
  public static fromMinutes(amount: number): Duration {
    return new Duration(amount * 60);
  }

  public static fromHours(amount: number): Duration {
    return new Duration(amount * 60 * 60);
  }

  public static fromSeconds(amount: number): Duration {
    return new Duration(amount);
  }

  private constructor(public seconds: number) {

  }

  public get minutes() {
    return this.seconds / 60;
  }

  public get hours() {
    return this.minutes / 60;
  }
}
