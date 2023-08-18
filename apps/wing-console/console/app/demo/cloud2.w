
bring ex;

class DNS {
  relations: ex.Table;
  
  init() {
    this.relations = new ex.Table(ex.TableProps{
      name: "relations",
      primaryKey: "id",
      columns: {
        "origin" => ex.ColumnType.STRING,
        "destination" => ex.ColumnType.STRING,
      },
    }
      
    ) as "dns";
  }
  
  inflight add(origin: str, destination: str): void {
    let id = this.relations.list().length;
    this.relations.insert("${id}", {
      origin: origin,
      destination: destination,
    });
  }
}
