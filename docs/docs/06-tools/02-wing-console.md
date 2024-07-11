---
title: Wing Console
id: wing-console
description: A web application that provides a developer-friendly interface for viewing, exploring, and interacting Wing applications running on the local cloud simulator
keywords: [Wing Console, console, local simulator, local machine, wing it]
---

## Overview

The Wing Console is a web application that offers a user-friendly interface designed to enhance the developer experience when viewing, exploring, and interacting with Wing applications running on the local cloud simulator.

With a primary focus on developer experience, the Console aims to provide instant feedback to developers during the cloud application development process.

Unlike traditional cloud development iterations that involve time-consuming deployments to the cloud, Wing and the Wing Console streamline this process, enabling cloud developers to swiftly receive immediate feedback on code changes directly on their local machines.

![The Wing Console](console-demo-1.png 'Wing Console')

## Installation

The Wing Console is installed as part of the [Wing CLI installation](../01-start-here/02-getting-started.md).

## View And Explore your Wing application 
The Console offers two primary views to provide a comprehensive understanding of your Wing application: the Explorer view and the Map view.

### Explorer view

The left side of the Console features the **Explorer** view, displaying the hierarchical structure of resources within your application.

![The Wing Console Explorer view](console-explorer-1.png 'Wing Console Explorer')

### Map view

Positioned at the center is the **Application Map** view, presenting an overview of the resources in your 
application along with their relations with each other.

![The Wing Console Map view](console-map-1.png 'Wing Console Map')

## Interact with your Wing application
The Console provides seamless interaction with your Wing application resources, right within the Console interface itself.

When you click on a resource in either the Explorer or Map view, the resource interaction panel on the right 
side of the Console will automatically update. This panel enables you to conveniently interact with the selected resource.

From there, you can perform various actions such as sending messages to queues, downloading files from buckets, making API requests to your API resource, and more.

![The Wing Console Interaction view](console-interaction-1.png 'Wing Console Interaction')

## Exposing endpoints with Wing tunnels

The console gives you the ability to create a secure (https) tunnel to expose your API to the internet.  

<iframe width="460" height="315" src="https://www.youtube.com/embed/6y47uQXjg2s?si=lNNzZcr3clzIBinc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

During development tunnels can be helpful to help with integration testing (e.g webhook testing).

Creating a tunnel will provide you with a secure wingcloud endpoint URL (e.g https://{ID}.endpoints.wingcloud.dev/).

:::warning
  Creating a tunnel exposes your API to the internet and may be a security risk. 
:::

### Creating a Wing tunnel

1. Click on the **Expose** button next to the API route (can take a few seconds).
1. Once the tunnel has been created, click on the **link** to view the tunnel URL.
    - URL will look https://{RANDOM_ID}.endpoints.wingcloud.dev/

![The Wing Console tunnel creation](console-open-tunnel.png 'Open Wing Console tunnel')

### Closing a tunnel

1. Click on the **Close** button next to the API route (can take a few seconds).
1. Verify your tunnel is closed. Click on the **link** to view the tunnel URL.

![The Wing Console tunnel closing](console-close-tunnel.png 'Close Wing Console tunnel')

:::tip Tunnels will automatically close when wing console stops
**Tunnels will be closed automatically when you stop the Wing console**. 

Tunnels will automatically be open when you start your Wing console if they were previously left open.
:::

## Run Tests

The Console enables you to run the tests you wrote for your Wing application and view the results of these tests in real-time.

![The Wing Console Tests](console-tests-1.png 'Wing Console Tests')

## Logs

In addition to Interaction abilities, the Console includes a dedicated Logs view, designed for testing and debugging purposes. This view presents real-time logs of your application.

Any logs that you generate within your Wing Application will be automatically displayed within the Logs view, providing you with convenient monitoring of your application's behavior.

![The Wing Console Logs](console-logs-1.png 'Wing Console Logs')
