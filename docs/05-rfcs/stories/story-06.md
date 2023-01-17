# User Story 6 - Ready for Contribution

> **Status**: Done

This is the story of Monada Sprint 6.

The primary goal of this sprint is to create a self service journey from someone who doesn't have access to wing repo into someone that has all that she needs in order to contribute or use wing.

It is told from the perspective of [Maria Vermeer](https://en.mariavermeer.com/), a 27-year-old programmer. Maria is the lead engineer at the backend team of her company. She loves her job and is very passionate about software and technology. She believes in the power of the cloud and open-source.

Maria has a complete two free weeks ahead of her to prevent burnout, she plans to rest and is excited to do so but just before she puts her phone in focus mode, she opens her linkedin app and comes across a blog post that was shared by her friend from work, the fabulous Mona Lisa, the post talks about the problem of cloud programming. **She is intrigued...**

<p align="center">
--Our mission is to get Maria to a point where she is a happy contributor of winglang with a self service experience--
</p>

She quickly skims through the blog post, enjoys the authentic tone but even more, feels like someone is describing exactly the difficulties she has been having lately, and that, in a roundabout way, contributed to her burnout. She clicks on the "learn more" button that takes her to https://winglang.io. Mmm... Sounds like a programming language...

![Landing Page](https://user-images.githubusercontent.com/598796/198871499-55929ad0-0961-4e25-898f-9deb3755dc44.png)

The winglang.io webpage is simple & clean (see [Figma](https://www.figma.com/file/coK9c9XmIgPJ4tlj3dHf0q/winglang.io?node-id=9%3A273)). It shows an animation of some code being written line by-line in IDE (with code completion, syntax highlighting, etc). And then, on the right-hand side, a cloud architecture diagram starts to pop up. For example, when `new cloud.Bucket()` is written, suddently an AWS S3 bucket pops in, when `new cloud.Queue()` is written, a queue is added, etc. Connections form between the cloud resources on the diagram as the relevant code is added.... Suddently, the diagram starts change and switches to a Google Cloud architecture, then to an Azure architecture and then it shows the UI of something called "Wing Console" which seems like it is a UI tool for interacting with the app. Wow this is very intrguiging. She understands from this that this simple code can turn into compelte and complex cloud infra.

It says below "Sign up for early access". She can't wait... Puts her email and clicks "submit". A message pops up saying that she should be expecting an email from us on how you can register, she goes into her inbox and sees she got an email from Elad that welcomes and asks her to fill in a short form so we can learn more about her before giving her access. She clicks the link. Her web browser takes her to a short form that asks her questions about her job (devops/developer/both/other), how she heard about wing, etc, and also her github username. She submits the form and gets a message, “thank you for submitting the form, please expect a github invitation to github.com/winglang/wing repo in your email”, she goes back to her email where an invite email is awaiting her. Wow these guys are quick! She clicks the link, approves the invite and goes to grab coffee.

She lands in https://githug.com/winglang/wing and starts skimming through the README.md. It is clear to her that this project is in a very early stage, both because of the amount of stars and because of the first commit time. The big disclaimer at the top of the README.md also provides a hint. She starts reading the README and is excited to see the quick screencasts of what it looks like to write and compile wing software. She is psyched to take wing for a spin. She follows the instructions in the README (Mona Lisa told her about that already from Sprint 4), downloads the toolchain, writes the little "Hello World" and it works, sweet! The README points to a https://docs.winglang.io, to learn more about the language and its capabilities. She clicks on the link, where she reads about why we need a language like wing, and what is currently supported, she learns about inflights, resources, and Polymorphism. She reads through the language reference, and the roadmap and browses through the Wing SDK documentation. She feels like this might be a beginning of something big!

Maria starts playing with the language, she wants to take this to the next level, and see how it is to build something with this, F$#!#! the disclaimer... She compiles a very simple program and gets a compiler error with the following message “'for' loops are not yet supported, please +1 https://winglang/wing/issues/119". She goes to GitHub and clicks the 👍 to indicate this is a feature she is after. A couple of minutes later she gets a notification from github with a reply from a guy named Mark. He comments on the issue:

```
@maria, it's awesome to have you here with us. You can check out our [Roadmap Project Board] to track our progress.
```

But then, a guy named Chris replies a couple of minutes later, saying he has already talked to Yoav on how we can implement this in the compiler and would love to work on it. He mentions Maria and asks her if she can provide the exact example of the code she was trying to run, she replies with the code example and feels a warm fuzzy feeling of belonging. She turns the computer off and continues her day.

Early morning on the next day, Maria wonders what else she can do in this repo since, it seems, there aren't a lot of options to write software in wing because it lack so many features. She goes back to the repo, straight to the contributing guide. She is not surprised that there are issues with the good-first-issue labels, most of them are related to adding features to existing resources in the SDK, she consults the contributing guide and understands that she first needs to build the repo. She goes through the guide and completes the build, the last step asks her to help us celebrate her achievement by posting a message on #first-time-builders slack channel, she posts the message and quickly get people’s +1 & :love reactions, party parrots and a disconcerting amount of attention. On the thread a guy named shaiA asks her about the time it took her to build the repo and also if she has any comments, she gives a few comments and shaiA suggests that she open them as Github issues. An hour after opening the github issues, Matthew replies with a comment. This is impressive, people are engaged, she likes the vibe.

With the ability to build the project she goes back to the good-first-issue list and adds a comment that says "I'd like to pick up the issue". A couple of minute later an obscure github username called staycool replies on the issue and tells her that if she needs any help after reading the guides, we are here and in the slack channel #contributors. It is hard for her to add the feature, she needs to understand the concept of Polycons, write the local implementation, and also write the AWS implementation. She gets help on slack and eventually gets the job done, and submits a pull request. She feels like the people in this community are helpful and excited to have her onboard.

Two days after, she notices that Chris had submitted a pull request on the missing for-loop issue, she adds a comment of ❤️ to show her love. It was approved and a new version of the wing toolchain is available about 10 minutes later (wow!). A comment on the issue also notifies her that the feature was released. She upgrades her Wing version and tries to recompile her example. It works! She immediately replies on the issue, telling Chris that his fix worked like a charm, he replies to her if she would consider contributing her example back to the `/examples` folder and points to a section in CONTRIBUTING that talks about how to add examples. She goes into CONTRIBUTRING and learns that all examples are compiled as part of the build, that's smart, she thinks to herself, I’ll do it. She opens a PR with the added example, the tests run and pass, and she awaits feedback. Elad replies on the PR with 45 different emojis, boy this guy is cheerful she thinks to herself. The PR was approved by Sep and it was automatically merged by mergify. Magic!

Another week has passed, she gets an email from Revital, asking her if she minds completing a form on her onboarding experience to wing, she is delighted to do so. The email also mentions a town hall meeting coming up at the end of the month (with an iCal attachment). She adds it to her calendar. After completing the form Revital pings Maria in slack, thanking her for her form completion and asking her if she minds scheduling a meeting together for us to get to know her better.

She comes back to the office and tells the people what she's done last two week on her time off. Someone mentions that it feels like she joined a cult, another person goes to https://winglang.io to check it out. **He is intrigued...**

## Notes

The primary goal of this sprint is to create a self service journey from someone who doesn't have access to wing repo into someone that has all that she needs in order to contribute or use Wing 

You can review all issues tracked related to this sprint in [#334](https://github.com/winglang/wing/issues/334)
