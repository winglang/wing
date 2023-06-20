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
   * Returns the keys from the Json object.
   *
   * @macro (Object.keys($args$))
   *
   * @param json to get keys from
   * @returns the keys from the Json object as string array
   */
  public static keys(json: Json): string[] {
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
   * Deletes a key in a given Json
   *
   * @macro ((args) => { delete (args[0])[args[1]]; })([$args$])
   *
   * @param json to delete key from
   * @param key the key to delete
   */
  public static delete(json: Json, key: string): void {
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
  public static stringify(json: Json, indent?: number): string {
    json;
    indent;
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
   * @macro ((args) => { try { return JSON.parse(args); } catch (err) { return undefined; } })($args$)
   *
   * @param str to parse as Json
   * @returns Json representation of the string or undefined if string is not parsable
   */
  public static tryParse(str: string): Json | undefined {
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

  /**
   * Creates an immutable deep copy of the Json.
   *
   * @macro Object.freeze(JSON.parse(JSON.stringify($args$)))
   *
   * @param json to copy
   * @returns the immutable copy of the Json
   */
  public static deepCopy(json: MutJson): Json {
    json;
    throw new Error("Macro");
  }

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
}
