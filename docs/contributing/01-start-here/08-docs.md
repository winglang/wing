---
title: Docs and examples
id: docs
keywords: [Wing contributors, contributors]
---

## 📕 How do I update documentation

Our documentation lives under the [`docs`](https://github.com/winglang/wing/tree/main/docs)
directory of the Wing GitHub repository. 

To propose an update to the docs, simply submit a pull request against the relevant markdown file.

## 📕 Can I view the local documentation website on my machine?

Yes, you can! We use the awesome [Docusaurus](https://docusaurus.io/) project for our docs.

To start the documentation website, run the following command from the root of the repo:

```sh
pnpm docs
```

This magical script will clone the [winglang/docsite](https://github.com/winglang/docsite)
repository into `~/.winglang-docsite`, symlink your local copy into it and start a browser with the
site.
