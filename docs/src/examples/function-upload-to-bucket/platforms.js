// We cannot parse the folder structure at runtime because of Docusaurus and webpack limitations

import pulumiIndexPath from '!file-loader!./pulumi/index.js';
import pulumiMainPath from '!file-loader!./pulumi/main.ts';
import pulumiPulumiPath from '!file-loader!./pulumi/pulumi.yaml';

import terraformIndexPath from '!file-loader!./terraform/index.js';
import terraformMainPath from '!file-loader!./terraform/main.tf';

import cdkHelloPath from '!file-loader!./aws-cdk/hello.js';
import cdkIndexPath from '!file-loader!./aws-cdk/index.js';

import cdktfIndexPath from '!file-loader!./cdktf/index.js';
import cdktfMainPath from '!file-loader!./cdktf/main.ts';

import cloudformationIndexPath from '!file-loader!./cloudformation/index.js';
import cloudformationTemplatePath from '!file-loader!./cloudformation/template.yaml';

const allPlatforms = [
  {
    label: 'Pulumi',
    value: 'pulumi',
    files: [
      { name: 'main.ts', path: pulumiMainPath, codeType: 'language-typescript' },
      { name: 'index.js', path: pulumiIndexPath, codeType: 'language-javascript' },
      { name: 'pulumi.yaml', path: pulumiPulumiPath, codeType: 'language-yaml' },
    ],
  },
  {
    label: 'Terraform',
    value: 'terraform',
    files: [
      { name: 'main.tf', path: terraformMainPath, codeType: 'language-javascript' },
      { name: 'index.js', path: terraformIndexPath, codeType: 'language-javascript' },
    ],
  },
  {
    label: 'AWSCDK',
    value: 'aws-cdk',
    files: [
      { name: 'hello.js', path: cdkHelloPath, codeType: 'language-javascript' },
      { name: 'index.js', path: cdkIndexPath, codeType: 'language-javascript' },
    ],
  },
  {
    label: 'CDKTF',
    value: 'cdktf',
    files: [
      { name: 'main.ts', path: cdktfMainPath, codeType: 'language-typescript' },
      { name: 'index.js', path: cdktfIndexPath, codeType: 'language-javascript' },
    ],
  },
  {
    label: 'Cloudformation',
    value: 'cloudformation',
    files: [
        { name: 'template.yaml', path: cloudformationTemplatePath, codeType: 'language-yaml' },
        { name: 'index.js', path: cloudformationIndexPath, codeType: 'language-javascript' },
    ],
  },
];

const getPlatforms = (desiredPlatforms) => {
    return desiredPlatforms ? allPlatforms.filter(platform => desiredPlatforms.includes(platform.label)) : allPlatforms;
};
  
export default getPlatforms;
