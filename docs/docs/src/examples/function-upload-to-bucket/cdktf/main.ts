import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { AwsProvider, S3Bucket, IamRole, IamRolePolicy, LambdaFunction } from '@cdktf/provider-aws';
import { Asset } from 'cdktf/lib';
import * as path from 'path';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AwsProvider(this, 'aws', {
      region: 'us-west-2',
    });

    const bucket = new S3Bucket(this, 'MyBucket', {
      acl: 'private',
    });

    const lambdaRole = new IamRole(this, 'LambdaRole', {
      assumeRolePolicy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'sts:AssumeRole',
            Effect: 'Allow',
            Principal: {
              Service: 'lambda.amazonaws.com',
            },
          },
        ],
      }),
    });

    new IamRolePolicy(this, 'LambdaPolicy', {
      name: 'lambdaPolicy',
      role: lambdaRole.id,
      policy: JSON.stringify({
        Version: '2012-10-17',
        Statement: [
          {
            Action: ['logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents'],
            Effect: 'Allow',
            Resource: 'arn:aws:logs:*:*:*',
          },
          {
            Action: ['s3:PutObject'],
            Effect: 'Allow',
            Resource: `${bucket.arn}/*`,
          },
        ],
      }),
    });

    const asset = new Asset(this, 'LambdaAsset', {
      path: path.join(__dirname, 'path/to/your/index.js'),
    });

    new LambdaFunction(this, 'UploadFunction', {
      functionName: 'UploadHelloTxt',
      handler: 'index.handler',
      runtime: 'nodejs14.x',
      role: lambdaRole.arn,
      s3Bucket: asset.bucket.bucket,
      s3Key: asset.objectKey,
      environment: [
        {
          name: 'BUCKET_NAME',
          value: bucket.bucket,
        },
      ],
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-lambda-upload');
app.synth();
