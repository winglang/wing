import * as pathext from "path";
import { Code, InflightClient } from "../core";


export class File {

  /**
   * @internal
  */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }

  public static getExtension(fileName: string): string {
    return pathext.extname(fileName).toLowerCase();
  }

  public static getFileEncoding(fileName: string): "base64" | "utf8" {
    const type = this.getExtension(fileName);
    switch (type) {
      case ".txt":
      case ".json":
      case ".js":
      case ".html":
      case ".css":
      case ".md": {
        return "utf8";
      }
      default: {
        return "base64";
      }
    }
  }
}
