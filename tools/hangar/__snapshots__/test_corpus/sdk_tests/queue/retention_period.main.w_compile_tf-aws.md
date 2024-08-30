# [retention_period.main.w](../../../../../../tests/sdk_tests/queue/retention_period.main.w) | compile | tf-aws

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
      "Queue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Queue/Default",
            "uniqueId": "Queue"
          }
        },
        "message_retention_seconds": 60,
        "name": "Queue-c822c726",
        "visibility_timeout_seconds": 30
      }
    }
  }
}
```

