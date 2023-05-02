import { ColumnType } from "../cloud";
import { Json } from "../std";

export function validateRow(row: Json, columns: { [key: string]: ColumnType }) {
  for (const [key, value] of Object.entries(row)) {
    if (!columns.hasOwnProperty(key)) {
      throw new Error(`"${key}" is not a valid column in the table.`);
    }
    switch (columns[key]) {
      case ColumnType.STRING:
      case ColumnType.DATE:
        if (typeof value !== "string") {
          throw new Error(`"${key}" value is not a valid string.`);
        }
        break;
      case ColumnType.NUMBER:
        if (typeof value !== "number") {
          throw new Error(`"${key}" value is not a valid number.`);
        }
        break;
      case ColumnType.BOOLEAN:
        if (typeof value !== "boolean") {
          throw new Error(`"${key}" value is not a valid bool.`);
        }
        break;
      case ColumnType.JSON:
        if (typeof value !== "object") {
          throw new Error(`"${key}" value is not a valid json.`);
        }
        break;
    }
  }
}
