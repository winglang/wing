import { Code, InflightClient } from "../core";

/**
 * interface that is used for setting Datetime date
 */
export interface DatetimeComponents {
  /**
   * year
   */
  readonly year: number;
  /**
   * month
   */
  readonly month: number;
  /**
   * day
   */
  readonly day: number;
  /**
   * hours
   */
  readonly hour: number;
  /**
   * minutes
   */
  readonly min: number;
  /**
   * seconds
   */
  readonly sec: number;
  /**
   * milliseconds
   */
  readonly ms: number;
  /**
   *  timezone offset in minutes from UTC
   */
  readonly tz: number;
}

/**
 * Represents a local or UTC date object
 * @wingType datetime
 */
export class Datetime {
  /**
   * Create a Datetime from UTC timezone
   *
   * @returns a new `Datetime` from current time in UTC timezone
   */
  static utcNow(): Datetime {
    return new Datetime();
  }

  /**
   * Create a Datetime from local system timezone
   *
   * @returns a new `Datetime` from current time in system timezone
   */
  static systemNow(): Datetime {
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
  static fromIso(iso: string): Datetime {
    return new Datetime(new Date(iso));
  }

  /**
   * returns an instance of Date time created from DatetimeComponents
   * @param c DatetimeComponents
   */
  static fromComponents(c: DatetimeComponents): Datetime {
    const date = new Date(
      Date.UTC(c.year, c.month, c.day, c.hour, c.min, c.sec, c.ms)
    );

    return new Datetime(date, c.tz);
  }

  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
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
   *  returns a timestamp of non-leap seconds since epoch
   */
  get timestamp(): number {
    return this.timestampMs / 1000;
  }

  /**
   *  returns a timestamp of non-leap milliseconds since epoch
   */
  get timestampMs(): number {
    // since converting between timezones/ declaring a date in a timezone other than the local or UTC
    // isn't native to js, we keep the date in a UTC time, then retrieving back the the original timestamp,
    // this way the date components (hours, month, day, minutes, etc..) are persistent
    // and retrieved in the same order for all of the different constructing methods and the timestamp is correct.
    return this._date.valueOf() + this._timezoneOffset * 60 * 1000;
  }

  /**
   * returns the hour of the local machine time or in utc
   */
  get hours(): number {
    return this._date.getUTCHours();
  }

  /**
   * returns the minute of the local machine time or in utc
   */
  get min(): number {
    return this._date.getUTCMinutes();
  }

  /**
   * returns the seconds of the local machine time or in utc
   */
  get sec(): number {
    return this._date.getUTCSeconds();
  }

  /**
   * returns the milliseconds of the local machine time or in utc
   */
  get ms(): number {
    return this._date.getUTCMilliseconds();
  }

  /**
   * returns the day of month in the local machine time or in utc (1 - 31)
   */
  get dayOfMonth(): number {
    return this._date.getUTCDate();
  }

  /**
   * returns the day in month of the local machine time or in utc (0 - 6)
   */
  get dayOfWeek(): number {
    return this._date.getUTCDay();
  }

  /**
   * returns the month of the local machine time or in utc (0 - 11)
   */
  get month(): number {
    return this._date.getUTCMonth();
  }

  /**
   * returns the year of the local machine time or in utc
   */
  get year(): number {
    return this._date.getUTCFullYear();
  }

  /**
   * returns the offset in minutes from UTC
   */
  get timezone(): number {
    return this._timezoneOffset;
  }

  /**
   * returns a Datetime represents the same date in utc
   */
  toUtc(): Datetime {
    return new Datetime(new Date(this.timestampMs));
  }

  /**
   * returns ISO-8601 string
   */
  toIso(): string {
    return new Date(this.timestampMs).toISOString();
  }
}
