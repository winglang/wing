bring "aws-cdk-lib" as awscdk;

class CdkDockerImageFunction {
    function:  awscdk.aws_lambda.DockerImageFunction;

    init() {
        this.function = new awscdk.aws_lambda.DockerImageFunction(awscdk.aws_lambda.DockerImageFunctionProps{
            code: awscdk.aws_lambda.DockerImageCode.fromImageAsset("./test.ts"),
        }) as "DockerImageFunction";
    }
}