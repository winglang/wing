bring "cdk8s-plus-27" as k8s;

let deploy = new k8s.Deployment();

// https://github.com/winglang/wing/issues/3716
deploy.addContainer({
  image: "hashicorp/http-echo",
  args: ["-text", "text"],
  portNumber: 5678
});
