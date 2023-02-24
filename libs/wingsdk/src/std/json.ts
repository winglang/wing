import  { T1 } from "./util";

/**
 * @typeparam T1 
 */
export class Json {
  /**
   * Returns a specified element from the Json.
   * 
   * @macro ($self$)[$args$]
   * 
   * @param key The key of the element to return
   * @returns The element associated with the specified key, or undefined if the key can't be found
   */
  public get(key: string): T1 {
    key;
    throw new Error("Macro");
  }
}

/**
 * @typeparam T1
 */
export class MutJson extends Json {
  /**
   * Adds or updates an element in MutJson with a specific key and value
   * 
   * @macro ((obj, args) => { obj[args[0]] = args[1]; })($self$, [$args$])
   * 
   * @param key The key of the element to add
   * @param value The value of the element to add
   */
  public set(key: string, value: T1): void {
    key;
    value;
    throw new Error("Macro")
  }
}