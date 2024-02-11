---
title: Cold Start
id: cold-start
keywords: [Lambda, API Gateway, Cold start, provisioned concurrency]
---

This post shows how you can use wing platform in order to combine lambdas together, thus saving money & deployment time using a single 
for multiple endpoints. 

We will approach this from the problem of high cost of provisioned concurrecny to solve cold start

# Understanding Cold Start

In the world of serverless computing, AWS Lambda and API Gateway 
stand out as powerful services that allow developers to build 
and deploy scalable applications without worrying about managing servers. 
However, despite their flexibility and efficiency, they are not without their challenges. 
One of the most significant issues that developers encounter with these services is the "cold start" problem. 
Let's dive into what a cold start is, why it's a problem, and its impact on applications using AWS Lambda and API Gateway.

## What is a Cold Start?

A cold start occurs when an AWS Lambda function is invoked after being idle for some time, 
causing the function to take longer to start and execute than it would if it were already running or "warm." 
This latency is due to the time it takes for AWS to allocate resources to the function, 
including initializing the runtime environment, loading the code, and executing initialization code (if any) 
before handling the request.

When AWS Lambda functions are exposed via API Gateway, the cold start latency becomes even more noticeable. 
This is because API Gateway acts as the front door for requests to Lambda functions, 
and any delay in Lambda's response time directly impacts the overall response time of the API.

## Provisioned Concurrency to the Rescue

AWS offers Provisioned Concurrency, a feature that keeps a specified number of Lambda instances warm 
and ready to respond immediately to events.

Unfortunatly, one of the most significant considerations when using Provisioned Concurrency is cost. 
AWS charges for the number of instances you provision in advance, 
regardless of whether these instances are used or not. 
This cost is in addition to the regular execution costs for Lambda functions. 
Therefore, if not carefully managed, the use of Provisioned Concurrency can lead to higher AWS bills, 
especially if the provisioned instances exceed actual demand.

You can use the following [AWS lambda calculator](https://calculator.aws/#/createCalculator/Lambda) 
to see the implications for using Provisioned Concurrency.

Once you need to provision more then one lambda, it can be pretty costly. 

## How many Provisioned concurrency are required

If you just want to prevent cold start, and react quickly to any network hitting your API Gatway. It is enought to only have just
one provisioned concurency configured. 

But in practice lets examine the following code: 
```wing
bring cloud;

let api = new cloud.Api();

api.get("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200,
      body: "Hello GET"
    };
});
api.post("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200,
      body: "Hello POST"
    };
});
api.put("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200, body:
      "Hello PUT"
    };
});
api.delete("/", inflight (request: cloud.ApiRequest): cloud.ApiResponse => {
    return cloud.ApiResponse {
      status: 200,
      body: "Hello DELETE"
    };
});
```

In this very simple code, there are four lambdas meaning that if we want no cold starts for any of these routes, 
we must configure 1 provisioned concurrency for each of them. 

### Wing Platform to consolidate Lambda's

// WIP add reference to the consolidate lambda platform
