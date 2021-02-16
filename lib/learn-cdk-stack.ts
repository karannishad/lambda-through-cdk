import * as cdk from '@aws-cdk/core';
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from 'path';
import * as apigw from '@aws-cdk/aws-apigateway';
export class LearnCdkStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    let handler= new lambda.Function(this, "Main",{
      runtime: lambda.Runtime.PYTHON_3_7,
      handler: "app.run",
      code: lambda.Code.fromAsset(path.join(__dirname,"../code")),
      functionName: "learn-cdk-test-lambda"
    })
    let api= new apigw.LambdaRestApi(this,"lambda-api",{
      handler: handler.currentVersion,
      proxy:false
    })
    api.root.addMethod("POST")
    
  }
}
