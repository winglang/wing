---
title: "#1333 Cloud Stream Spec"
description: RFC - Cloud.Stream for Streaming Data Services
---

# #1333 - Cloud Stream Spec

- **Author(s):**: @5herlocked
- **Submission Date**: {2023-09-29}
- **Stage**: {Design}
- **Stage Date**: {2023-09-29}

> One sentence which is a brief description of the feature from a user perspective.

Implementing design and library spec supporting and integrating real-time streaming services.

## Background

Typically streaming data services form an integral backbone of high throughput systems. Specific scenarios where Data Streams are used are:
* Real-time analytics - Analyzing real-time data from sensors, applications, social media etc. to gain instant insights.
* Monitoring - Tracking performance metrics of infrastructure and applications in real-time to identify issues.
* Messaging - High throughput order-agnostic messaging between applications and services.
* ETL - Streaming ETL workflows for real-time data integration.
* Fast Data - Applying complex analytics and machine learning on streaming data for low latency inference.
* User Engagement - Analyzing user actions and behavior as they occur to provide personalized and real-time recommendations.
* IoT - Collecting and processing telemetry streams from IoT devices.
* Gaming - Processing real-time game data streams for features like leaderboards or in-game alerts.
* Financial Services - Performing real-time analytics and complex event processing on financial data feeds.
* E-Commerce - Real-time monitoring of buying behaviour, stock levels, logistics data to enable instant actions.

This is implemented across varied cloud providers, specifically services like: AWS Kinesis Data Streams, Google Cloud Pub/Sub, Azure Event Hubs and in open source solutions like Apache Kafka, Apache Pulsar, etc.

## Design

Traditionally, a device/user writing to a real-time streaming system would simply write to the REST API endpoint exposed by the service. While consumers of the service have to 

Within wing, these endpoints and their nuance should be abstracted, so writing to or reading from a streaming system is just like writing to or reading from any persistent storage.

For example:

Writing to a data stream from a function should look like:
```ts
bring cloud;

let stream = new cloud.Stream(
    horizon: 48h
) as "TelemetryIngest";


let bloc = new cloud.Function(inflight (event: any): any => {
    stream.send(event);

    let eventSize = event.count;
    return argsCount % 2;
}) as "TelemetryWriter";
```

While reading from a stream will look like:
```ts
bring cloud;

let stream = new cloud.Stream(
    horizon: 48h
) as "TelemetryIngest";

let bloc = new cloud.Function(inflight (event: Json)=> {
    let newestBatch = stream.fetch();

    let batchSize = newestBatch.size();
    return batchSize;
}) as "telemetry-reader";
```

Reading from the stream should also be possible through an `onEvent` function which sets up an event trigger to read all 
events from the stream:

```ts
bring cloud;

let stream = new cloud.Stream(
  horizon: 48h
) as "TelemetryIngest";

stream.onEvent(inflight (event: Json) => {
  /**
   * data returned by stream has some common information
   * Other data is as the user sets it.
   */
  
  return event.body;
  
}) as "ReadAll";

```

## Requirements

### Functional

- Stream-01 (P0): Create a Streaming Data Endpoint in the cloud of your choice
- Stream-02 (P1): Read, write APIs to transparently expose the underlying endpoint
- Stream-06 (P2): Implicit integration with Stream Aggregration services

### Non-Functional

- Stream-03 (P2): Deterministic reads from the underlying service
- Stream-04 (P2): Implicit checkpointing system for downstream consumers
- Stream-05 (P1): Batch Reads and Writes for buffering and non-realtime sensitive data

## Implementation

<!--
    This section has a list of topics related to the implementation. We have some examples/ideas for topics below. Feel free to add as needed

    The goal of this section is to help decide if this RFC should be implemented.
    It should include answers to questions that the team is likely ask.
    Contrary to the rest of the RFC, answers should be written "from the present" and likely
    discuss approach, implementation plans, alternative considered and other considerations that will
    help decide if this RFC should be implemented.
-->

### Why are we doing this?

> What is the motivation for this change?
Streaming data services allow real-time processing of continuously generated high-velocity data to enable instant analytics and insights. They provide dynamic scaling, fault tolerance and distributed processing leveraging cheap commodity infrastructure to match the demands of cloud architectures. The cloud-native support, pay-per-use pricing, and integration capabilities make streaming a natural fit for building scalable, reliable and low-latency systems in the cloud.

### What is the technical solution (design) of this feature?

> Briefly describe the high-level design approach for implementing this feature.
>
> As appropriate, you can add an appendix with a more detailed design document.
>
> This is a good place to reference a prototype or proof of concept, which is highly recommended for most RFCs.

### Is this a breaking change?
No. It's a new feature, will not break a pre-existing deployment of wing.

### What is the high-level project plan?

> Describe your plan on how to deliver this feature from prototyping to GA. Especially think about how to "bake" it in the open and get constant feedback from users before you stabilize the APIs.
>
> If you have a project board with your implementation plan, this is a good place to link to it.

### Are there any open issues that need to be addressed later?

> Describe any major open issues that this RFC did not take into account. Once the RFC is approved, create GitHub issues for these issues and update this RFC of the project board with these issue IDs.

## Appendix

Real-time streaming services are often a combination of services that cover the following processes (in order of provider: AWS, GCP, Azure):
* Ingest - Kinesis Data Streams, Pub/Sub, Event Hubs
* Analysis - Kinesis Data Analytics, BigQuery, Stream Analytics
* Delivery - Kinesis Firehose, Cloud Storage, Functions 
* Storage - Data Lakes/Lake Formation/S3, Cloud Storage, Blob Storage