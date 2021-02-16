import * as cdk from "@aws-cdk/core";
import { LearnCdkStack } from "../learn-cdk-stack";

export class DeployStage extends cdk.Stage {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
        super(scope, id, props)

        const service= new LearnCdkStack(this, 'LearnCdkStack');
    }
}