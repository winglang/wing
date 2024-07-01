bring ex;

let t = new ex.Table(
  name: "simple-table",
  primaryKey: "id",
  columns: {
    "id" => ex.ColumnType.STRING,
    "name" => ex.ColumnType.STRING,
    "age" => ex.ColumnType.NUMBER,
  }
);