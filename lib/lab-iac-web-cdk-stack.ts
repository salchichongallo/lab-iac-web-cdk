import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";

export class LabIacWebCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myFunction = new lambda.Function(this, "HelloWorldFunction", {
      functionName: "HelloWorldLambda",
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "hello-world.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "../src/lambdas")),
    });

    const myFunctionUrl = myFunction.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    new cdk.CfnOutput(this, "myFunctionUrl", {
      value: myFunctionUrl.url,
    });
  }
}
