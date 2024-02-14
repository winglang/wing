# [aws-counter.test.w](../../../../../../examples/tests/sdk_tests/counter/aws-counter.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {}
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "aws-wing-counter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-counter/Default",
            "uniqueId": "aws-wing-counter"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-aws-wing-counter-c86dc608"
      }
    }
  }
}
```

