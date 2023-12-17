# [query.test.w](../../../../../../examples/tests/sdk_tests/dynamodb-table/query.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.17.0"
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
      "exDynamodbTable": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.DynamodbTable/Default",
            "uniqueId": "exDynamodbTable"
          }
        },
        "attribute": [
          {
            "name": "k1",
            "type": "S"
          },
          {
            "name": "k2",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "k1",
        "name": "test1ex.DynamodbTable-c8d9b5e7",
        "range_key": "k2"
      }
    }
  }
}
```

