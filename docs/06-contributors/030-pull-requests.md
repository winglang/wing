---
title: Pull Requests
id: pull_requests
keywords: [Wing contributors, contributors]
---

## 📬 How do I submit a pull request?

We love seeing new pull requests! If you're new to GitHub, check out [this
guide](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) to learn how to
create your own fork of the Wing repository and make a pull request.

To help maintainers review them and get them merged in a speedy fashion, please check:

* [ ] Your pull request has a [descriptive title](#how-are-pull-request-titles-formatted).
* [ ] A description of your changes are included, and a reference to a corresponding issue. (This is also a great place to shout-out anyone who helped with the changes!)
* [ ] Tests are added for all changes.
* [ ] Any handwritten documentation in `docs/` or READMEs are updated where appropriate when features are being added or removed (API docs will be automatically generated for you!).
* [ ] Your fork is in sync with the upstream repository.
* [ ] All build checks on GitHub are passing.

We also recommend you avoid force pushing or rebasing your branch after a pull request has been
opened in order to make it easier to review. Your commit history doesn't need to be perfect, since
it will get squashed into a single commit when the pull request is merged anyway.


### How are pull request titles formatted?

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to generate our
changelog. To that end, pull request titles must follow this convention:

```
<type>(<scope>): <subject>
```

* `<type>` must be be one of:
  * `feat` (new feature)
  * `fix` (bug fix)
  * `docs` (documentation update)
  * `rfc` (new/update to an RFC doc)
  * `chore` (not included in changelog)
  * `revert` (undoing a past change)
* `<scope>` must be one of:
  * `compiler`
  * `sdk`
  * `docs`
  * `cli`
  * `examples`
  * `playground`
  * `tutorial`
  * `vscode`
  * `plugins`
  * `build` - change related to development environment, build system, build tools, etc.
  * `repo` - change related to repository behavior (e.g. pull request templates, issue templates,
    etc).
* `<subject>`
  * Should be all lowercase and without a period (improves aesthetics of changelog).
  * For `fix` changes, subject should describe the problem, not the solution (e.g. `fix(cli): intermediate.js file not found` instead of ~`fix(cli): make sure output directory exists`~).
  * For `feat` changes, subject should describe the feature, not the activity of adding the feature (e.g. `feat(sdk): google cloud platform support` instead of `feat(sdk): add tf-gcp target to sdk`).
  * For `rfc` changes, subject should be the title of the rfc (e.g. `rfc(cli): run command` instead
    of `rfc(cli): rfc for run cli run command`).

### How to run tests for all OSes in Pull Requests

In PRs, by default we only run tests for the same OS and node version that we build with (Linux, Node 18 currently).

If you want to run tests for all OSes, you can add the `🧪 pr/e2e-full` label to your PR. 
This label must be present before the build job starts, so if you add it after the build job has started, you will need to manually re-trigger the build.
