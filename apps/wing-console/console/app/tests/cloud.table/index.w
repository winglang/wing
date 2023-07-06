bring cloud;

let table = new cloud.Table(cloud.TableProps{
  name: "table",
  primaryKey: "id",
  columns: {
    "id" => cloud.ColumnType.STRING,
    "name" => cloud.ColumnType.STRING,
    "date" => cloud.ColumnType.DATE,
    "active" => cloud.ColumnType.BOOLEAN,
  },
  initialRows: {
    "1" => {
      id: "1",
      name: "Joe",
      date: "2020-01-01",
      active: true,
    },
  },
});
