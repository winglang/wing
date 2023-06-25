# User Story 7 - Request Alpha Access

> **Status**: Done

This sprint goal is to make sure the system is ready for anyone to go into our winglang.io website,
 register for wing preview program, consume the docs and guides and engage with the community. 

For the above to be successful we need to complete the following user stories
 


## All public assets meets our standards [#524](https://github.com/winglang/wing/issues/524)

We want to make sure that all our public assets meet our standards of good UX (performance, experience, branded design) 

**Websites:**  winglang.io, winglang.io/blog, winglang.io/docs,  monada.co

**Guides:** README.md, Contributing.md, winglang.io/docs

**Other assets:** GitHub Discussions

- Manual testing INSTALL + README (USER) and BUILD (CONTRIBUTION) flows
- Code freeze


## Tracking visitors and their onboarding process [#507](https://github.com/winglang/wing/issues/507) 

When a visitor goes into winglang.io or any.winglang.io or monada.co we report page load to Segment that reports it to Google Analytics and Mixpanel, it keeps track of the utm_\* and HTTP referer attributes to determine where they came from, we also track their registration to preview , completing the form, and successfully clicking on the email.

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

## We do not expose our user to any legal or privacy issues [#526](https://github.com/winglang/wing/issues/526)

We want to make sure that our user journey is safe and meets the legal standard, including: having our EULA available, 
making sure we do not leak any private information, etc...

## Console is ready for public 
See list in ticket

## Our service is always available for our users [#527](https://github.com/winglang/wing/issues/527)

We are notified when a critical path in our customer journey is broken. 

Our customer critical path is:
- Visiting our webpages 
- Going threw the sign up flow
- Running the README examples 
- Building wing 
- Picking up a good-first-issue
