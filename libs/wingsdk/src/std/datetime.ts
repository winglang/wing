import { InflightClient } from "../core/inflight";

/**
 * Interface that is used for setting Datetime date
 */
export interface DatetimeComponents {
  /**
   * Year
   */
  readonly year: number;
  /**
   * Month
   */
  readonly month: number;
  /**
   * Day
   */
  readonly day: number;
  /**
   * Hours
   */
  readonly hour: number;
  /**
   * Minutes
   */
  readonly min: number;
  /**
   * Seconds
   */
  readonly sec: number;
  /**
   * Milliseconds
   */
  readonly ms: number;
  /**
   *  Timezone offset in minutes from UTC
   */
  readonly tz: number;
}

/**
 * Represents a local or UTC date object
 * @wingType datetime
 */
export class Datetime {
  /**
   * @internal
   */
  public static _toInflightType(): string {
    return InflightClient.forType(__filename, this.name);
  }
  /**
   * Create a Datetime from UTC timezone
   *
   * @returns a new `Datetime` from current time in UTC timezone
   */
  public static utcNow(): Datetime {
    return new Datetime();
  }

  /**
   * Create a Datetime from local system timezone
   *
   * @returns a new `Datetime` from current time in system timezone
   */
  public static systemNow(): Datetime {
    const date = new Date();
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60 * 1000);

    return new Datetime(date, date.getTimezoneOffset());
  }

  /**
   * Create a Datetime from an ISO-8601 string
   *
   * @returns a new `Datetime` in UTC timezone
   * @param iso ISO-8601 string
   */
  public static fromIso(iso: string): Datetime {
    return new Datetime(new Date(iso));
  }

  /**
   * Create a Datetime from a JavaScript Date object.
   *
   * @param date The JavaScript Date object.
   * @returns a new `Datetime` instance.
   */
  public static fromDate(date: Date): Datetime {
    return this.fromIso(date.toISOString());
  }

  /**
   * Create a Datetime from Datetime components
   *
   * @param c DatetimeComponents
   * @returns a new `Datetime`
   */
  public static fromComponents(c: DatetimeComponents): Datetime {
    const date = new Date(
      Date.UTC(c.year, c.month, c.day, c.hour, c.min, c.sec, c.ms)
    );

    return new Datetime(date, c.tz);
  }

  /** @internal */
  private readonly _date: Date;
  /** @internal */
  private readonly _timezoneOffset: number = 0;

  private constructor(date: Date = new Date(), timezoneOffset = 0) {
    this._date = date;
    this._timezoneOffset = timezoneOffset;
  }

  /**
   * Return a timestamp of non-leap year seconds since epoch
   *
   * @returns a number representing the current timestamp in seconds
   */
  public get timestamp(): number {
    return this.timestampMs / 1000;
  }

  /**
   * Return a timestamp of non-leap year milliseconds since epoch
   *
   * @returns a number representing the current timestamp in milliseconds
   */
  public get timestampMs(): number {
    // since converting between timezones/ declaring a date in a timezone other than the local or UTC
    // isn't native to js, we keep the date in a UTC time, then retrieving back the the original timestamp,
    // this way the date components (hours, month, day, minutes, etc..) are persistent
    // and retrieved in the same order for all of the different constructing methods and the timestamp is correct.
    return this._date.valueOf() + this._timezoneOffset * 60 * 1000;
  }

  /**
   * Returns the hour of the local machine time or in utc
   *
   * @returns a number representing the datetime's hour
   */
  public get hours(): number {
    return this._date.getUTCHours();
  }

  /**
   * Returns the minute of the local machine time or in utc
   *
   * @returns a number representing the datetime's minute
   */
  public get min(): number {
    return this._date.getUTCMinutes();
  }

  /**
   * Returns the seconds of the local machine time or in utc
   *
   * @returns a number representing the datetime's seconds
   */
  public get sec(): number {
    return this._date.getUTCSeconds();
  }

  /**
   * Returns the milliseconds of the local machine time or in utc
   *  *
   * @returns a number representing the datetime's milliseconds
   */
  public get ms(): number {
    return this._date.getUTCMilliseconds();
  }

  /**
   * Returns the day of month in the local machine time or in utc (1 - 31)
   *
   * @returns a number representing the datetime's day of month
   */
  public get dayOfMonth(): number {
    return this._date.getUTCDate();
  }

  /**
   * Returns the day in month of the local machine time or in utc (0 - 6)
   *
   * @returns a number representing the datetime's day of week
   */
  public get dayOfWeek(): number {
    return this._date.getUTCDay();
  }

  /**
   * Returns the month of the local machine time or in utc (0 - 11)
   *
   * @returns a number representing the datetime's month
   */
  public get month(): number {
    return this._date.getUTCMonth();
  }

  /**
   * Returns the year of the local machine time or in utc
   *
   * @returns a number representing the datetime's year
   */
  public get year(): number {
    return this._date.getUTCFullYear();
  }

  /**
   * Returns the offset in minutes from UTC
   *
   * @returns a number representing the datetime's offset in minutes from UTC
   */
  public get timezone(): number {
    return this._timezoneOffset;
  }

  /**
   * Returns a Datetime represents the same date in utc
   *
   * @returns a datetime representing the datetime's date in UTC
   */
  public toUtc(): Datetime {
    return new Datetime(new Date(this.timestampMs));
  }

  /**
   * Returns ISO-8601 string
   *
   * @returns a ISO-8601 string representation of the datetime
   */
  public toIso(): string {
    return new Date(this.timestampMs).toISOString();
  }
}
