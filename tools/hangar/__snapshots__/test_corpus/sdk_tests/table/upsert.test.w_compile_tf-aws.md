# [upsert.test.w](../../../../../../examples/tests/sdk_tests/table/upsert.test.w) | compile | tf-aws

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
        "name": "usersex.Table-c840a49c"
      }
    },
    "aws_dynamodb_table_item": {
      "exTable_DynamodbTableItem-luigi_6628CD6F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.Table/DynamodbTableItem-luigi",
            "uniqueId": "exTable_DynamodbTableItem-luigi_6628CD6F"
          }
        },
        "hash_key": "${aws_dynamodb_table.exTable.hash_key}",
        "item": "{\"name\":{\"S\":\"luigi\"},\"gender\":{\"S\":\"male\"},\"role\":{\"S\":\"plumber\"}}",
        "table_name": "${aws_dynamodb_table.exTable.name}"
      },
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
      }
    }
  }
}
```

