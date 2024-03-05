# [aws-dynamodb.test.w](../../../../../../examples/tests/sdk_tests/dynamodb-table/aws-dynamodb.test.w) | compile | tf-aws

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
      "aws-wing-dynamodb": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-dynamodb/Default",
            "uniqueId": "aws-wing-dynamodb"
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
        "name": "test1aws-wing-dynamodb-c8eda51e",
        "range_key": "k2"
      }
    }
  }
}
```

