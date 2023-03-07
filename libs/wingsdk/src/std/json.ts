/**
 * Immutable Json
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
  public set(key: string, value: any): void {
    key;
    value;
    throw new Error("Macro");
  }

  /**
   * Set element in MutJson Array with a specific key and value
   *
   * @macro ((obj, args)) => { obj[args[0]] = args[1]; })($self$, [$args$])
   *
   * @param value The value of the element to set
   */
  public setAt(index: number, value: any): void {
    index;
    value;
    throw new Error("Macro");
  }
}
