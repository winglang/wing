# #{RFC Number} - {RFC_TITLE}

* **Author(s):**: @{AUTHOR}, @{AUTHOR}
* **Submission Date**: {YYYY-MM-DD}
* **Stage**: {RFC Stage}
* **Stage Date**: {YYYY-MM-DD}

<!--- 
Directions for above: 

Author(s): Git tag for PR authors and contributors
Submission Date: Fill in with date of initial submission, YYYY-MM-DD
Stage: Fill in with current stage in the RFC lifecycle
Stage Date: Fill in with date of last stage change
-->

> Write one sentence which is a brief description of the feature from a user perspective ("impact on users").

## Working Backwards
<!---
When writing am RFC, take into consideration that your readers will not have as much context as you do initially. Use this section to inform them about the solution *and* the problem(s) it solves. 
-->

> This section should contain one or more "artifacts from the future", as if the feature was already released and we are publishing its CHANGELOG, README, CONTRIBUTING.md and optionally a PRESS RELEASE. This is the most important section of your RFC. It's a powerful thought exercise which will challenge you to truly think about this feature from a user's point of view.
>
> Choose *one or more* of the options below:
>
> * **CHANGELOG**: Write the changelog entry for this feature in conventional form (e.g. `feat(wing): object typing`). If this change includes a breaking change, include a `BREAKING CHANGE` clause with information on how to migrate. If migration is complicated, refer to a fictional GitHub issue and add its contents here.
>
> * **README**: If this is a new feature, write the README section which describes this new feature. It should describe the feature and walk users through usage examples and description of the various options and behavior.
>
> * **PRESS RELEASE**: If this is a major feature (~6 months of work), write the press release which announces this feature. The press release is a single page that includes 7 paragraphs: (1) summary, (2) problem, (3) solution, (4) leader quote, (5) user experience, (6) customer testimonial and (7) one sentence call to action.


## Public FAQ

> This section should include answers to questions readers will likely ask about this release. Similar to the "working backwards" section, this section should be written in a language as if the feature is now released.
>
> The template includes some common questions, feel free to add any questions that might be relevant to this feature or omit questions that you feel are not applicable.

### What are we launching today?

> What exactly are we launching? Is this a new feature in an existing module? A new module? A whole framework? A change?

### Why should I use this feature?

> Describe use cases that are addressed by this feature.

## Internal FAQ

> The goal of this section is to help decide if this RFC should be implemented. It should include answers to questions that the team is likely ask. Contrary to the rest of the RFC, answers should be written "from the present" and likely discuss design approach, implementation plans, alternative considered and other considerations that will help decide if this RFC should be implemented.

### Why are we doing this?

> What is the motivation for this change?

### Why should we _not_ do this?

> Is there a way to address this use case with the current product? What are the downsides of implementing this feature?

### What is the technical solution (design) of this feature?

> Briefly describe the high-level design approach for implementing this feature.
>
> As appropriate, you can add an appendix with a more detailed design document.
>
> This is a good place to reference a prototype or proof of concept, which is highly recommended for most RFCs.

### Is this a breaking change?

> Describe what ways did you consider to deliver this without breaking users? Make sure to include a `BREAKING CHANGE` clause under the CHANGELOG section with a description of the breaking changes and the migration path.

### What alternative solutions did you consider?

> Briefly describe alternative approaches that you considered. If there are hairy details, include them in an appendix.

### What are the drawbacks of this solution?

> Describe any problems/risks that can be introduced if we implement this RFC.

### What is the high-level project plan?

> Describe your plan on how to deliver this feature from prototyping to GA. Especially think about how to "bake" it in the open and get constant feedback from users before you stabilize the APIs.
>
> If you have a project board with your implementation plan, this is a good place to link to it.

### Are there any open issues that need to be addressed later?

> Describe any major open issues that this RFC did not take into account. Once the RFC is approved, create GitHub issues for these issues and update this RFC of the project board with these issue IDs.

## Appendix

> Feel free to add any number of appendices as you see fit. Appendices are expected to allow readers to dive deeper to certain sections if they like. For example, you can include an appendix which describes the detailed design of an algorithm and reference it from the FAQ.