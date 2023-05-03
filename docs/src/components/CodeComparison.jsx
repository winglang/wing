import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import FileCodeBlock from './FileCodeBlock';
import helloWPath from '!file-loader!../examples/wing/hello.w';
import pulumiIndexPath from '!file-loader!../examples/pulumi/index.js';
import pulumiMainPath from '!file-loader!../examples/pulumi/main.ts';
import pulumiPulumiPath from '!file-loader!../examples/pulumi/pulumi.yaml';
import terraformIndexPath from '!file-loader!../examples/terraform/index.js';
import terraformMainPath from '!file-loader!../examples/terraform/main.tf';
import cdkHelloPath from '!file-loader!../examples/aws-cdk/hello.js';
import cdkIndexPath from '!file-loader!../examples/aws-cdk/index.js';
import cdktfIndexPath from '!file-loader!../examples/cdktf/index.js';
import cdktfMainPath from '!file-loader!../examples/cdktf/main.ts';
import cloudformationIndexPath from '!file-loader!../examples/cloudformation/index.js';
import cloudformationTemplatePath from '!file-loader!../examples/cloudformation/template.yaml';

// Import the CSS module
import styles from './CodeComparison.module.css';

const CodeComparison = () => {
  return (
    <div className={styles.codeComparisonContainer}>
      <div className={styles.leftPanel}>
        <Tabs
          groupId="wing"
          defaultValue="wing"
          values={[
            { label: 'Wing', value: 'wing' },
          ]}
        >
            <TabItem value="wing">
                hello.w
                <FileCodeBlock filePath={helloWPath} codeType="language-javascript" />
            </TabItem>
        </Tabs>
      </div>
      <div className={styles.rightPanel}>
        <Tabs
          groupId="platforms"
          defaultValue="pulumi"
          values={[
            { label: 'Pulumi', value: 'pulumi' },
            { label: 'Terraform', value: 'terraform' },
            { label: 'AWSCDK', value: 'aws-cdk' },
            { label: 'CDKTF', value: 'cdktf' },
            { label: 'Cloudformation', value: 'cloudformation' },
          ]}
        >
          <TabItem value="pulumi">
            main.ts
            <FileCodeBlock filePath={pulumiMainPath} codeType="language-typescript" /> 
            index.js
            <FileCodeBlock filePath={pulumiIndexPath} codeType="language-javascript" /> 
            pulumi.yaml
            <FileCodeBlock filePath={pulumiPulumiPath} codeType="language-yaml" />      
            </TabItem>
          <TabItem value="terraform">
            main.tf
            <FileCodeBlock filePath={terraformMainPath} codeType="language-javascript" /> 
            index.js
            <FileCodeBlock filePath={terraformIndexPath} codeType="language-javascript" /> 
          </TabItem>
          <TabItem value="aws-cdk">
            hello.js
            <FileCodeBlock filePath={cdkHelloPath} codeType="language-javascript" /> 
            index.js
            <FileCodeBlock filePath={cdkIndexPath} codeType="language-javascript" /> 
          </TabItem>
          <TabItem value="cdktf">
            index.js
            <FileCodeBlock filePath={cdktfIndexPath} codeType="language-javascript" /> 
            main.ts
            <FileCodeBlock filePath={cdktfMainPath} codeType="language-typescript" /> 
          </TabItem>
          <TabItem value="cloudformation">
            index.js
            <FileCodeBlock filePath={cloudformationIndexPath} codeType="language-javascript" /> 
            main.ts
            <FileCodeBlock filePath={cloudformationTemplatePath} codeType="language-yaml" /> 
          </TabItem>
        </Tabs>
      </div>
    </div>
  );
};

export default CodeComparison;
