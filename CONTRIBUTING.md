(this is a placeholder, should be merged with contents)
  
## Pull Requests
  
We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to generate our changelog. To that end, 
pull request titles must follow this convention:

```
<type>(<scope>): <subject>
```

* `<type>` must be be one of:
  * `feat` (new feature)
  * `fix` (bug fix)
  * `docs` (documentation update)
  * `rfc` (new/update to an RFC doc)
  * `chore` (not included in changelog)
* `<scope>` must be one of:
  * `compiler`
  * `sdk`
  * `docs`
  * `cli`
  * `examples`
  * `build` - change related to development environment, build system, build tools, etc.
  * `repo` - change related to repository behavior (e.g. pull request templates, issue templates, etc).
* `<subject>`
  * Should be all lowercase and without a period (improves aesthetics of changelog).
  * For `fix` changes, subject should describe the problem, not the solution (e.g. `fix(cli): intermediate.js file not found` instead of ~`fix(cli): make sure output directory exists`~).
  * For `feat` changes, subject should describe the feature, not the activity of adding the feature (e.g. `feat(sdk): google cloud platform support` instead of `feat(sdk): add tf-gcp target to sdk`).
  * For `rfc` changes, subject should be the title of the rfc (e.g. `rfc(cli): run command` instead of `rfc(cli): rfc for run cli run command`).

