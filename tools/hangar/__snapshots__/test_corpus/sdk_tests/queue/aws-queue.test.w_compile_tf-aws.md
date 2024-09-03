# [aws-queue.test.w](../../../../../../tests/sdk_tests/queue/aws-queue.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_sqs_queue": {
      "aws-wing-queue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-queue/Default",
            "uniqueId": "aws-wing-queue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "aws-wing-queue-c87f4487",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

