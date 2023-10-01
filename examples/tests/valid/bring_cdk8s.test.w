bring "cdk8s" as cdk8s;
bring "cdk8s-plus-27" as kplus;

// our cdk app
let app = new cdk8s.App();

// our kubernetes chart
let chart = new cdk8s.Chart();

let deploy = new kplus.Deployment() in chart;

// https://github.com/winglang/wing/issues/3716
deploy.addContainer({
  image: "hashicorp/http-echo",
  args: ["-text", "text"],
  portNumber: 5678
});
