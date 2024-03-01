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
    },
    "aws_dynamodb_table_item": {
      "Table_DynamodbTableItem-mario_6E16BC1F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Table/DynamodbTableItem-mario",
            "uniqueId": "Table_DynamodbTableItem-mario_6E16BC1F"
          }
        },
        "hash_key": "${aws_dynamodb_table.Table.hash_key}",
        "item": "{\"name\":{\"S\":\"mario\"},\"gender\":{\"S\":\"male\"},\"role\":{\"S\":\"plumber\"}}",
        "table_name": "${aws_dynamodb_table.Table.name}"
      },
      "Table_DynamodbTableItem-peach_FD7A7AE1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Table/DynamodbTableItem-peach",
            "uniqueId": "Table_DynamodbTableItem-peach_FD7A7AE1"
          }
        },
        "hash_key": "${aws_dynamodb_table.Table.hash_key}",
        "item": "{\"name\":{\"S\":\"peach\"},\"gender\":{\"S\":\"female\"},\"role\":{\"S\":\"princess\"}}",
        "table_name": "${aws_dynamodb_table.Table.name}"
      }
    }
  }
}
```

