# [wait-until.test.w](../../../../../../tests/sdk_tests/util/wait-until.test.w) | compile | tf-aws

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root"
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
      "invoke-counter1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/invoke-counter1/Default",
            "uniqueId": "invoke-counter1"
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
        "name": "wing-counter-invoke-counter1-c8df96b3"
      },
      "invoke-counter2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/invoke-counter2/Default",
            "uniqueId": "invoke-counter2"
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
        "name": "wing-counter-invoke-counter2-c8400881"
      },
      "invoke-counter3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/invoke-counter3/Default",
            "uniqueId": "invoke-counter3"
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
        "name": "wing-counter-invoke-counter3-c8668bff"
      }
    }
  }
}
```

