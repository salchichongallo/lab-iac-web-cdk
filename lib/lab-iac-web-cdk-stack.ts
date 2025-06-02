import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class LabIacWebCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myFunction = new cdk.aws_lambda_nodejs.NodejsFunction(
      this,
      "HelloWorldFunction",
      {
        functionName: "HelloWorldLambda",
        entry: path.join(__dirname, "../src/lambdas/hello-world.ts"),
        handler: "handler",
        runtime: lambda.Runtime.NODEJS_20_X,
      }
    );

    const myFunctionUrl = myFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, "myFunctionUrl", {
      value: myFunctionUrl.url,
    });
  }
}
