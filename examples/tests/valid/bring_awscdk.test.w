bring "aws-cdk-lib" as awscdk;

class CdkDockerImageFunction {
    function:  awscdk.aws_lambda.DockerImageFunction;

    new() {
        this.function = new awscdk.aws_lambda.DockerImageFunction({
            code: awscdk.aws_lambda.DockerImageCode.fromImageAsset("./test.ts"),
        }) as "DockerImageFunction";
    }
}

// Test creating an `App` construct
new awscdk.App();
