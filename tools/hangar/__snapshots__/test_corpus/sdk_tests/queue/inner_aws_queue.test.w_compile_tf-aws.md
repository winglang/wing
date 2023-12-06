# [inner_aws_queue.test.w](../../../../../../examples/tests/sdk_tests/queue/inner_aws_queue.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_IDENTIFIERS": {
      "value": "[]"
    }
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

