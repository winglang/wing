# User Story 14 - Task List with Json and duration

> **Status**: Expected released on 2023/03/02



```ts (wing)
bring cloud;
bring "@cdktf/provider-aws" as aws;


resource DynamodbTable {
  _table: aws.dynamodbTable.DynamodbTable;
      
  init() {
      
    // define a DynamoDB through a CDKtf L1 construct.
    this._table = new aws.dynamodbTable.DynamodbTable(
      name: "GameScores",
      billing_mode: "PAY_PER_REQUEST",
      hash_key: "TaskId",
      attribute: [{ name: "TaskId", type: "S" }]
    );    
  }
}

new DynamodbTable();
```
