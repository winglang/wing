bring cloud;
bring "constructs" as cx;
bring "@cdktf/provider-aws" as aws;

class WingResource {
  new() {
    log("my id is {nodeof(this).id}");
  }
}

let getPath = (c: cx.Construct): str => {
  return nodeof(c).path;
};

let getDisplayName = (r: std.Resource): str? => {
  return nodeof(r).title;
};

let q = new aws.sqsQueue.SqsQueue();
let wr = new WingResource();
let another_resource: std.Resource = wr;

log("path of sqs.queue: {getPath(q)}");
log("path of wing resource: {getPath(wr)}");

let title = getDisplayName(wr) ?? "no display name";
log("display name of wing resource: {title}");

log(cx.Node.of(wr).path);
