bring ex;
bring util;

let table = new ex.Table(
    name: "users",
    primaryKey: "name", 
    columns: { 
      "gender" => ex.ColumnType.STRING,
      "role" => ex.ColumnType.STRING 
    }
);
