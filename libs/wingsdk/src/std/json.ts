import { Code, InflightClient } from "../core";

/**
 * Immutable Json
 */
export class Json {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  /**
   * Returns the keys from the Json object.
   *
   * @macro (Object.keys($args$))
   *
   * @param json to get keys from
   * @returns the keys from the Json object as string array
   */
  public static keys(json: Json | MutJson): string[] {
    json;
    throw new Error("Macro");
  }

  /**
   * Deletes a key in a given Json
   *
   * @macro ((args) => { delete (args[0])[args[1]]; })([$args$])
   *
   * @param json to delete key from
   * @param key the key to delete
   */
  public static delete(json: MutJson, key: string): void {
    json;
    key;
    throw new Error("Macro");
  }

  /**
   * Formats Json as string
   *
   * (JSON.stringify($args$))
   *
   * @macro ((args) => { return JSON.stringify(args[0], null, args[1]) })([$args$])
   *
   * @param json to format as string
   * @returns string representation of the Json
   */
  public static stringify(json: Json | MutJson, indent?: number): string {
    json;
    indent;
    throw new Error("Macro");
  }

  /**
   * Creates an immutable deep copy of the Json.
   *
   * @macro JSON.parse(JSON.stringify($args$))
   *
   * @param json to copy
   * @returns the immutable copy of the Json
   */
  public static deepCopy(json: MutJson): Json {
    json;
    throw new Error("Macro");
  }

  /**
   * Creates a mutable deep copy of the Json.
   *
   * @macro (JSON.parse(JSON.stringify($args$)))
   *
   * @param json to copy
   * @returns the mutable copy of the Json
   */
  public static deepCopyMut(json: Json): MutJson {
    json;
    throw new Error("Macro");
  }

  /**
   * Returns the values from the Json.
   *
   * @macro (Object.values($args$))
   *
   * @param json to get values from
   * @returns the values from the Json as array of Json
   */
  public static values(json: Json): Json[] {
    json;
    throw new Error("Macro");
  }

  /**
   * Parse a string into a Json
   *
   * @macro (JSON.parse($args$))
   *
   * @param str to parse as Json
   * @returns Json representation of the string
   */
  public static parse(str: string): Json {
    str;
    throw new Error("Macro");
  }

  /**
   * Try to parse a string into a Json
   *
   * @macro ((args) => { try { return (args === undefined) ? undefined : JSON.parse(args); } catch (err) { return undefined; } })($args$)
   *
   * @param str to parse as Json
   * @returns Json representation of the string or undefined if string is not parsable
   */
  public static tryParse(str?: string): Json | undefined {
    str;
    throw new Error("Macro");
  }

  /**
   * Checks if a Json object has a given key
   *
   * @macro ((args) => { return args[0].hasOwnProperty(args[1]); })([$args$])
   *
   * @param json The json object to inspect
   * @param key The key to check
   * @returns Boolean value corresponding to whether the key exists
   */
  public static has(json: Json, key: string): boolean {
    json;
    key;
    throw new Error("Macro");
  }

  private constructor() {}

  /**
   * Returns a specified element from the Json.
   *
   * @macro ($self$)[$args$]
   *
   * @param key The key of the element to return
   * @returns The element associated with the specified key, or undefined if the key can't be found
   */
  public get(key: string): Json {
    key;
    throw new Error("Macro");
  }

  /**
   * Returns a specified element at a given index from Json Array
   *
   * @macro ($self$)[$args$]
   *
   * @param index The index of the element in the Json Array to return
   * @returns The element at given index in Json Array, or undefined if index is not valid
   */
  public getAt(index: number): Json {
    index;
    throw new Error("Macro");
  }

  /**
   * Optionally returns an specified element from the Json.
   *
   * @macro ($self$)?.[$args$]
   *
   * @param key The key of the element to return
   * @returns The element associated with the specified key, or undefined if the key can't be found
   */
  public tryGet(key: string): Json | undefined {
    key;
    throw new Error("Macro");
  }

  /**
   * Optionally returns a specified element at a given index from Json Array
   *
   * @macro ($self$)?.[$args$]
   *
   * @param index The index of the element in the Json Array to return
   * @returns The element at given index in Json Array, or undefined if index is not valid
   */
  public tryGetAt(index: number): Json | undefined {
    index;
    throw new Error("Macro");
  }

  /**
   * Convert Json element to string if possible.
   *
   * @macro ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })($self$)
   *
   * @returns a string.
   */
  public asStr(): string {
    throw new Error("Macro");
  }

  /**
   * Convert Json element to string if possible.
   *
   * @macro ((arg) => { return (typeof arg === "string") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
   *
   * @returns a string.
   */
  public tryAsStr(): string | undefined {
    throw new Error("Macro");
  }

  /**
   * Convert Json element to number if possible.
   *
   * @macro ((arg) => { if (typeof arg !== "number") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a number")}; return JSON.parse(JSON.stringify(arg)) })($self$)
   *
   * @returns a number.
   */
  public asNum(): number {
    throw new Error("Macro");
  }

  /**
   * Convert Json element to number if possible.
   *
   * @macro ((arg) => { return (typeof arg === "number") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
   *
   * @returns a number.
   */
  public tryAsNum(): number | undefined {
    throw new Error("Macro");
  }

  /**
   * Convert Json element to boolean if possible.
   *
   * @macro ((arg) => { if (typeof arg !== "boolean") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a boolean")}; return JSON.parse(JSON.stringify(arg)) })($self$)
   *
   * @returns a boolean.
   */
  public asBool(): boolean {
    throw new Error("Macro");
  }

  /**
   * Convert Json element to boolean if possible.
   *
   * @macro ((arg) => { return (typeof arg === "boolean") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
   *
   * @returns a boolean.
   */
  public tryAsBool(): boolean | undefined {
    throw new Error("Macro");
  }
}

/**
 * Mutable Json
 */
export class MutJson {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  private constructor() {}

  /**
   * Returns a specified element from the Json.
   *
   * @macro ($self$)[$args$]
   *
   * @param key The key of the element to return
   * @returns The element associated with the specified key, or undefined if the key can't be found
   */
  public get(key: string): MutJson {
    key;
    throw new Error("Macro");
  }

  /**
   * Returns a specified element at a given index from MutJson Array
   *
   * @macro ($self$)[$args$]
   *
   * @param index The index of the element in the MutJson Array to return
   * @returns The element at given index in MutJson Array, or undefined if index is not valid
   */
  public getAt(index: number): MutJson {
    index;
    throw new Error("Macro");
  }

  /**
   * Adds or updates an element in MutJson with a specific key and value
   *
   * @macro ((obj, args) => { obj[args[0]] = args[1]; })($self$, [$args$])
   *
   * @param key The key of the element to add
   * @param value The value of the element to add
   */
  public set(key: string, value: MutJson): void {
    key;
    value;
    throw new Error("Macro");
  }

  /**
   * Set element in MutJson Array with a specific key and value
   *
   * @macro ((obj, args) => { obj[args[0]] = args[1]; })($self$, [$args$])
   *
   * @param value The value of the element to set
   */
  public setAt(index: number, value: MutJson): void {
    index;
    value;
    throw new Error("Macro");
  }

  /**
   * Optionally returns an specified element from the Json.
   *
   * @macro ($self$)?.[$args$]
   *
   * @param key The key of the element to return
   * @returns The element associated with the specified key, or undefined if the key can't be found
   */
  public tryGet(key: string): MutJson | undefined {
    key;
    throw new Error("Macro");
  }

  /**
   * Optionally returns a specified element at a given index from Json Array
   *
   * @macro ($self$)?.[$args$]
   *
   * @param index The index of the element in the Json Array to return
   * @returns The element at given index in Json Array, or undefined if index is not valid
   */
  public tryGetAt(index: number): MutJson | undefined {
    index;
    throw new Error("Macro");
  }

  /**
   * Convert Json element to string if possible.
   *
   * @macro ((arg) => { if (typeof arg !== "string") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a string")}; return JSON.parse(JSON.stringify(arg)) })($self$)
   *
   * @returns a string.
   */
  public asStr(): string {
    throw new Error("Macro");
  }

  /**
   * Convert Json element to string if possible.
   *
   * @macro ((arg) => { return (typeof arg === "string") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
   *
   * @returns a string.
   */
  public tryAsStr(): string | undefined {
    throw new Error("Macro");
  }

  /**
   * Convert Json element to number if possible.
   *
   * @macro ((arg) => { if (typeof arg !== "number") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a number")}; return JSON.parse(JSON.stringify(arg)) })($self$)
   *
   * @returns a number.
   */
  public asNum(): number {
    throw new Error("Macro");
  }

  /**
   * Convert Json element to number if possible.
   *
   * @macro ((arg) => { return (typeof arg === "number") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
   *
   * @returns a number.
   */
  public tryAsNum(): number | undefined {
    throw new Error("Macro");
  }

  /**
   * Convert Json element to boolean if possible.
   *
   * @macro ((arg) => { if (typeof arg !== "boolean") {throw new Error("unable to parse " + typeof arg + " " + arg + " as a boolean")}; return JSON.parse(JSON.stringify(arg)) })($self$)
   *
   * @returns a boolean.
   */
  public asBool(): boolean {
    throw new Error("Macro");
  }

  /**
   * Convert Json element to boolean if possible.
   *
   * @macro ((arg) => { return (typeof arg === "boolean") ? JSON.parse(JSON.stringify(arg)) : undefined })($self$)
   *
   * @returns a boolean.
   */
  public tryAsBool(): boolean | undefined {
    throw new Error("Macro");
  }
}
