
import * as pipeline from '@aws-cdk/pipelines'
import * as cdk from '@aws-cdk/core';
import { Artifact } from '@aws-cdk/aws-codepipeline';
import * as cpactions from '@aws-cdk/aws-codepipeline-actions'
import { DeployStage } from './stage/deploy.stage';
export class PipelineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);
        const source_artifact = new Artifact()
        const cloud_assembly_artifact = new Artifact()

        const pap = new pipeline.CdkPipeline(this, "auto-deploy", {
            cloudAssemblyArtifact: cloud_assembly_artifact,
            pipelineName: "lambda-deploy-pipeline",
            sourceAction: new cpactions.GitHubSourceAction({
                output: source_artifact,
                oauthToken: cdk.SecretValue.secretsManager("github-token"),
                actionName: "Source-Action",
                repo: "lambda-through-cdk",
                owner: "karannishad",
                trigger: cpactions.GitHubTrigger.POLL
            }),
            synthAction: new pipeline.SimpleSynthAction({
                sourceArtifact: source_artifact,
                cloudAssemblyArtifact: cloud_assembly_artifact,
                installCommands: ["npm install -g aws-cdk && npm i"],
                synthCommand: "cdk synth"
            })
        })
        pap.addApplicationStage(new DeployStage(this,"deploy-stage"))
    }
}