# [global-secondary-index.test.w](../../../../../../examples/tests/sdk_tests/dynamodb-table/global-secondary-index.test.w) | compile | tf-aws

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
      "blog2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/blog2/Default",
            "uniqueId": "blog2"
          }
        },
        "attribute": [
          {
            "name": "type",
            "type": "S"
          },
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "global_secondary_index": [
          {
            "hash_key": "type",
            "name": "TypeIndex",
            "projection_type": "ALL"
          }
        ],
        "hash_key": "type",
        "name": "blog2blog2-c861757e",
        "range_key": "id"
      },
      "exDynamodbTable": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/ex.DynamodbTable/Default",
            "uniqueId": "exDynamodbTable"
          }
        },
        "attribute": [
          {
            "name": "type",
            "type": "S"
          },
          {
            "name": "id",
            "type": "S"
          },
          {
            "name": "createdAt",
            "type": "N"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "global_secondary_index": [
          {
            "hash_key": "type",
            "name": "CreatedAtIndex",
            "projection_type": "ALL",
            "range_key": "createdAt"
          }
        ],
        "hash_key": "type",
        "name": "blogex.DynamodbTable-c8d9b5e7",
        "range_key": "id"
      }
    }
  }
}
```

