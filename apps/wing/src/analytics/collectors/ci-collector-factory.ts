import { Collector } from "./collector";
import { GithubActionCollector } from "./github-action-collector";

export interface CIData {
  name: string;
  serverUrl: string;
  toBranch: string;
  fromBranch: string;
  prId: string;
  prUrl: string;
  runId: string;
  runUrl: string;
  commitHash: string;
  commitUrl: string;
  repositoryUrl: string;
  authorName: string;
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

export class UnimplementedCICollector extends Collector {
  async canCollect(): Promise<boolean> {
    return false;
  }

  async collect(): Promise<CIData> {
    return {} as any;
  }
}

export class CICollectorFactory {
  static create(): Collector {
    const type = CICollectorFactory.getCIType();
    switch(type) {
      case CIType.GITHUB_ACTIONS:
        return new GithubActionCollector();
      default:
        return new UnimplementedCICollector();
    }
  }

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
}