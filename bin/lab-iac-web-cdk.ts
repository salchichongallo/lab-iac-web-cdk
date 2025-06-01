#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { LabIacWebCdkStack } from "../lib/lab-iac-web-cdk-stack";

const app = new cdk.App();

/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
new LabIacWebCdkStack(app, "LabIacWebCdkStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
