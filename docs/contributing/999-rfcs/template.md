---
title: RFC Template
description: Template for creating a new RFC
---

# #{RFC Number} - {RFC_TITLE}

- **Author(s):**: @{AUTHOR}, @{AUTHOR}
- **Submission Date**: {YYYY-MM-DD}
- **Stage**: {RFC Stage}
- **Stage Date**: {YYYY-MM-DD}

<!---
Directions for above:

Author(s): Git tag for PR authors and contributors
Submission Date: Fill in with date of initial submission, YYYY-MM-DD
Stage: Fill in with current stage in the RFC lifecycle
Stage Date: Fill in with date of last stage change
-->

> One sentence which is a brief description of the feature from a user perspective.

<!--
This RFCs have 3 sections: Requirements -> Design -> Implementation. We intentionally start with *Design* since it
is a great way to introduice the feature to readers.
-->

## Design

<!--
This section works backwards from an the end user. It is written as one or more "artifacts from the future" such as the getting started documentation (readme), user interface wireframes (or link to them), press release, changelog entry, etc.
-->

## Requirements

<!--
This section is a "shopping list" of requirements for this feature.

We try to start by identifying the use cases that are expected to be addressed by this RFC.
Ideally they should not inform the design or implementation but rather state the problems/pains/results
that our users expect to achieve with this RFC.

The requirements are the "contract" of the feature you're developing - "what does it do?" (as opposed to "how does it do it" - the implementation). The requirements usually specify use cases as well as edge case scenarios and the desired behavior of the software described.

NOTES:
* It is highly recommended to split functional and non-functional requirements.
* Requirements should be prioritized P0 (must), P1 (nice to have) or P2 (future).
* It is also recommended to give requirements an identifier that will make them easier to reference later.
-->

### Functional

- REQ01 (P1): bla bla bla
- REQ02 (P0): another requirement

### Non-Functional

- REQ03 (P1): bla bla bla

## Implementation

<!--
This section has a list of topics related to the implementation. We have some examples/ideas for topics below. Feel free to add as needed

The goal of this section is to help decide if this RFC should be implemented.
It should include answers to questions that the team is likely ask.
Contrary to the rest of the RFC, answers should be written "from the present" and likely
discuss approach, implementation plans, alternative considered and other considerations that will
help decide if this RFC should be implemented.
-->

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
