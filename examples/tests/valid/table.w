bring cloud;

let t = new cloud.Table(cloud.TableProps{
  name: "simple-table",
  primary_key: "id",
  columns: {
    id: cloud.ColumnType.STRING,
    name: cloud.ColumnType.STRING,
    age: cloud.ColumnType.NUMBER,
  }
});