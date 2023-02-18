const cdktf = require("cdktf");
const s3_bucket = require("@cdktf/provider-aws/lib/s3-bucket");
const s3_bucket_replication_configuration = require("@cdktf/provider-aws/lib/s3-bucket-replication-configuration");
const iam_role = require("@cdktf/provider-aws/lib/iam-role");
const iam_policy = require("@cdktf/provider-aws/lib/iam-policy");
const iam_policy_attachment = require("@cdktf/provider-aws/lib/iam-policy-attachment");
const s3_bucket_versioning = require("@cdktf/provider-aws/lib/s3-bucket-versioning");

class ReplicateS3Aspect {
  constructor() {
    this.replicaPrefix = process.env.REPLICA_PREFIX ?? "replica-"
    this.replicaStorageClass = process.env.REPLICA_STORAGE_CLASS ?? "STANDARD"
  }

  visit(node) {
    if (node instanceof s3_bucket.S3Bucket) {
      const scope = node.node.scope;
      const replicaBucket = new s3_bucket.S3Bucket(scope, `Replica${node.node.id}`, {
        bucket: `${this.replicaPrefix}${node.bucket}`
      });

      const replicaRole = new iam_role.IamRole(scope, `Replica${node.node.id}Role`, {
        name: `${this.replicaPrefix}${node.bucket.substring(-8)}`,
        assumeRolePolicy: JSON.stringify({
          Version: "2012-10-17",
          Statement: [
            {
              Action: "sts:AssumeRole",
              Principal: {
                Service: "s3.amazonaws.com"
              },
              Effect: "Allow",
              Sid: "AllowS3Replication"
            }
          ]
        })
      });

      const replicaPolicy = new iam_policy.IamPolicy(scope, `Replica${node.node.id}Policy`, {
        name: `${this.replicaPrefix}${node.bucket.substring(-8)}`,
        policy: JSON.stringify({
          Version: "2012-10-17",
            Statement: [
              {
                Action: [
                  "s3:GetReplicationConfiguration",
                  "s3:ListBucket",
                ],
                Effect: "Allow",
                Resource: [
                  node.arn,
                  `${node.arn}/*`
                ]
              },
              {
                Action: [
                  "s3:GetObjectVersionForReplication",
                  "s3:GetObjectVersionAcl",
                  "s3:GetObjectVersionTagging",
                ],
                Effect: "Allow",
                Resource: `${node.arn}/*`
              },
              {
                Action: [
                  "s3:ReplicateObject",
                  "s3:ReplicateDelete",
                  "s3:ReplicateTags",
                ],
                Effect: "Allow",
                Resource: `${replicaBucket.arn}/*`
              }
            ]
          }),
        });

        new iam_policy_attachment.IamPolicyAttachment(scope, `Replica${node.node.id}PolicyAttachment`, {
          policyArn: replicaPolicy.arn,
          name: `${this.replicaPrefix}policy-attachment${node.bucket}`,
          roles: [replicaRole.name]
        });

        const source_bucket_versioning = new s3_bucket_versioning.S3BucketVersioningA(scope, `Source${node.node.id}Versioning`, {
          bucket: node.id,
          versioningConfiguration: {
          status: "Enabled"
          }
        });

        const dest_bucket_versioning = new s3_bucket_versioning.S3BucketVersioningA(scope, `Replica${node.node.id}Versioning`, {
          bucket: replicaBucket.id,
          versioningConfiguration: {
            status: "Enabled"
          }
        });

        new s3_bucket_replication_configuration.S3BucketReplicationConfigurationA(scope, `Replica${node.node.id}Config`, {
          bucket: node.id,
          role: replicaRole.arn,
          rule: [
            {
              id: `${this.replicaPrefix}${node.bucket}`,
              destination: {
                bucket: replicaBucket.arn,
                storageClass: this.replicaStorageClass
              },
              status: "Enabled",
            }
          ],
          dependsOn: [dest_bucket_versioning, source_bucket_versioning]
        });
      }
    }
}

exports.preSynth = function (app) {
  cdktf.Aspects.of(app).add(new ReplicateS3Aspect());
};