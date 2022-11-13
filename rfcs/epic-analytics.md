**Status:** _RFC_

## Working Backwards

It is that time of the month for Wing Monthly meeting. As always it tarts with a snapshot of our community performance metrics. 
It is possile to see in a glance from, the preson presenting is showing the dashboard and tells reads the number of new/active/chrun wing users, 
and same for contributors and advocates. 
There is an uptick in users, the presenter go into details on which activities are happening more this month, 
and closes the loops with correlation to what was released two months ago. 


Someome from the audience is questioning about the low retention numbers for contributors in the last 3 month, 
a PM takes an action item to dive deeper on where are contributors stoping to engage with the community, 
he will later opens a ticket that outlines the specific point in time where the biggest drop ocours and suggest a couple of engaging activities with new contributors.

Over the last couple of month, data has been a key tool in making decision. 
Peope still rely heavily on thie their insticts and intuition but the infomration avaialble within the analytics system allows them to quickly validate and justify the problem they are about to solve, and even more importantly validate that a problem was actually resolved and celebrate outcomes and no only outputs

## Dashboard

Here is an example of a dashboard that shows how many visitors/users/contributors we have in the system and how they convert, it is missing retention
metrics, advocate accounting and high touch real usage users
![image](https://user-images.githubusercontent.com/1727147/200826865-2f164ceb-6bbe-47c7-adf2-233260539238.png)

## Prioritize User Stories

### Tracking visitors and signup flow

| Status | Story| 
| --- | --- | 
| RFC    | https://github.com/winglang/wing/issues/507 |


When a visitor goes into *.winglang.io or monada.co we report page load to Segment, which reports it to Google Analytics and to Mixpanel.
It keeps track of the `utm_*` and HTTP referrer attributes in order to determine where they came from,
we also track their clicks on "request early access", completing the form, and successfully clicking on the email.

We are able to answer the following questions:
- How many visitors seen our web pages
  - From where did they arrive 
  - Which pages are seen the most
  - Which docs are seen the most 
  - Other analytics metrics (e.g. Bounce Rate)

- How many visitors successfully registered to the preview
  - From where did these people arrive 
  - Their completed form information
  - Pages viewed 

- What happened to visitors who started the form and did not complete it 
  - Show the funnel: Register → Completed form → email cta clicked

### Tracking user’s wing cli activities

**Status:** _Draft_

In this story we are able to track user activities using wing toolchain. We want every use of the wing toolchain to report back a wing usage event that
can be traced back to the User entity.  There is a way for a user to know what we are tracking and purge his data, and also opt out from reporting. 

We are able to answer the following questions:
- Who is using wing today/this week/this month?
- Who has stopped using wing? 
- What do they do with wing? (compile to which target, run, dev, etc...)

### Tracking slack activities 

**Status:** _Draft_

In this story we are able to track user engagement over slack. We want every activity taken in slack to be reporting back as a slack usage event that
can be traced back to the User entity.

We want to know when a User:
- joined slack
- posted a message 
- replied to a thread
- Reacted on a post
- left slack workspace 

### Tracking github contributors/users activities 

**Status:** _Draft_

In this story we are able to track user/contributors engagement over github. We want every activity taken in github to be reported back as a github
usage event that can be traced back to the User entity.

We want to know when a User is taking an action on any repo under @winglang and @winglang-contrib 
- Created an issue
- Reacted on an issue
- Commented on an issue
- Created a PR
- Commented on a PR 
- Created a discussion
- Commented on a discussion
- Reacted on a discussion 

Every event need to have:
- Activity type  
- link to the activity 
- Repo
- Org

### Dashboard - Totals & Conversions

Implement the above [dashboard](#dashboard) 



## Appendix 

## Funnel

We want to be able to measure the success of our effort to expand the reach of wing to the wider audience and span out to advocates outside of the monada team. 
In order to do so we need to continuously answer the following questions:
- How are people discovering our product or company? From how many different channels? What are the leading channels? 
- New channel exploration - which channels other companies use and we don’t have users from?
- Are these people taking the actions we want them to take in order to use our product?
- Are users of our product actively contributing to wing?  
- Are users of wing becoming advocates of wing?
- Are contributors of wing becoming advocates of wing?
- Is wing sticky for all of these different user groups?

To answer these question, we define the following two funnels:
> Visitors > Users  > Advocates
> 
> Visitors > Users > Contributors > Advocates

### Visitors

Visitors are developers who are aware that wing exists but have not yet used it. Usually, visitors do one or more of these activities:

- Visiting wing website
- Following wing on social media 
- Subscribing to wing newsletter/mailing list
- Attending a talk/meetup about our project
- Being exposed to winglang repo
- People that we’ve talked to 

### Users

Users are developers who use wing products for their software projects. They are the foundation of our open source community, yet they do not actively engage in our community. Typically, users can be spotted by the following activities:

- Starring your repo
- Asking project-related questions in online forums (Stackoverflow, slack, etc.)
- Commenting on your social media activities
- Using wing toolchain (downloading, running, etc…) 

### Contributors

Contributors are developers who actively contribute to your open source project and are engaged in the community. They are the heart of your community and keep things running. Generally, contributors undertake the following activities:

- Opening issues (bugs, features, etc) and giving feedback
- Submitting pull requests
- Review pull requests
- Comment on issues others created
- Get involved in RFCs
- Engaging in discussions and supporting users with technical issues (e.g. on Slack, reddit, stack overflow)

### Advocates

Advocates are developers who are true ambassadors of your community and also encourage other developers to come on board. They are firmly convinced of the added value of your project and the values of the community, and they communicate this to the outside world. They should all be personally known to you, but these activities help to recognize them:

- Giving talks at conferences
- Organizing local meetups 
- Adding a new resources
- Private advocacy 
- Creating content (blogs, tutorials, regular tweets, etc.)


### Event Sources

This is a list of sources where we are going to gather analytics events from:

- winglang.io, blog.winglang.io, docs.winglang.io (and any other winglang.io asset)
- monada.co
- winglang/wing Github
- Wing CLI
- Wing VSCode Extension
- Slack
- Email CTA
- Typeform form
- Wing Console


### Naming and collection standards

This is a placeholder for our events naming conventions and standards ([example](https://segment.com/docs/protocols/tracking-plan/best-practices/#formalize-your-naming-and-collection-standards))

### Tracking Plane

This is a placeholder for all the events reported in the system, and the entities that are related to 

**Events:**
| NAME | WHY | PROPERTIES | LOCATION |
|---   |---  |---         |---       | 
|      |     |            |          |

**Entities:**

User entity in the system
- email:str
- github_username: str
- Type: “registered|user|contributor” 
  - Registered - someone that registered for our preview and we have his email and github
  - User - see definition
  - Contributor - see definition
- Monadian: true/false 
- created_at: date+time

### Technology Stack

- Segment.com - Segment is like a message bus for all our analytics data, you can connect sources and destinations and keep the development integration to a minimum 
- Google Analytics - GA used for public websites analytics 
- Mixpanel - used for deep app and user analytics 
- Pipedrive - our CRM, used for sending email and tracking different sale oriented workflows
- FullStory - an ability to see what our users is doing on the screen (we should remove it eventually from the public site) 
- HotJar - maybe a competitor to FullStory, we will review both after release and decide which one to work with

