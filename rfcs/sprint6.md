# Sprint 6 User Story
This is the story of Monada Sprint 6.

The primary goal of this sprint is to create a self service journey from someone who doesn't have access to wing repo into someone that has all that she needs in order to contribute or use wing 

It is told from the perspective of Maria Vermeer, a 27-year-old programmer. Maria is the lead engineer at the backend team of her company. She loves her job and is very passionate about software and technology. She believes in the power of the cloud and open-source. 

Maria has a complete two free weeks ahead of her to prevent burnout, she plans to rest and is excited to do so but just before she puts her phone in focus mode, she opens her linkedin app and comes across a blog post that her friend from work Mona Lisa liked, the post talks about the problem of cloud programming. **She is intrigued…**

<p align="center">
--Our mission is to get Maria to a point where she is a happy contributor of winglang with a self service experience--
</p>

She quickly skim through the blog post, enjoys the authentic tone but even more, feels like someone is describing exactly the difficulties she has been having lately and that, in a roundabout way, contributed to her burnout. She clicks on the learn more button that takes her to winglang.io 

winglang.io webpage is simple & clean, she understands from the get go that this is for developers, and her eyes come across the main title wing and a tagline XXX, she looks at all the hero area (AKA the are above the fold) and it is crystal clear to her where she's landed, they are trying to solve the problem she has been having by introducing a new language called wing, which is the first cloud oriented programming language, she wonders about this, “what is cloud oriented programming” . She scrolls… 

While scrolling through the page she sees the same pains that are associated with cloud development, and some example of why cloud oriented programming is the right solution, more scrolling explains to her, in simple terms, why this paradigm shift is needed. In the bottom of the page she sees a call to action to provide an email address to signup for an early preview of winglang repo. Hell yeah, I’ll give it a try…. 

She puts her email and get a message saying that she should be expecting an email from us on how you can register, she goes into her inbox and see she got an email from Elad that welcomes her to the community of wing and asks her to fill in a short form so we can learn more about her before giving her access, she clicks the link. Her web browser takes her to a short form that asks her questions about what her job is (devops/developer/both/other) , how she heard of wing, etc, and also her github username. She submits the form and gets a message, “thank you for submitting the form, please expect a github invitation to github.com/winglang/wing repo in your email”, she goes back to her email where an invite email is awaiting her. She clicks the link, approve the invite and goes to grab coffee 

She lands in winglang/wing repo and starts by skimming through the README.md. It is clear for her that this project is in a very early stage, both because of the amount of stars, the first commit time but also the big disclaimer on the top of the README.md. She starts reading the README.md and is excited to see the quick screencasts of what it looks like to write and compile wing software. She is psyched to check out the first example project, she downloads the toolchain,  runs the example project and it works, sweet!. The README points into a docs.winglang.io webpage to learn more about the language and its capabilities. She clicks on the link, where she reads about why we need a language like wing, and what is currently supported by wing, she learns about infligh and resources, she visits the spec and the roadmap and browse through the wing sdk. She feels like this might be a beginning of something big

Maria start playing with the language, she wants take this to the next level and see how it is like to build something with this, $#!#! the disclaimer… She install the vscode plugin and start punching the keyboard, she compiles a very simple program and gets a compiler error with the following message “for loop are not yet supported, please visit winglang/wing/issues/#119 comment on it” she does this exactly. A couple of minutes later she gets a notification from github with a reply from a guy named Mark, he comments on the issue “nice to see we are getting some early traction here”, Chris replies a couple of minutes later, saying he has already talked to Yoav on how we can implement this in the compiler and would love to work on it, he mentions Maria and asks her if she can provide the exact example of the code she was trying to run, she reply with the code example and feels like she might be part of something, she turns the computer and continue her day. 

Early morning on the next day, Maria wonders what else she can do in this repo since, it seems, there aren't a lot of options to write software in wing because it lack so many features, she goes back to the repo straight to the contributing guide. She is not surprised that there are issues with the good-first-issue labels, most of them are related to adding features to existing resources in the SDK, she consults the contributing guide and understands that she first needs to build the repo. She goes through the guide and completes the build, the last step ask her to help us celebrate her achievement by posting a message on first-time-builders slack channel, she posts the message and quickly get people’s +1 & :love reactions, on the thread a guy named shaiA asks her about the time it took her to build the repo and also if she has any comments, she gives a few comments and shaiA suggests that she open them as github issues, an hour after opening the github issues Matthew replies with a comment. This is impressive, people are engaged, she like the vibe 

With the ability to build the project she goes back to the good-first-issue and assign the issue on herself, a couple of minute later an obscure github username called staycool reply on the issue and tell her that if she needs any help after reading the guides, we are here and in the slack channel help-with-first-issues. It is hard for her to add the feature, she needs to understand the concept of polycons write the local implementation and also write the aws implementation, she gets help on slack and eventually gets the job done and submits a pull request, she feels like the people in this community are helpful and excited to have her onboard.

Two days after, she noticed that Chris had submitted a pull request on the missing for loop issue, it was approved and a new version of wing toolchain is available, she upgraded her wing version and tried to recompile her example , it works. She immediately reply on the issue, telling Chris that his fixed worked like a charm, he replies to her if she would consider contributing her example back to the /example folder and points to the contributing.md section that talks about how to add examples, she goes into the read me and learn that all example are compiled as part of the build, that's smart she thinks to herself, I’ll do it. She opens a PR with the added example, the tests run and pass, and she awaits feedback. Elad replies on the PR, boy this guy is cheerful she thinks to herself. The PR was approved by Sep and she merged it. 

Another week has passed, she gets an email from Revital, asking her if she minds completing a form on her onboarding experience in wing, she is delighted to do so. The email also mentions a coming town hall meeting at the end of the month, she adds it to her calendar. After completing the form Revital pings Maria in slack, thanking her for her form compilation and asking her if she minds scheduling a meeting together for us to get to know her better

She comes back to the office and tells the people what she's done last week, someone mentions that it feels like she joined a cult, another person goes to winglang.io to check it out. **He is intrigued…**


## Notes

### As such the focus of the sprint is:

- Having Elad’s blog post somewhere in the public 
- [guts-web-dev] Having a winglang.io website working
- We need a title currently “wing”
- We need a tagline currently 
- [design] having wing log
- [content] Having a demo video inside our README
- [dev] Having a github.com/winglang/wing repo (instead of monadahq/winglang)
- [integration] Having a signup process for getting winglang repo permission 
- [integration] Having a form that is part of the onboarding process
- [elad] Having a winglang slack workspace (not monada) for people to join
- [elad] Having a docs.winglang.io documentation site working with full content
  - Why did we create wing
  - What features are supported and not supported  (roadmap) 
  - Language reference (Spec)
  - See the SDK API docs
- [dev] Wing compiler errors are friendly in a way that they notify you when you are using a feature that is part of the language roadmap but not implemented yet
- [dev] Having analytics inside the wing tool that you can opt-out 
- [content] Contributing.md 
  - Guide with instructions on how to build
  - Guide with instructions on what the different options for you to contribute
  - Guide with how to add a sample project
  - Guide that explains the RFC process and how you can comment on it
  - Guide that explains the process of pull request creation and approval
- A slack channel to celebrates first time project builders
- [dev] Good-first-issue to pick from and start working on them, and eliminate any bad ones
  - Example of good first issue
   - Add a feature to a resource (to localhost and to aws)
   - Add another target to an existing resource 
  - Bad example for a good first issue (stuff that requires a lot of hand holding)
   - Contribute a for in loop feature to the compiler
- [soft-dev] Issue template for a simple guided way to open issues 
- [dev] Monitoring if it takes us too long to first respond to an issue 
- [dev] Monitoring if it takes us too long to respond to a pull request
- [dev] Monitoring if we don’t have enough good-first-issue issues
- [dev] Monitor if we have less then 15 good-first-issue issues
- [content] remove the playground from the existing readme.md
- [integration] A form to collect information about the onboarding process
  - Questions examples:
    - Do you understand wing
    - Do you intend to be involved with wing? How? 
    - Do you have any use cases that you would like to try wing with? 
    - What was the most confusing part of the onboarding process?
    - NPS question?
  - Sent 2 weeks after signup 

### Currently out of scope:
- Having all data reported to the data platform 

