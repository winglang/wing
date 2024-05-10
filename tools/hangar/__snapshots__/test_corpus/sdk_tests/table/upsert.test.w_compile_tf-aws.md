# [upsert.test.w](../../../../../../tests/sdk_tests/table/upsert.test.w) | compile | tf-aws

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
      "Table_DynamodbTableItem-luigi_46B8F6CB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/Table/DynamodbTableItem-luigi",
            "uniqueId": "Table_DynamodbTableItem-luigi_46B8F6CB"
          }
        },
        "hash_key": "${aws_dynamodb_table.Table.hash_key}",
        "item": "{\"name\":{\"S\":\"luigi\"},\"gender\":{\"S\":\"male\"},\"role\":{\"S\":\"plumber\"}}",
        "table_name": "${aws_dynamodb_table.Table.name}"
      },
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
      }
    }
  }
}
```

