# Epic - Developing an External typescript based Resource locally

Dave, a full stack developer, wakes up in the middle of the night, last evening he was watching a smart, educating and funny twitch show called, "The Wingly update, name TBD" where he learned about winglang latest accomplishment -  building a simple TODO app. That TODO app hunted him, he can't get over the fact that it just ain't right to implement a TODO app only with a bucket, it is not the proper DB to be used. He sets his mind to fix this and implement the app using dynamodb. But wait, you can't just `bring cloud.dynamodb` in wing, hmm... that makes sense most cloud providers don't have dynamodb. Maybe there are external resources for this in Wing, he looks for an existing external resource for dynamodb, he can't find it. He made his mind, he opens his computer and embarks the journey of adding a new external resource to winglang, he wants to `bring dave_dynamodb`

Dave quickly skims through the language docs, dives into the contributing section where he see's a short description on what custom resources are and a link to a detailed doc that provides concrete instructions on how you add one. 

The manual doesn't focus on the publishing part of the external resource, only on how to develop one and make sure that when `bring dave_dynamodb`, the compiler will inject the right `target` implementation for both the preflight and inflight implementation. He notices that the team behind Wing are really anxious to help, beside the invite to join #contrib slack channel, the manual explains that although the code is created on Dave's own github repo, the team encourage Dave to ask for code reviews at any step of the way, or even invite team members to contribute in areas where the reader is less proficient at. Dave realize that writing a winglang resource requires different areas of expertise, you need to know how to design a good resource API, provision an AWS (or other) construct using the CDK, develop a simple simulator implementation for the resource, and, as an optional option, develop a custom simulator view for this resource (I'll use the default one, it requires a simple JSON, he thinks to himself)

The manual do encourage the reader to put special emphasis on the following items in his code:
- README.md - the resource README must include the following
  - High level documentation 
  - Concrete examples of how to use the target 
  - List Supported targets (sim, aws, gcp, azure)
  - API docs 
- LICENCE - MIT or similar 
  
Dave notice a bunch of missing parts, both publishing and testing are not covered. Winglang is very early and the team is still working out the details on what will be best to way to test and public resources, stay tuned +1 on the relevant discussions

## Example 

As suggested in the doc, Dave starts with an example on how the resource should be used. Dave implements the same TODO app, but this time with dynamodb instead of the Bucket Counter tuple 

```js
bring cloud;
bring os;
bring tfaws;
bring "@cdktf/provider-aws" as aws;
bring untyped "@aws-sdk/client-dynamodb" as ddb_sdk;

resource TaskList {
  _table: aws.dynamodb_table.DynamodbTable;
  _counter: cloud.Counter;
    
  init() {
    this._counter = new cloud.Counter();
    
    // define a DynamoDB through a CDKtf L1 construct.
    this._table = new aws.dynamodb_table.DynamodbTable(
      name: "GameScores",
      billing_mode: "PAY_PER_REQUEST",
      hash_key: "TaskId",
      attribute: [{ name: "TaskId", type: "S" }],
      lifecycle: {
        preventDestroy: true
      }
    );    
  }
  
  inflight _client: ddb.DynamoDBClient;
  
  inflight init() {
    // the inflight initializer creates an instance of the DynamoDBClient object when it is first loaded.
    this._client = new ddb_sdk.DynamoDBClient({});
  }
    
  /** 
   * Adds a task to the task list.
   * @returns The ID of the new task.
   */
  inflight add_task(title: str): str {
    let id = "${this._counter.inc()}";
    print("adding task ${id} with title: ${title}");

    // we capture "this._table.arn" which is a CDKtf attribute here
    let command = new ddb_sdk.PutItemCommand(
      TableName: this._table.arn, // !! interesting !!
      Item: {
        TaskId: { S: id },
        Title: { S: title },
      },
    );

    // there's an implicit "await" here because send is async.
    this._client.send(command);
    return id;
  }

  // TODO: this requires a design because _bind() is currently hidden
  // and implemented implicitly by the compiler for inflight methods.
  override _bind(host: Construct, methods: string[]) {
    // TODO: if "sim" then return;
    
    
    if (!(host instanceof tfaws.Function)) {
      throw new Error("can only bind to tfaws.Function");
    }
    
    if (methods.has("add_task")) {
      host.add_policy_statement(effect: "Allow", method: ["dynamodb:PutItem"], resource: [this._table.arn]);
    }
    
    return super._bind(host, methods);
  }
  
  //
  // additional methods...
  //
}
```



As you can see, Dave is able to naturally bring the `DynamodbTable` resource/construct from 
[@cdktf/provider-aws](https://www.npmjs.com/package/@cdktf/provider-aws) (which is a standard CDK JSII library)
and use it in preflight like any other Wing resource.

He was also able to bring the AWS SDK JavaScript library (`aws-sdk`) as "untyped" (because Wing still doesn't
support reading `.d.ts` files).

He rewrote the `TaskList` resource accordingly (see some annotations in the code for details on what's going on).

Alternatively:

```ts
resource TaskList {
  //...
  pub grant_write(fn: tfaws.Function) {
    fn.add_policy_statement(
      effect: "Allow", 
      method: ["dynamodb:PutItem"], 
      resource: [this._table.arn]
    );
  }
}

let task_list = new TaskList();
let fn = new tfaws.Function(inflight () => {
  task_list.add_task(...);
});

task_list.grant_write(fn);
```

## Simulator Implementation 

But when Dave compiles his code to `sim`, he gets the following error:

```sh
$ wing compile -t sim task-list.w
ERROR: unable to resolve "@cdktf/provider-aws.dynamodb_table.DynamodbTable" for the "sim" target.
You can implement a JavaScript resolver using `--resolve @cdktf/provider-aws.dynamodb_table.DynamodbTable:sim=dynamo-table-sim.js`
```

`dynamo-table-sim.js`:

```js
module.exports = {
  '@cdktf/provider-aws.dynamodb_table.DynamodbTable': (scope, id, props) => {
    return { arn: 'DUMMY_ARN' };
  },
  'ddb_sdk.DynamoDBClient': () => {
    docker.run("-p 8000:8000 amazon/dynamodb-local");
    return new ddb_sdk.DynamoDBClient({ url: "http://localhost:8000" });
  }
};
```

Dave didn't implement a perfect module, his sim implementation requires a running dynamodb instance on the machine at port 8000, if a dynamodb is not running and listening on port 8000, localhost sim app that uses this module will not work

## Prolog 

This story is completed when we have an example custom resource + all the assets and tutorials in order for a contributor to have create one

## TODO section

```js
// TODO - add the wing code with dyanmodb instead of the bucket and the counter 
// TODO - break down to tasks and to task that we should not do 
```

