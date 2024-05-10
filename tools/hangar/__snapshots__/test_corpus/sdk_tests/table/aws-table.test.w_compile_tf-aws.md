# [aws-table.test.w](../../../../../../tests/sdk_tests/table/aws-table.test.w) | compile | tf-aws

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
      "aws-wing-table": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-table/Default",
            "uniqueId": "aws-wing-table"
          }
        },
        "attribute": [
          {
            "name": "name",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "name",
        "name": "usersaws-wing-table-c82a4d4a",
        "point_in_time_recovery": {
          "enabled": true
        }
      }
    }
  }
}
```

