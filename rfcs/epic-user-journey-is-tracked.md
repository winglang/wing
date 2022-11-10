**Status:** _RFC_

# Epic - User Journey is Tracked

To learn more about the origin of this EPIC, please visit [The Community is the Product](/rfcs/the-community-is-the-product.md) document 
The Goal of this EPIC is to be able to tell in a glance, how many people have been exposed to wing, how many signup for preview, how many joined, how many used wing and how many contributed to wing. 

## Dashboard

Here is an example of a dashboard that shows how many visitors/users/contributors we have in the system and how they convert, it is missing retention metrics, advocate accounting and high touch real usage users
![image](https://user-images.githubusercontent.com/1727147/200826865-2f164ceb-6bbe-47c7-adf2-233260539238.png)

## Event Sources

This is a list of sources where we are going to gather analytics events from:

- winglang.io, blog.winglang.io, docs.winglang.io (and any other winglang.io asset)
- monada.co
- winglang/wing Github
- Wing CLI
- Wing VSCode Extension
- Slack
- Email CTA / NewsLetter
- Typeform form

## Naming and collection standards

This is a placeholder for our events naming conventions and standards ([example](https://segment.com/docs/protocols/tracking-plan/best-practices/#formalize-your-naming-and-collection-standards))

## Tracking Plane

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



## Technology Stack

- Segment.com - Segment is like a message bus for all our analytics data, you can connect sources and destinations and keep the development integration to a minimum 
- Google Analytics - GA used for public websites analytics 
- Mixpanel - used for deep app and user analytics 
- Pipedrive - our CRM, used for sending email and tracking different sale oriented workflows
- FullStory - an ability to see what our users is doing on the screen (we should remove it eventually from the public site) 
- HotJar - maybe a competitor to FullStory, we will review both after release and decide which one to work with

## Prioritize User Stories

### Analytics Setup 

| Status | Story| 
| --- | --- | 
| RFC    | https://github.com/winglang/wing/issues/506 |


We want to have accounts in the relevant services and we want to establish a formalize way for naming and collection [standards](#Naming-and-collection-standards), we would also like to create and update our [tracking plane](#Tracking-Plane) that describes what are we measuring and where.

### Tracking visitors and their onboarding process

| Status | Story| 
| --- | --- | 
| RFC    | https://github.com/winglang/wing/issues/507 |


When a visitor goes into winglang.io or any.winglang.io or monada.co we report page load to Segment that reports it to Google Analytics and Mixpanel, it keeps track of the utm_\* and HTTP referer attributes to determine where they came from, we also track their registration to preview, completing the form, and successfully clicking on the email.

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

In this story we are able to track user activities using wing toolchain. We want every use of the wing toolchain to report back a wing usage event that can be traced back to the User entity.  There is a way for a user to know what we are tracking and purge his data, and also opt out from reporting. 

We are able to answer the following questions:
- Who is using wing today/this week/this month?
- Who has stopped using wing? 
- What do they do with wing? (compile to which target, run, dev, etc...)

### Tracking slack activities 

**Status:** _Draft_

In this story we are able to track user engagement over slack. We want every activity taken in slack to be reporting back as a slack usage event that can be traced back to the User entity.

We want to know when a User:
- joined slack
- posted a message 
- replied to a thread
- Reacted on a post
- left slack workspace 

### Tracking github contributors/users activities 

**Status:** _Draft_

In this story we are able to track user/contributors engagement over github. We want every activity taken in github to be reported back as a github usage event that can be traced back to the User entity.

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





