
bring cloud;
bring ex;

class FlyIO {
  instances: ex.Table;
  
  init() {
    this.instances = new ex.Table(ex.TableProps{
      name: "instances",
      primaryKey: "id",
      columns: {
        "id" => ex.ColumnType.STRING,
        "cloneUrl" => ex.ColumnType.STRING,
        "sha" => ex.ColumnType.STRING,
        "entrypoint" => ex.ColumnType.STRING,
      },
    }
    ) as "flyio";
  }
  
  inflight create(id:str, cloneUrl: str, sha: str, entrypoint: str): str {
    let internalId = this.instances.list().length;
    this.instances.insert("${internalId}", {
      "id": id,
      "cloneUrl": cloneUrl,
      "sha": sha,
      "entrypoint": entrypoint,
    });
    return "https://${id}.fly.io";
  }
}
