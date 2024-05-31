bring cloud;
bring ex;
bring ui;
bring math;

// @see https://github.com/winglang/wing/issues/4237 it crashes the Console preview env.
//let secret = new cloud.Secret(name: "my-secret");

let bucket = new cloud.Bucket();
let queue = new cloud.Queue();
let api = new cloud.Api();
let counter = new cloud.Counter(initial: 0);

class myBucket {
  b: cloud.Bucket;
  new() {
    this.b = new cloud.Bucket();
    new ui.FileBrowser("File Browser",
      {
        put: inflight (fileName: str, fileContent:str) => {
          this.b.put(fileName, fileContent);
        },
        delete: inflight (fileName: str) => {
          this.b.delete(fileName);
        },
        get: inflight (fileName: str) => {
          return this.b.get(fileName);
        },
        list: inflight () => {return this.b.list();},
      }
    );

    new cloud.Service(
      inflight () => {
        this.b.put("hello.txt", "Hello, GET!");
        return inflight () => {
        };
      },
    );
  }
  pub inflight put(key: str, value: str) {
    this.b.put(key, value);
  }
}

let myB = new myBucket() as "MyUIComponentBucket";

class MyGraph {
  g: ui.Graph;
  new() {
    this.g = new ui.Graph("MyGraph", inflight () => {
      return [
        { timestamp: datetime.fromIso("2024-05-31T13:15:50.903Z"), value: 5 },
        { timestamp: datetime.fromIso("2024-05-31T13:15:51.903Z"), value: 6 },
        { timestamp: datetime.fromIso("2024-05-31T13:15:52.903Z"), value: 4 },
        { timestamp: datetime.fromIso("2024-05-31T13:15:53.903Z"), value: 9 },
        { timestamp: datetime.fromIso("2024-05-31T13:15:55.903Z"), value: 6 },
        { timestamp: datetime.fromIso("2024-05-31T13:15:56.903Z"), value: 4 },
      ];
    }, graphType: "scatter");
  }
}
let myG = new MyGraph() as "MyUIComponentGraph";

new cloud.Function(inflight () => {
  if math.random() > 0.5 {
    throw "oh no!";
  }
}) as "MyFunction";
