---
title: Troubleshooting
id: Troubleshooting
keywords: [Wing contributors, contributors, Troubleshooting]
---

# 🔨 Troubleshooting

## 🐛 Common build issues `npm run build`

### Mac dev tools: `error: linking with cc failed: exit code: 1`
Make sure to install Mac dev tools: `xcode-select --install`

### NPM registry: `npm ERR! Cannot read properties of null (reading 'pickAlgorithm')`
run `npm cache clear --force` and `npm config set registry https://registry.npmjs.org/` before running `npm run build`'