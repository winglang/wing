import { Code, InflightClient } from "../core";

/**
 * Represents a length of time.
 */
export class Duration {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Create a Duration representing an amount of years
   *
   * @param amount the amount of Years the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Years.
   */
  public static fromYears(amount: number): Duration {
    return new Duration(amount * 60 * 60 * 24 * 365);
  }

  /**
   * Create a Duration representing an amount of months
   *
   * @param amount the amount of Months the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Months.
   */
  public static fromMonths(amount: number): Duration {
    return new Duration((amount * 60 * 60 * 24 * 365) / 12);
  }

  /**
   * Create a Duration representing an amount of days
   *
   * @param amount the amount of Days the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Days.
   */
  public static fromDays(amount: number): Duration {
    return new Duration(amount * 60 * 60 * 24);
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
   * Create a Duration representing an amount of minutes
   *
   * @param amount the amount of Minutes the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Minutes.
   */
  public static fromMinutes(amount: number): Duration {
    return new Duration(amount * 60);
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
   * Create a Duration representing an amount of milliseconds
   *
   * @param amount the amount of Milliseconds the `Duration` will represent.
   * @returns a new `Duration` representing `amount` Milliseconds.
   */
  public static fromMilliseconds(amount: number): Duration {
    return new Duration(amount / 1000);
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
   * Return the total number of milliseconds in this Duration
   *
   * @returns the value of this `Duration` expressed in Milliseconds.
   */
  public get milliseconds() {
    return this.seconds * 1000;
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

  /**
   * Return the total number of months in this Duration
   *
   * @returns the value of this `Duration` expressed in Months.
   */
  public get months() {
    return this.years * 12;
  }

  /**
   * Return the total number of years in this Duration
   *
   * @returns the value of this `Duration` expressed in Years.
   */
  public get years() {
    return this.days / 365;
  }
}
