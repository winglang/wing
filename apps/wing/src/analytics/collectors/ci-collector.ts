import { Collector } from "./collector";

export interface CIData {
  name: string;
}

export enum CIType {
  GITHUB_ACTIONS = "github_action",
  GITLAB_CI = "gitlab_ci",
  JENKINS = "jenkins",
  CIRCLECI = "circleci",
  BITBUCKET = "bitbucket",
  AZURE_DEVOPS = "azure_devops",
  TEAMCITY = "teamcity",
  AWS_CODEBUILD = "aws_codebuild",
  NONE = "none",
}

export class CICollector extends Collector {
  
  static inCI(): boolean {
    return this.getCIType() !== CIType.NONE;
  }

  static getCIType(): CIType {
    // Github builtin environment variables
    // https://docs.github.com/en/actions/learn-github-actions/variables#default-environment-variables
    if (process.env.GITHUB_ACTIONS) {
      return CIType.GITHUB_ACTIONS;
    }
    // Gitlab builtin environment variables
    // https://docs.gitlab.com/ee/ci/variables/predefined_variables.html
    if (process.env.GITLAB_CI) {
      return CIType.GITLAB_CI;
    }
    // Jenkins builtin environemnt variables
    // https://www.jenkins.io/doc/book/pipeline/jenkinsfile/#using-environment-variables
    if (process.env.JENKINS_URL) {
      return CIType.JENKINS;
    }
    // CircleCI builtin environment variables
    // https://circleci.com/docs/variables/#built-in-environment-variables
    if (process.env.CIRCLECI) {
      return CIType.CIRCLECI;
    }
    // Bitbucket builtin environment variables
    // https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/
    if (process.env.BITBUCKET_BUILD_NUMBER && process.env.CI) {
      return CIType.BITBUCKET;
    }
    // Azure DevOps builtin environment variables
    // https://docs.microsoft.com/en-us/azure/devops/pipelines/build/variables?view=azure-devops&tabs=yaml
    if (process.env.BUILD_BUILDID) {
      return CIType.AZURE_DEVOPS;
    }
    // TeamCity builtin environment variables
    // https://www.jetbrains.com/help/teamcity/predefined-build-parameters.html
    if (process.env.TEAMCITY_VERSION) {
      return CIType.TEAMCITY;
    }
    // AWS Codebuild builtin environment variables
    // https://docs.aws.amazon.com/codepipeline/latest/userguide/reference-variables.html
    if (process.env.CODEBUILD_BUILD_ID) {
      return CIType.AWS_CODEBUILD;
    }
    return CIType.NONE;
  }

  async canCollect(): Promise<boolean> {
    return CICollector.inCI();
  }

  async collect(): Promise<CIData> {
    return { name: CICollector.getCIType() };
  }
}