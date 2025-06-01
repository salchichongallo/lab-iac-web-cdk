#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { LabIacWebCdkStack } from "../lib/lab-iac-web-cdk-stack";
import { GitHubOidcStack } from "../lib/github-oidc-stack";

const app = new cdk.App();

new GitHubOidcStack(app, "GitHubOidcStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
  repository: process.env.GITHUB_REPOSITORY!,
});

/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
new LabIacWebCdkStack(app, "LabIacWebCdkStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
