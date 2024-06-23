bring "aws-cdk-lib" as cdk;

class CdkDockerImageFunction {
    function:  cdk.aws_lambda.DockerImageFunction;

    new() {
      let eventBridge = new cdk.aws_events.EventBus(eventBusName: "test") as "EventBridge";
      let rule = new cdk.aws_events.CfnRule(
        name: "test",
        eventBusName: eventBridge.eventBusName,
        eventPattern: {},
        targets: [{
          arn: "",
          id: "",
        }],
      );
      new cdk.aws_events.Rule(eventPattern: {
        detailType: [""],
      });

      this.function = new cdk.aws_lambda.DockerImageFunction({
        code: cdk.aws_lambda.DockerImageCode.fromImageAsset("./test.ts"),
      }) as "DockerImageFunction";
    }
}

// Test creating an `App` construct
new cdk.App();
