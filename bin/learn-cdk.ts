#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { LearnCdkStack } from '../lib/learn-cdk-stack';
import { PipelineStack } from '../lib/pipeline.stack';

const app = new cdk.App();
// const envMum = { region: 'ap-south-1' };
new LearnCdkStack(app, 'LearnCdkStack');
new PipelineStack(app,"PipelineStack");
app.synth()