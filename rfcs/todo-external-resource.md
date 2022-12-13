Dave, a full stack developer, wakes up in the middle of the night, last evening he was watching a smart, educating and funny twitch show called, "The Wingly update, name TBD" where he learned about winglang latest accomplishment -  building a simple TODO app. That TODO app hunted him, he can't get over the fact that it just ain't right to implement a TODO app only with a bucket, it is not the proper DB to be used. He sets his mind to fix this and implement the app using dynamodb. But wait, you can't just `bring cloud.dynamodb` in wing, hmm... that makes sense most cloud providers don't have dynamodb. Maybe there are external resources for this in wing, he looks for an existing external resource for dynamodb, he can't find it. He made his mind, he opens his computer and embarks the journey of adding a new external resource to winglang.

Dave quickly skims through the language docs, dives into the contributing section where he see's a short description on what custom resources are and a link to a detailed doc that provides concrete instructions on how you add one. 

These guys seem board, he thinks, beside the invite to join #contrib slack channel, the manual explains that although the code is created on Dave's own github repo, the team encourage Dave to ask for code reviews at any step of the way, or even invite team members to contribute in areas where the reader is less proficient at. Dave realize that writing a winglang resource requires different areas of expertise, you need to know how to design a good resource API, provision an AWS (or other) construct using the CDK, develop a simple simulator implementation for the resource, and, as an optional option, develop a custom simulator view for this resource (I'll use the default one, it requires a simple JSON, he thinks to himself)

The manual do encourage the reader to put special emphasis on the following items in his code:
- README.md - the resource README must include the following
  - High level documentation 
  - Concrete examples of how to use the target 
  - List Supported targets (sim, aws, gcp, azure)
  - API docs 
- LICENCE - MIT or similar 
  
The manual also explains about the release process of the resource, and explains about the required versioning... Dave is not about to release this, so he looks for the option for non published packages and linking them to the compiler from localhost

He quickly goes to the testing part of the section, and discover that it is not implemented yet, winglang is very early and the team is still working out the details on what will be best to way to test resource, stay tuned and +1 the testing resources discussion

As suggested in the doc, start with an example and ask for our help and comments when you have one, and Dave already have an example it is that TODO app, but this time it is implemented with Dynamodb 

```js (wing)
<enter code here>
```

<!-- TODO - add Dave localhost implementation idea for using dyanmodb localhost image (requires docker / JRE) -->
<!-- TODO - add the wing code with dyanmodb instead of the bucket and the counter -->
<!-- TODO - break down to tasks and to task that we should not do -->

This story is completed when we have an example custom resource + all the assets and tutorials in order for a contributor to have create one

