import { Code, InflightClient } from "../core";

/**
 * Represents a length of time.
 */
export class Duration {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, "Duration");
  }

  /**
   * Create a Duration representing an amount of minutes
   *
   * @param amount the amount of Minutes the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Minutes.
   */
  public static fromMinutes(amount: number): Duration {
    return new Duration(amount * 60);
  }

  /**
   * Create a Duration representing an amount of hours
   *
   * @param amount the amount of Hours the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Hours.
   */
  public static fromHours(amount: number): Duration {
    return new Duration(amount * 60 * 60);
  }

  /**
   * Create a Duration representing an amount of seconds
   *
   * @param amount the amount of Seconds the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Seconds.
   */
  public static fromSeconds(amount: number): Duration {
    return new Duration(amount);
  }

  /**
   * Return the total number of seconds in this Duration
   *
   * @returns the value of this `Duration` expressed in Seconds.
   */
  public readonly seconds: number;

  private constructor(seconds: number) {
    this.seconds = seconds;
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
}
