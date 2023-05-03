import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import FileCodeBlock from './FileCodeBlock';
import helloWPath from '!file-loader!../examples/function-upload-to-bucket/wing/hello.w';

import getExamplePlatforms from '../examples/getExamplePlatforms';
// Import the CSS module
import styles from './CodeComparison.module.css';

const CodeComparison = ({exampleName, desiredPlatformLabels}) => {
  const filteredPlatforms = getExamplePlatforms(exampleName, desiredPlatformLabels);

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
      <Tabs groupId="platforms" defaultValue={filteredPlatforms[0]?.value} values={filteredPlatforms}>
        {filteredPlatforms.map(platform => (
          <TabItem value={platform.value} key={platform.value}>
            {platform.files.map(file => (
              <React.Fragment key={file.name}>
                <div>{file.name}</div>
                <FileCodeBlock filePath={file.path} codeType={file.codeType} />
              </React.Fragment>
            ))}
          </TabItem>
        ))}
      </Tabs>
      </div>
    </div>
  );
};

export default CodeComparison;
