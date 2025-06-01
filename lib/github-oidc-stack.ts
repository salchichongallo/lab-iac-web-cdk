import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";

const CLIENT_ID = "sts.amazonaws.com";
const GITHUB_DOMAIN = "token.actions.githubusercontent.com";

interface GitHubStackProps extends cdk.StackProps {
  repository: string;
}

export class GitHubOidcStack extends cdk.Stack {
  constructor(
    readonly scope: Construct,
    readonly id: string,
    private readonly props?: GitHubStackProps
  ) {
    super(scope, id, props);

    const provider = new iam.OpenIdConnectProvider(
      this,
      "OpenIdGitHubProvider",
      {
        url: `https://${GITHUB_DOMAIN}`,
        clientIds: [CLIENT_ID],
      }
    );

    const allowedRepositories = [`repo:${this.props!.repository}`];
    const conditions: iam.Conditions = {
      StringEquals: {
        [`${GITHUB_DOMAIN}:aud`]: CLIENT_ID,
      },
      StringLike: {
        [`${GITHUB_DOMAIN}:sub`]: allowedRepositories,
      },
    };

    const role = new iam.Role(this, "GitHubActionsRole", {
      roleName: "GitHubActionsRole",
      description:
        "This role is used via GitHub Actions to perform any actions to AWS services.",
      assumedBy: new iam.WebIdentityPrincipal(
        provider.openIdConnectProviderArn,
        conditions
      ),
      maxSessionDuration: cdk.Duration.hours(1),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName("AdministratorAccess"),
      ],
    });

    new cdk.CfnOutput(this, "GitHubActionsRoleOutputARN", {
      value: role.roleArn,
    });
  }
}
