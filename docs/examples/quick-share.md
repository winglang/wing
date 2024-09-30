---
title: "QuickShare: Demo application built with Wing"
subtitle: "A demo application showcasing cloud resources with a frontend application"
type: 
  - "pattern"
platform:
  - "awscdk"
  - "tf-aws"
  - "sim"
language:
  - "wing"
githubURL: "https://github.com/winglang/website-with-file-uploader"
repoDirectory: "/"
coverImage: "/img/examples/quickshare.png"
coverImageInPage: true
resources:
  - label: "Deploy your own version of this application"
    href: "https://github.com/winglang/website-with-file-uploader"
authors:
  - name: "David Boyne"
    role: "Developer Advocate, Wing"
    twitter: "https://twitter.com/boyney123"
    github: "https://github.com/boyney123"
cloudResources:
  - api
---

This demo application shows how you can write Wing applications with cloud primitives and custom abstractions into services, routes and listening to database changes.

To use the application

- Make sure you have Wing installed and clone the repo.
- Run `wing it` in the `backend` project directory
- The wing console will load in your browser. 
- Go to http://localhost:5173/ to load the Vite application.
- Click `Create Magical Space`
- Add email address and files into the application.
- Click `Share with Friends` to send emails to your selected friends.

This application consists of a collection of cloud primitives with Wing and winglibs:

- [Cloud API](https://www.winglang.io/docs/api/standard-library/cloud/api) - API for the frontend to add/edit and delete friends/spaces.
- [Cloud functions](https://www.winglang.io/docs/api/standard-library/cloud/function) - Compute to process API requests, queues and database changes.
- [Queues](https://www.winglang.io/docs/api/standard-library/cloud/queue) - To handle sending the email, configured DLQ on the queue
- [winglib DynamoDB](https://www.winglang.io/docs/winglibs/dynamodb) - Single table design to store friends and spaces into the database.
- [winglib email](https://www.winglang.io/docs/winglibs/email) - To send emails to friends.  