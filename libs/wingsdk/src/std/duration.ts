/**
 * Represents a length of time.
 */
export class Duration {
  /**
   * Create a Duration representing an amount of milliseconds
   *
   * @param amount the amount of milliseconds the `Duration` will represent.
   * @returns a new `Duration` representing `amount` milliseconds.
   */
  public static fromMilliseconds(amount: number): Duration {
    return new Duration(amount);
  }

  /**
   * Create a Duration representing an amount of seconds
   *
   * @param amount the amount of Seconds the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Seconds.
   */
  public static fromSeconds(amount: number): Duration {
    return this.fromMilliseconds(amount * 1000);
  }

  /**
   * Create a Duration representing an amount of minutes
   *
   * @param amount the amount of Minutes the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Minutes.
   */
  public static fromMinutes(amount: number): Duration {
    return this.fromSeconds(amount * 60);
  }

  /**
   * Create a Duration representing an amount of hours
   *
   * @param amount the amount of Hours the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Hours.
   */
  public static fromHours(amount: number): Duration {
    return this.fromMinutes(amount * 60);
  }

  /**
   * Create a Duration representing an amount of days
   *
   * @param amount the amount of Days the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Days.
   */
  public static fromDays(amount: number): Duration {
    return this.fromHours(amount * 24);
  }

  /**
   * Return the total number of milliseconds in this Duration
   *
   * @returns the value of this `Duration` expressed in Milliseconds.
   */
  public readonly milliseconds: number;

  private constructor(milliseconds: number) {
    this.milliseconds = milliseconds;
  }

  /**
   * Return the total number of seconds in this Duration
   *
   * @returns the value of this `Duration` expressed in Seconds.
   */
  public get seconds() {
    return this.milliseconds / 1000;
  }

  /**
   * Return the total number of minutes in this Duration
   *
   * @returns the value of this `Duration` expressed in Minutes.
   */
  public get minutes() {
    return this.seconds / 60;
  }

  /**
   * Return the total number of hours in this Duration
   *
   * @returns the value of this `Duration` expressed in Hours.
   */
  public get hours() {
    return this.minutes / 60;
  }

  /**
   * Return the total number of days in this Duration
   *
   * @returns the value of this `Duration` expressed in Days.
   */
  public get days() {
    return this.hours / 24;
  }
}
