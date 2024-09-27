# [init.test.w](../../../../../../tests/sdk_tests/schedule/init.test.w) | compile | tf-aws

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
    "aws_cloudwatch_event_rule": {
      "s0_Schedule_7FE1E150": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/s0/Schedule",
            "uniqueId": "s0_Schedule_7FE1E150"
          }
        },
        "schedule_expression": "rate(5 minutes)"
      }
    }
  }
}
```

