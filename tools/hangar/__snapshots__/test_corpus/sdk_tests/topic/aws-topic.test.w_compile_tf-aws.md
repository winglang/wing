# [aws-topic.test.w](../../../../../../examples/tests/sdk_tests/topic/aws-topic.test.w) | compile | tf-aws

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
    "aws_sns_topic": {
      "aws-wing-topic": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-topic/Default",
            "uniqueId": "aws-wing-topic"
          }
        },
        "name": "aws-wing-topic-c89ce2b1"
      }
    }
  }
}
```

