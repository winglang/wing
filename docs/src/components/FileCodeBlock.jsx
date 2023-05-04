// FileCodeBlock.jsx
import React, { useState, useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';

function FileCodeBlock({ filePath, codeType }) {
  const [fileContent, setFileContent] = useState('');

  useEffect(() => {
    fetch(filePath)
      .then((response) => response.text())
      .then((text) => setFileContent(text));
  }, [filePath]);

  return <CodeBlock
  className={codeType}
  children={fileContent}
  >
</CodeBlock>;
}

export default FileCodeBlock;
