import { Collector } from "./collector";

export interface CIData {
  name: string;
}

// Map of CI environment variable identifiers to CI names
const CI_ENV: { [key: string]: string } = {
  // https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
  GITHUB_ACTIONS: "GITHUB_ACTIONS",
  // https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
  GITLAB_CI: "GITLAB_CI",
  // https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
  JENKINS_URL: "JENKINS",
  // https://circleci.com/docs/variables/#built-in-environment-variables
  CIRCLECI: "CIRCLECI",
  // https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/
  BITBUCKET_BUILD_NUMBER: "BITBUCKET",
  // https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml
  BUILD_BUILDID: "AZURE_DEVOPS",
  // https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
  TEAMCITY_VERSION: "TEAMCITY",
  // https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-variables.html
  CODEBUILD_BUILD_ID: "CODEBUILD",
};

export class CICollector extends Collector {
  async collect(): Promise<CIData | undefined> {
    for (const e in CI_ENV) {
      if (e in process.env) {
        return { name: CI_ENV[`${e}`] };
      }
    }
    return undefined;
  }
}
