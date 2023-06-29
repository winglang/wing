---
title: Run locally
id: local
keywords: [Wing Local, Wing testing, Wing Console installation, Wing Console usage, Wing Console setup]
---

The Wing Console is a web application that provides a developer-friendly interface that can be used to view, explore, and interact with Wing applications running on your local machine.

## Opening your app in the console

:::info

Make sure you have [installed](./installation#wing-console) the Wing Console on your system
before getting started with this step.

:::

Use the Wing CLI to start the console with our newly created Wing source file:

```sh
wing it hello.w
```

The Wing Console will now compile hello.w source file to [the simulator target](../concepts/simulator)
and load the application. 

> The console will "hot reload" your app on each change in the source file parent directory.

In your Wing Console web application you will see the following view of you application:

![Wing Console desktop application view](./console-app.png 'Wing Console')

You are now able to run your IDE and the Wing Console side-by-side and watch how changes to your code update your application.

## The Wing Console view

In the console [map view](../tools/wing-console#view-and-explore-your-wing-application) you'll see three resources: a **Queue**, a **Function** and a **Bucket**.
The Queue and the Bucket are connected through the Function resource, which serves as a message handler and is set as the consumer for the Queue.

Click on the Queue resource and pay attention to the right hand panel. This is the [resource interaction panel](../tools/wing-console#interact-with-your-wing-application).

![Queue resource view in Wing Console](./console-queue.png 'Queue resource')

## Push a message to the Queue

On the right side interaction panel view, Type a message in the `Push Message` text area (let's say `Wing it`) and hit **Push** in order to push it to the queue.

## View the file in the Bucket

Now, click on the Bucket in the Console map view. Notice that the interaction panel has changed and now shows the Bucket's interaction view.

Check out the `wing.txt` file, click on it and see it's preview.

![Bucket resource view in Wing Console](./console-bucket-1.png 'Bucket resource')

You can also download the file, using the **download** button.

The downloaded file should contain `Hello, Wing it` text (as you already saw in the preview).

## Congrats! :clap:

You have just written and ran your first Wing program!

---

Now, after you have made sure your application works, lets deploy it to AWS.
