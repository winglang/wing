import { Construct } from "constructs";
import { FileBase } from "./filebase";
import { patchObject } from "./json-patch";

/**
 * Props for `JsonFile`.
 */
export interface JsonFileProps {
  /**
   * The object that will be serialized into the file during synthesis.
   * @default - Empty object, use `addXxx()` methods to update.
   */
  readonly obj?: any;
}

/**
 * Represents a text file that should be synthesized in the app's outdir.
 */
export class JsonFile extends FileBase {
  private readonly obj: any;

  constructor(
    scope: Construct,
    id: string,
    filePath: string,
    props: JsonFileProps = {}
  ) {
    super(scope, id, filePath);

    this.obj = props.obj ?? {};
  }

  /**
   * Patches the JSON object at a certain path.
   *
   * @example
   *
   *  f.patch("foo.bar.baz", 123);
   *
   *  {
   *    "foo": {
   *      "bar": {
   *        "baz": 123
   *      }
   *    }
   *  }
   *
   * @param path The key path
   * @param value The value to add
   */
  public patch(path: string, value: any) {
    patchObject(this.obj, path, value);
  }

  protected render() {
    return JSON.stringify(this.obj, undefined, 2);
  }
}
