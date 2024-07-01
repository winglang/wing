# AWSCDK Platform for Winglang

This custom Winglang Platform allows you to deploy your compiled Wing code to AWS CDK.

## Installation

From within your Wing project directory, run:
```bash
# Install the platform
npm i @winglang/platform-awscdk

# Compile your project
wing compile --platform @winglang/platform-awscdk <wing_entrypoint_file>
```