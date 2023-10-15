bring cloud;
class NewsResource {
    init() {
        std.Node.of(this).meta.addLink("https://www.ynet.co.il", "ynet");
        let website = new cloud.Website(path:"./public");
        std.Node.of(this).meta.addLink("${website.url}", "website");
    }
}

let news = new NewsResource() as "news resource";

let b = new cloud.Bucket();
let q = new cloud.Queue();

let handler = inflight (message: str): str => {
  b.put("hello.txt", "Hello, ${message}!");
  log("Hello, ${message}!");
  return message;
};

q.setConsumer(handler);

