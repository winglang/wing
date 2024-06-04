---
title: Cold Start
id: cold-start
keywords: [Lambda, API Gateway, Cold Start, Provisioned Concurrency]
---

This post demonstrates how you can leverage the Wing platform to aggregate Lambda functions, thus optimizing both costs and deployment time by using a single Lambda for multiple endpoints.

We address the issue of high costs associated with provisioned concurrency as a solution to the cold start problem.

# Understanding Cold Start

In serverless computing, AWS Lambda and API Gateway are standout services enabling developers to create and deploy scalable applications without server management. Despite their flexibility and efficiency, they face challenges, notably the "cold start" issue. This section delves into cold starts, exploring their implications for applications utilizing AWS Lambda and API Gateway.

## What is a Cold Start?

A cold start refers to the delay encountered when an AWS Lambda function is invoked after a period of inactivity, resulting in longer startup and execution times. This latency stems from AWS's resource allocation process, including initializing the runtime environment and loading the code. The impact of cold starts is more pronounced when Lambda functions are accessed via API Gateway, as any delay affects the API's overall response time.

## Provisioned Concurrency to the Rescue

AWS introduced Provisioned Concurrency, a feature that maintains a specified number of pre-initialized Lambda instances, ensuring immediate response to events. However, a key drawback is the associated cost. AWS charges for the provisioned instances, regardless of their usage, leading to potential increases in expenses if not managed judiciously. Use the [AWS Lambda calculator](https://calculator.aws/#/createCalculator/Lambda) to assess the financial implications of using Provisioned Concurrency.

Provisioning multiple Lambdas can be expensive.

## Required Provisioned Concurrency

To avoid cold starts and ensure rapid responses, configuring a single provisioned concurrency is often sufficient. However, practical scenarios might require more. Consider the following example:

```wing
bring cloud;

let api = new cloud.Api();

api.get("/", (request: cloud.ApiRequest): cloud.ApiResponse => {
    return { status: 200, body: "Hello GET" };
});
api.post("/", (request: cloud.ApiRequest): cloud.ApiResponse => {
    return { status: 200, body: "Hello POST" };
});
api.put("/", (request: cloud.ApiRequest): cloud.ApiResponse => {
    return { status: 200, body: "Hello PUT" };
});
api.delete("/", (request: cloud.ApiRequest): cloud.ApiResponse => {
    return { status: 200, body: "Hello DELETE" };
});
```

In this simplistic example, the presence of four Lambdas necessitates a provisioned concurrency for each to eliminate cold starts.

### Wing Platform to Consolidate Lambdas

(Work in progress - add reference to the Lambda consolidation platform.)
