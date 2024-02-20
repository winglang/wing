# [add_row.test.w](../../../../../../examples/tests/sdk_tests/table/add_row.test.w) | compile | tf-aws

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
      "exTable": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Table/Default",
            "uniqueId": "exTable"
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
        "name": "usersex.Table-c840a49c",
        "point_in_time_recovery": {
          "enabled": true
        }
      }
    },
    "aws_dynamodb_table_item": {
      "exTable_DynamodbTableItem-mario_1CD163AB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Table/DynamodbTableItem-mario",
            "uniqueId": "exTable_DynamodbTableItem-mario_1CD163AB"
          }
        },
        "hash_key": "${aws_dynamodb_table.exTable.hash_key}",
        "item": "{\"name\":{\"S\":\"mario\"},\"gender\":{\"S\":\"male\"},\"role\":{\"S\":\"plumber\"}}",
        "table_name": "${aws_dynamodb_table.exTable.name}"
      },
      "exTable_DynamodbTableItem-peach_C3D57BF1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Table/DynamodbTableItem-peach",
            "uniqueId": "exTable_DynamodbTableItem-peach_C3D57BF1"
          }
        },
        "hash_key": "${aws_dynamodb_table.exTable.hash_key}",
        "item": "{\"name\":{\"S\":\"peach\"},\"gender\":{\"S\":\"female\"},\"role\":{\"S\":\"princess\"}}",
        "table_name": "${aws_dynamodb_table.exTable.name}"
      }
    }
  }
}
```

