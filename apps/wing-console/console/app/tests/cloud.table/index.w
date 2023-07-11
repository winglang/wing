bring ex;

let table = new ex.Table(ex.TableProps{
  name: "table",
  primaryKey: "id",
  columns: {
    "id" => ex.ColumnType.STRING,
    "name" => ex.ColumnType.STRING,
    "date" => ex.ColumnType.DATE,
    "active" => ex.ColumnType.BOOLEAN,
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
