import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import FileCodeBlock from './FileCodeBlock';

import getExamplePlatforms from '../examples/getExamplePlatforms';
import getExampleWingFile from '../examples/getExampleWingFile';

// Import the CSS module
import styles from './CodeComparison.module.css';

const CodeComparison = ({exampleName, desiredPlatformLabels}) => {
  const filteredPlatforms = getExamplePlatforms(exampleName, desiredPlatformLabels);
  const wingFile = getExampleWingFile(exampleName);

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
                {wingFile.name}
                <FileCodeBlock filePath={wingFile.path} codeType="language-javascript" />
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
