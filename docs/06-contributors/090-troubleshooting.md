---
title: Troubleshooting
id: Troubleshooting
keywords: [Wing contributors, contributors, Troubleshooting]
---

# 🔨 Troubleshooting

## `npm run build`

#### Mac dev tools: `error: linking with cc failed: exit code: 1`
Make sure to install Mac dev tools:
```sh
xcode-select --install
```

#### NPM registry: `npm ERR! Cannot read properties of null (reading 'pickAlgorithm')`
```sh
npm cache clear --force 
npm config set registry https://registry.npmjs.org/
```
