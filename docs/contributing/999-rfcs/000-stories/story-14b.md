# User Story 14 - Bring CDKtf
> **Status**: Expected released on 2023/03/02

This story focuses on opening winglang to the existing terrafrom ecosystem.
This specific milestone allows you to use cdktf provider in preflight wing code. 

The following milestones will be:
- [x] bring cdktf modules
- [ ] Using `extern` keyword to actually interact with the resource in inflight
- [ ] Being able to run code that brings cdktf in the simulator 


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
