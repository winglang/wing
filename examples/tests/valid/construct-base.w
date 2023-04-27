bring cloud;
// bring cloud;
bring "constructs" as cx;
bring "@cdktf/provider-aws" as aws;

class WingResource {
  init() {
    log("my id is ${this.node.id}");
  }
}

let get_path = (c: cx.Construct): str => {
  return c.node.path;
};

let get_display_name = (r: std.Resource): str? => {
  return r.display.title;
};

let q = new aws.sqsQueue.SqsQueue();
let wr = new WingResource();
let another_resource: std.Resource = wr;

log("path of sqs.queue: ${get_path(q)}");
log("path of wing resource: ${get_path(wr)}");

let title = get_display_name(wr) ?? "no display name";
log("display name of wing resource: ${title}");

//TODO: Expected type to be "IConstruct", but got "WingResource" instead
// log(cx.Node.of(wr).path);
