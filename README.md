# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Allow GitHub Actions work with AWS

On your local machine, run:

```sh
GITHUB_REPOSITORY=salchichongallo/lab-iac-web-cdk cdk deploy GitHubOidcStack
```

The stack gives administrator access to the newly created role. You can tweak the stack to customize the given policies.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `npx cdk deploy` deploy this stack to your default AWS account/region
- `npx cdk diff` compare deployed stack with current state
- `npx cdk synth` emits the synthesized CloudFormation template
