# [dec.test.w](../../../../../../examples/tests/sdk_tests/counter/dec.test.w) | compile | tf-aws

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
      "counter1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counter1/Default",
            "uniqueId": "counter1"
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
        "name": "wing-counter-counter1-c8e8f5f5"
      },
      "counter2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/counter2/Default",
            "uniqueId": "counter2"
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
        "name": "wing-counter-counter2-c863f110"
      }
    }
  }
}
```

