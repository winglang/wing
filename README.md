# Monada RFCs

This repo is a place to propose and track initiatives and changes throughout the company.

- [Monada RFCs](#monada-rfcs)
  - [What is an RFC?](#what-is-an-rfc)
  - [RFC Process](#rfc-process)
    - [1. Kick-off](#1-kick-off)
    - [2. RFC Document](#2-rfc-document)
    - [3. Feedback](#3-feedback)
    - [4. Final Comments Period](#4-final-comments-period)
    - [5. Implementation](#5-implementation)

## What is an RFC?

An RFC is a document that proposes a new initiative or a significant change to an existing project. *Request for Comments* means a request for discussion and oversight about the future of the project from maintainers, contributors and users.

**When should I write an RFC?** Usually, an RFC is a common practice for major features or complex changes that require that extra vetting. However, the process is designed to be as lightweight as needed and can be used to request feedback on any change. Quite often, even changes that seem obvious and simple at first sight can be significantly improved once a wider group of interested and experienced people have a chance to weigh in.

**Will my RFC be public facing?** For now, when writing RFCs, you should assume the content will remain internal and not worry about "trade secrects". In the future, we will have public-facing RFCs, but these will revolve only around our public-facing products and will not include anything that isn't fit for public review.

## RFC Process

### 1. Kick-off

Before diving into writing the RFC, it is highly recommended to organize a
kick-off meeting that includes any stakeholders that might be interested in this RFC or can contribute ideas and direction. The goal of the meeting is to discuss the feature, its scope and general direction for
implementation.

### 2. RFC Document

The next step is to write the first revision of the RFC document itself.

Create a file based off of the [`template.md`](./0000-template.md) under the `docs` directory. It includes useful guidance and tips on how to write a good RFC.

**What should be included in an RFC?** The purpose of an RFC is to reduce
ambiguity and risk and get approval for public-facing interfaces (APIs), which are "one-way doors" after the feature is released. Another way to think about it is that the goal and contents of the document should allow us to create a *high-confidence* implementation plan for a feature or a change.

In many cases, it is useful to develop a **prototype** or even start coding the actual implementation while you are writing the RFC document. Take into account that you may need to throw your code away or refactor it substantially, but our experience shows that good RFCs are the ones who dive into the details. A prototype is great way to make sure your design "holds water".

**If your RFC includes a change to public facing APIs** there are extra steps required. Just add the `public facing` label to your PR and the repo's automatic actions will do the rest.

### 3. Feedback

Once you have an initial version of your RFC document (it is completely fine to submit an unfinished RFC to get initial feedback), submit it as a pull request against this repo and start collecting feedback.

After first PR submission, use the PR number as the RFC's identifying number and rename your file to the format `NNNN-name.md`.

This is the likely going to be the longest part of your RFC process, and where most of the feedback is collected. Some RFCs resolve quickly and some can take months (!!). *Take into account at least 1-2 weeks to allow community and stakeholders to provide their feedback.*

A few tips:

- If you decide to resolve a comment without addressing it, take the time to explain.
- Try to understand where people are coming from. If a comment seems off, ask folks to elaborate and describe their use case or provide concrete examples.
- Be patient: it sometimes takes time for an RFC to converge. Our experience shows that some ideas need to "bake" and solutions oftentimes emerge via a healthy debate. We've had RFCs that took months to resolve.
- Not everything must be resolved in the first revision. It is okay to leave some things to resolve later. Make sure to capture them clearly and have an agreement about that. We oftentimes update an RFC doc a few times during the implementation.

### 4. Final Comments Period

At some point, you've reached consensus about most issues that were brought up during the review period, and you are ready to merge. To allow "last call" on feedback, the author can announce that the RFC enters "final comments period", which means that within a ~week, if no major concerns are raised, the RFC will be approved and merged.

Add a comment on the RFC pull request, and slack/email where relevant, that the RFC entered this stage so that all relevant stakeholders will be notified.

Once the final comments period is over, seek an approval of one of the core team members, and you can merge your PR to the main branch. This will move your RFC to the "approved" state.

### 5. Implementation

For large changes, we highly recommend creating an implementation plan which lists all the tasks required. In many cases, large implementation  should be broken down and released via multiple iterations. Devising a concrete plan to break down the break can be very helpful.

The implementation plan should be submitted through a PR that adds an addendum to the RFC document and seeks the approval of any relevant stakeholders.

---

Monada's RFC process owes its inspiration to the [AWS CDK RFC process](https://github.com/aws/aws-cdk-rfcs)
