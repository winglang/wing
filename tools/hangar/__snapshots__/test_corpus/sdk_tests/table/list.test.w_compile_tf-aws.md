# [list.test.w](../../../../../../examples/tests/sdk_tests/table/list.test.w) | compile | tf-aws

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
      "Table": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Table/Default",
            "uniqueId": "Table"
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
        "name": "usersTable-c89b2d37",
        "point_in_time_recovery": {
          "enabled": true
        }
      }
    }
  }
}
```

