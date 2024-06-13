export default interface extern {
  foo: (b: Bucket$Inflight) => Promise<Output$Inflight>,
}
/** Trait marker for classes that can be depended upon.
The presence of this interface indicates that an object has
an `IDependable` implementation.

This interface can be used to take an (ordering) dependency on a set of
constructs. An ordering dependency implies that the resources represented by
those constructs are deployed before the resources depending ON them are
deployed. */
export interface IDependable$Inflight {
}
/** Represents a construct. */
export interface IConstruct$Inflight extends IDependable$Inflight {
}
/** Represents the building block of the construct graph.
All constructs besides the root construct must be created within the scope of
another construct. */
export class Construct$Inflight implements IConstruct$Inflight {
}
/** Data that can be lifted into inflight. */
export interface ILiftable$Inflight {
}
/** A liftable object that needs to be registered on the host as part of the lifting process.
This is generally used so the host can set up permissions
to access the lifted object inflight. */
export interface IHostedLiftable$Inflight extends ILiftable$Inflight {
}
/** Abstract interface for `Resource`. */
export interface IResource$Inflight extends IConstruct$Inflight, IHostedLiftable$Inflight {
}
/** Shared behavior between all Wing SDK resources. */
export class Resource$Inflight extends Construct$Inflight implements IResource$Inflight {
}
/** Options for `Bucket.delete()`. */
export interface BucketDeleteOptions {
  /** Check failures on the method and retrieve errors if any. */
  readonly mustExist?: (boolean) | undefined;
}
/** Options for `Bucket.get()`. */
export interface BucketGetOptions {
  /** The ending byte to read up to (including). */
  readonly endByte?: (number) | undefined;
  /** The starting byte to read from. */
  readonly startByte?: (number) | undefined;
}
/** Data that can be lifted into inflight. */
export interface ILiftable {
}
/** Represents a local or UTC date object. */
export class Datetime implements ILiftable {
  /** Returns the day of month in the local machine time or in utc (1 - 31).
  @returns a number representing the datetime's day of month */
  readonly dayOfMonth: number;
  /** Returns the day in month of the local machine time or in utc (0 - 6).
  @returns a number representing the datetime's day of week */
  readonly dayOfWeek: number;
  /** Returns the hour of the local machine time or in utc.
  @returns a number representing the datetime's hour */
  readonly hours: number;
  /** Returns the minute of the local machine time or in utc.
  @returns a number representing the datetime's minute */
  readonly min: number;
  /** Returns the month of the local machine time or in utc (0 - 11).
  @returns a number representing the datetime's month */
  readonly month: number;
  /** Returns the milliseconds of the local machine time or in utc  *.
  @returns a number representing the datetime's milliseconds */
  readonly ms: number;
  /** Returns the seconds of the local machine time or in utc.
  @returns a number representing the datetime's seconds */
  readonly sec: number;
  /** Return a timestamp of non-leap year seconds since epoch.
  @returns a number representing the current timestamp in seconds */
  readonly timestamp: number;
  /** Return a timestamp of non-leap year milliseconds since epoch.
  @returns a number representing the current timestamp in milliseconds */
  readonly timestampMs: number;
  /** Returns the offset in minutes from UTC.
  @returns a number representing the datetime's offset in minutes from UTC */
  readonly timezone: number;
  /** Returns ISO-8601 string.
  @returns a ISO-8601 string representation of the datetime */
  readonly toIso: () => string;
  /** Returns a Datetime represents the same date in utc.
  @returns a datetime representing the datetime's date in UTC */
  readonly toUtc: () => Datetime;
  /** Returns the year of the local machine time or in utc.
  @returns a number representing the datetime's year */
  readonly year: number;
}
/** Metadata of a bucket object. */
export interface ObjectMetadata {
  /** The content type of the object, if it is known. */
  readonly contentType?: (string) | undefined;
  /** The time the object was last modified. */
  readonly lastModified: Datetime;
  /** The size of the object in bytes. */
  readonly size: number;
}
/** Options for `Bucket.put()`. */
export interface BucketPutOptions {
  /** The HTTP Content-Type of the object.
  @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type */
  readonly contentType: string;
}
/** Specifies the action permitted by a presigned URL for a bucket. */
export enum BucketSignedUrlAction {
  DOWNLOAD = 0,
  UPLOAD = 1,
}
/** Represents a length of time. */
export class Duration implements ILiftable {
  /** Return the total number of days in this Duration.
  @returns the value of this `Duration` expressed in Days. */
  readonly days: number;
  /** Return the total number of hours in this Duration.
  @returns the value of this `Duration` expressed in Hours. */
  readonly hours: number;
  /** Return the total number of milliseconds in this Duration.
  @returns the value of this `Duration` expressed in Milliseconds. */
  readonly milliseconds: number;
  /** Return the total number of minutes in this Duration.
  @returns the value of this `Duration` expressed in Minutes. */
  readonly minutes: number;
  /** Return the total number of months in this Duration.
  @returns the value of this `Duration` expressed in Months. */
  readonly months: number;
  /** Return the total number of seconds in this Duration.
  @returns the value of this `Duration` expressed in Seconds. */
  readonly seconds: number;
  /** Return the total number of years in this Duration.
  @returns the value of this `Duration` expressed in Years. */
  readonly years: number;
}
/** Options for `Bucket.signedUrl()`. */
export interface BucketSignedUrlOptions {
  /** The action allowed by the signed URL. */
  readonly action?: (BucketSignedUrlAction) | undefined;
  /** The duration for the signed URL to expire. */
  readonly duration?: (Duration) | undefined;
}
/** Options for `Bucket.tryGet()`. */
export interface BucketTryGetOptions {
  /** The ending byte to read up to (including). */
  readonly endByte?: (number) | undefined;
  /** The starting byte to read from. */
  readonly startByte?: (number) | undefined;
}
/** A cloud object store. */
export class Bucket$Inflight extends Resource$Inflight {
  /** Copy an object to a new location in the bucket.
  If the destination object
  already exists, it will be overwritten. */
  readonly copy: (srcKey: string, dstKey: string) => Promise<void>;
  /** Delete an existing object using a key from the bucket. */
  readonly delete: (key: string, opts?: (BucketDeleteOptions) | undefined) => Promise<void>;
  /** Check if an object exists in the bucket. */
  readonly exists: (key: string) => Promise<boolean>;
  /** Retrieve an object from the bucket.
  If the bytes returned are not a valid UTF-8 string, an error is thrown. */
  readonly get: (key: string, options?: (BucketGetOptions) | undefined) => Promise<string>;
  /** Retrieve a Json object from the bucket. */
  readonly getJson: (key: string) => Promise<Readonly<any>>;
  /** Retrieve existing objects keys from the bucket.
  @returns a list of keys or an empty array if the bucket is empty. */
  readonly list: (prefix?: (string) | undefined) => Promise<(readonly (string)[])>;
  /** Get the metadata of an object in the bucket. */
  readonly metadata: (key: string) => Promise<ObjectMetadata>;
  /** Returns a url to the given file. */
  readonly publicUrl: (key: string) => Promise<string>;
  /** Put an object in the bucket. */
  readonly put: (key: string, body: string, options?: (BucketPutOptions) | undefined) => Promise<void>;
  /** Put a Json object in the bucket. */
  readonly putJson: (key: string, body: Readonly<any>) => Promise<void>;
  /** Move an object to a new location in the bucket.
  If the destination object
  already exists, it will be overwritten. Returns once the renaming is finished. */
  readonly rename: (srcKey: string, dstKey: string) => Promise<void>;
  /** Returns a signed url to the given file.
  @returns A string representing the signed url of the object which can be used to download in any downstream system */
  readonly signedUrl: (key: string, options?: (BucketSignedUrlOptions) | undefined) => Promise<string>;
  /** Delete an object from the bucket if it exists.
  @returns the result of the delete operation */
  readonly tryDelete: (key: string) => Promise<boolean>;
  /** Get an object from the bucket if it exists If the bytes returned are not a valid UTF-8 string, an error is thrown.
  @returns the contents of the object as a string if it exists, nil otherwise */
  readonly tryGet: (key: string, options?: (BucketTryGetOptions) | undefined) => Promise<(string) | undefined>;
  /** Gets an object from the bucket if it exists, parsing it as Json.
  @returns the contents of the object as Json if it exists, nil otherwise */
  readonly tryGetJson: (key: string) => Promise<(Readonly<any>) | undefined>;
}
export class Output$Inflight {
  readonly $inflight_init: (b: Bucket$Inflight) => Promise<Output$Inflight>;
}