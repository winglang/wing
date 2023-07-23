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
   * returns the current time in UTC timezone
   */
  static utcNow(): Datetime {
    return new Datetime(new Date(), 0);
  }

  /**
   * returns the current time in system timezone
   */
  static systemNow(): Datetime {
    return new Datetime();
  }

  /**
   * returns an instance of Date time created from an ISO-8601 string, represents the time in UTC
   * @param iso ISO-8601 string
   */
  static fromIso(iso: string): Datetime {
    return new Datetime(new Date(iso), 0);
  }

  /**
   * returns an instance of Date time created from DatetimeComponents
   * @param c DatetimeComponents
   */
  static fromComponents(c: DatetimeComponents): Datetime {
    const date = new Date(
      Date.UTC(c.year, c.month, c.day, c.hour, c.min, c.sec, c.ms)
    );
    date.setTime(date.getTime() + c.tz * 60 * 1000);

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

  private constructor(
    date: Date = new Date(),
    timezoneOffset = date.getTimezoneOffset()
  ) {
    this._date = date;
    this._timezoneOffset = timezoneOffset;
  }

  /**
   *  returns a timestamp of non-leap seconds since epoch
   */
  get timestamp(): number {
    return this._date.valueOf() / 1000;
  }

  /**
   *  returns a timestamp of non-leap milliseconds since epoch
   */
  get timestampMs(): number {
    return this._date.valueOf();
  }

  /**
   * returns the hour of the local machine time or in utc
   */
  get hours(): number {
    return !this._timezoneOffset
      ? this._date.getUTCHours()
      : this._date.getHours();
  }

  /**
   * returns the minute of the local machine time or in utc
   */
  get min(): number {
    return !this._timezoneOffset
      ? this._date.getUTCMinutes()
      : this._date.getMinutes();
  }

  /**
   * returns the seconds of the local machine time or in utc
   */
  get sec(): number {
    return !this._timezoneOffset
      ? this._date.getUTCSeconds()
      : this._date.getSeconds();
  }

  /**
   * returns the milliseconds of the local machine time or in utc
   */
  get ms(): number {
    return !this._timezoneOffset
      ? this._date.getUTCMilliseconds()
      : this._date.getMilliseconds();
  }

  /**
   * returns the day of month in the local machine time or in utc (1 - 31)
   */
  get dayOfMonth(): number {
    return !this._timezoneOffset
      ? this._date.getUTCDate()
      : this._date.getDate();
  }

  /**
   * returns the day in month of the local machine time or in utc (0 - 6)
   */
  get dayOfWeek(): number {
    return !this._timezoneOffset ? this._date.getUTCDay() : this._date.getDay();
  }

  /**
   * returns the month of the local machine time or in utc (0 - 11)
   */
  get month(): number {
    return !this._timezoneOffset
      ? this._date.getUTCMonth()
      : this._date.getMonth();
  }

  /**
   * returns the year of the local machine time or in utc
   */
  get year(): number {
    return !this._timezoneOffset
      ? this._date.getUTCFullYear()
      : this._date.getFullYear();
  }

  /**
   * returns the offset in minutes from UTC
   */
  get timezone(): number {
    return this._date.getTimezoneOffset();
  }

  /**
   * returns a Datetime represents the same date in utc
   */
  toUtc(): Datetime {
    return new Datetime(new Date(this._date), 0);
  }

  /**
   * returns ISO-8601 string
   */
  toIso(): string {
    return this._date.toISOString();
  }
}
