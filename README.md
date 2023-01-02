![](./logo/banner-dark.png#gh-dark-mode-only)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-16-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

![](./logo/banner-light.png#gh-light-mode-only)

<p align="center">
  &nbsp;
  <a href="https://docs.winglang.io/getting-started">Quick Start</a>
  ▪︎
  <a href="http://t.winglang.io/slack">Slack</a>
  ▪︎
  <a href="https://docs.winglang.io/">Docs</a>
  ▪︎
  <a href="https://github.com/winglang/wing/issues">Issues</a>
  ▪︎
  <a href="https://github.com/winglang/wing/discussions">Discussions</a>
  ▪︎
  <a href="https://stackoverflow.com/questions/tagged/winglang">Stack Overflow</a>
  ▪︎
  <a href="https://docs.winglang.io/contributors/handbook">Contribute</a>
</p>
# Welcome! :wave:

**Wing** is a [cloud-oriented programming language]. It is a modern,
object-oriented, and strongly-typed language. Most programming languages think
about computers as machines. In Wing, **_the cloud is the computer_**.

Wing applications compile to Terraform and JavaScript that are ready to deploy
to your favorite cloud provider, and can also be tested in your local
environment using the [Wing Console](https://docs.winglang.io/getting-started/console).

[cloud-oriented programming language]: https://docs.winglang.io/#what-is-a-cloud-oriented-language

```js
bring cloud;

let bucket = new cloud.Bucket();

new cloud.Function(inflight (event: str): str => {
  bucket.put("greeting.txt", "hello, world!");
});
```

## This is Alpha

Wing is in its very early stages of development and not recommended for
production use. Many features are still missing, and APIs will dramatically
evolve in the coming months. We are excited for anyone to take part in
influencing the direction of every part of this project.

Our <a href="https://docs.winglang.io/status">Project Status</a> page includes
more information about stability and roadmap 👷‍♀️

## Installation

- [Prerequisites](https://docs.winglang.io/getting-started/installation#prerequisites)
- [Wing CLI](https://docs.winglang.io/getting-started/installation#wing-cli)
- [Wing IDE Extension](https://docs.winglang.io/getting-started/installation#wing-ide-extension)
- [Wing Console](https://docs.winglang.io/getting-started/installation#wing-console)

## Getting Started

The [Getting Started](https://docs.winglang.io/getting-started) guide is a
once-in-a-lifetime adventure into the Wing rabbit hole.

To learn more about Wing concepts such as
[resources](https://docs.winglang.io/concepts/resources) and
[inflights](https://docs.winglang.io/concepts/inflights), jump over to the
[Concepts](https://docs.winglang.io/category/concepts) section in our docs.

For a comprehensive reference of the language, check out the [Wing Language
Specification](https://docs.winglang.io/reference/spec) and the [API
Reference](https://docs.winglang.io/reference/sdk).

## Community

We all hang out on [Wing Slack]. Come as you are, say hi, ask questions, help
friends, geek out! Alternatively, post any question you have on [GitHub
Discussions](https://github.com/winglang/wing/discussions).

## Contributing

We welcome and celebrate contributions from the community! Please see our
[contribution guide](./CONTRIBUTING.md) for more information about setting up a
development environment, what we are working on, where we need help and other
guidelines for contributing to the project.

We are also actively tracking planned features in our roadmap:

- [Wing Language Roadmap](https://github.com/orgs/winglang/projects/1/views/1)
- [Wing SDK Roadmap](https://github.com/orgs/winglang/projects/3/views/1)

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Joshswooft"><img src="https://avatars.githubusercontent.com/u/60711758?v=4?s=100" width="100px;" alt="Josh"/><br /><sub><b>Josh</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=Joshswooft" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.linkedin.com/in/mark-mcculloh/"><img src="https://avatars.githubusercontent.com/u/1237390?v=4?s=100" width="100px;" alt="Mark McCulloh"/><br /><sub><b>Mark McCulloh</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=MarkMcCulloh" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://rybicki.io/"><img src="https://avatars.githubusercontent.com/u/5008987?v=4?s=100" width="100px;" alt="Chris Rybicki"/><br /><sub><b>Chris Rybicki</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=Chriscbr" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/eladb"><img src="https://avatars.githubusercontent.com/u/598796?v=4?s=100" width="100px;" alt="Elad Ben-Israel"/><br /><sub><b>Elad Ben-Israel</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=eladb" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/staycoolcall911"><img src="https://avatars.githubusercontent.com/u/106860404?v=4?s=100" width="100px;" alt="Uri Bar"/><br /><sub><b>Uri Bar</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=staycoolcall911" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yoav-steinberg"><img src="https://avatars.githubusercontent.com/u/1160578?v=4?s=100" width="100px;" alt="yoav-steinberg"/><br /><sub><b>yoav-steinberg</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=yoav-steinberg" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://sepehrlaal.com/"><img src="https://avatars.githubusercontent.com/u/5657848?v=4?s=100" width="100px;" alt="Sepehr Laal"/><br /><sub><b>Sepehr Laal</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=3p3r" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://winglang.io/"><img src="https://avatars.githubusercontent.com/u/1727147?v=4?s=100" width="100px;" alt="Eyal Keren"/><br /><sub><b>Eyal Keren</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=ekeren" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://pallares.io/"><img src="https://avatars.githubusercontent.com/u/1077520?v=4?s=100" width="100px;" alt="Cristian Pallarés"/><br /><sub><b>Cristian Pallarés</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=skyrpex" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/ainvoner"><img src="https://avatars.githubusercontent.com/u/2538825?v=4?s=100" width="100px;" alt="Ainvoner"/><br /><sub><b>Ainvoner</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=ainvoner" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/hasanaburayyan"><img src="https://avatars.githubusercontent.com/u/45375125?v=4?s=100" width="100px;" alt="Hasan"/><br /><sub><b>Hasan</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=hasanaburayyan" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/shaiber01"><img src="https://avatars.githubusercontent.com/u/40353334?v=4?s=100" width="100px;" alt="shaiber01"/><br /><sub><b>shaiber01</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=shaiber01" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.matthewbonig.com/"><img src="https://avatars.githubusercontent.com/u/1559437?v=4?s=100" width="100px;" alt="Matthew Bonig"/><br /><sub><b>Matthew Bonig</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=mbonig" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/eladb2"><img src="https://avatars.githubusercontent.com/u/117929697?v=4?s=100" width="100px;" alt="eladb2"/><br /><sub><b>eladb2</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=eladb2" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/joao-zanutto"><img src="https://avatars.githubusercontent.com/u/11475695?v=4?s=100" width="100px;" alt="Joao Pedro Zanutto"/><br /><sub><b>Joao Pedro Zanutto</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=joao-zanutto" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yamatatsu"><img src="https://avatars.githubusercontent.com/u/11013683?v=4?s=100" width="100px;" alt="Tatsuya Yamamoto"/><br /><sub><b>Tatsuya Yamamoto</b></sub></a><br /><a href="https://github.com/winglang/wing/commits?author=yamatatsu" title="Code">💻</a></td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td align="center" size="13px" colspan="7">
        <img src="https://raw.githubusercontent.com/all-contributors/all-contributors-cli/1b8533af435da9854653492b1327a23a4dbd0a10/assets/logo-small.svg">
          <a href="https://all-contributors.js.org/docs/en/bot/usage">Add your contributions</a>
        </img>
      </td>
    </tr>
  </tfoot>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## License

This project is licensed under the [MIT License](./LICENSE.md). Contributions are made under our [contribution license](https://docs.winglang.io/terms-and-policies/contribution-license.html).

[wing slack]: https://t.winglang.io/slack
