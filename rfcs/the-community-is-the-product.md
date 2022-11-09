**Status:**  _RFC_ 

TODO:
- [ ] Present to the team
- [ ] Add a high level milestone based plan
- [ ] Add links to relevant EPICS


# Working Backwards

It is early 2024, Elad and Shai are outside Suite 101, 2865 Sand Hill Road, the Andressen Horowitz offices. They are in the middle of a discussion regarding yesterday's wing meetup in SF, it was organized by an outside contributor which made the event especially interesting for them. Let's get into character, they say to each other, and enter the office.

They meet Andrew Chen, a general partner, and start presenting the deck. They go through the problem, solution and the go to market plan and reach the company 18 month performance slides,  there are four slides in this section:

**Increase in users** -  although there is no concrete deterministic number of people using wing, it is clear to see that wing is growing extremely fast in the last couple of months, the number of downloads, stars, slack messages and issues has doubled in the last 3 month alone. 

**Real usage stories** - This part shows a short list of logos, and their real usage patterns.  Most of them are obscure for Andrew Chen, but some patterns look promising, there are also quotes from developers and engineering managers in these teams, talking about the benefits of localhost development, empowered developers and the effect on the engineering cadence and culture. The teams on the slide all qualifies to the gtm planned that was presented in previous slides 

**Contributors performance indicators** - you can see in this slide that the amount of active contributors is growing steady in the last 12 month, another important cue is that contributor engagement with the project is increasing over time, Monada introduces a new concept called net-contributions-retention. Similar to NDA,  it indicates how many contributions increased for an average contributor over a period of time, there is a clear indication that this project is engaging. The more people interact with it the more they like it

**Public Advocacy** - The advocate slide starts with a short explanation of what qualifies as public advocacy, and the slide shows a quarterly graph that grows 2x in activities every quarter in the last 3 quarters, the activities included are tweets, blog posts, meetups, etc… it doesn’t sum up to a lot of activities, but there are early indications that this quarter is already having the same 2x cadence. 

The meeting ends with a positive vibe, Elad and Shai high five each other on their way out, but they know that the deal is far away then being sealed. 

One followup item they have, is to answer Andrew’s request to be connected with active contributors of wing, when asked for any specific segment, Andrew replies that he wants to see people working in mature companies.  Andrew goes ahead and schedules the call with those contributors,  he queries them about their company’s and what are the options for the company to embrace wing. From talking to a few it seems like there is very little room for chance here, they all talk like they have read the same playbook for adopting wing for different kinds of applications, whether it is green field or displacing existing systems and codebase,  they talk about barriers and also mention where they are in the process. Andrew takes a note to himself that this feels more like talking to sales engineers then to OSS contributors. He can’t wait for their end-of-the-week meeting and calls Ben and Andressen to share his excitement. 

# The Community is the Product

 SaaS product has many components, let's take a look at a product like rollout (a feature flag SaaS solution) . It includes the SDK in all the languages and the dashboard to control your feature in production, but it also contains the onboarding experience of the freemium model, the setting up experience, creating organization and multiple organizations, setting up permissions and different roles, payment, billing, invoices,  system, the place where you see the usage, the support bot system, SLA’s all of these, although required by any SaaS product, are an integral part of the feature flags user experience and are crucial for its success

In Monada, our product is an open source project, and the way the community interacts with it is crucial for our success. Which means that the role of product leadership is to make sure that the entire company is focused on solving the right problems, and we can measure and monitor our success.

**How do you measure traditional SaaS products VS Community Product?**

It is custom to use the AARRR pirate metrics for almost any SaaS business that focus on bottom up sales motion:
- Acquisition (or awareness) – How are people discovering our product or company?
- Activation – Are these people taking the actions we want them to?
- Retention – Are our activated users continuing to engage with the product?
- Referral – Do users like the product enough to tell others about it?
- Revenue – Are our personas willing to pay for this product?)

One major difference between measuring the success of a community product and a SaaS product is that community success is a trailing indicator. Meaning, It will take us many iterations and time to have a precise messaging that will meet the right people at the right time to produce strong community advocates and contributors. As a result it will be discouraging to have the team focus on the high level KPI without being able to witness the impact of our efforts. 

As a result we need to make sure that we have the score (number of contributors, number of users, number of advocate, etc…) clear and visible to everyone but instead of aligning team success with the high level KPI we should measure our success on activities and performance indicators that we can control under the assumption that [“The Score Takes Care of Itself”]([url](https://www.amazon.ca/Score-Takes-Care-Itself-Philosophy/dp/1591843472))
Another difference is the ability to actually measure, which is limited in OSS tools. We would have to use approximations and derivative to measure progress and success 


# Measuring OSS Community Funnel

## Description

For wing to be successful and fulfill its promise to change how cloud applications are developed, it must create a vivid community of users, influencers, contributors and advocates.  As a result Monada’s performance performance indicators are related to our performance as an open source project. 

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

## Retention

Another important question that we want to keep in mind is:
Is wing sticky for all of these different user groups?

This means that we would also want to measure cohorted weekly/monthly retention over time to make sure that all different types of groups are retained.




