# [resource.test.w](../../../../../../examples/tests/sdk_tests/resource/resource.test.w) | compile | tf-aws

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
      "CloudCounter": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/CloudCounter/Default",
            "uniqueId": "CloudCounter"
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
        "name": "wing-counter-CloudCounter-c82449bc"
      }
    }
  }
}
```

