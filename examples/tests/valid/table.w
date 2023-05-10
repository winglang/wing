bring cloud;

let t = new cloud.Table(cloud.TableProps{
  name: "simple-table",
  primaryKey: "id",
  columns: {
    id: cloud.ColumnType.STRING,
    name: cloud.ColumnType.STRING,
    age: cloud.ColumnType.NUMBER,
  }
});