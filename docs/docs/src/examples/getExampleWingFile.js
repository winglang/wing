// We cannot parse the folder structure at runtime because of Docusaurus and webpack limitations

import functionUploadToBucket from './function-upload-to-bucket/wing';

const examplePlatforms = {
    "function-upload-to-bucket": functionUploadToBucket
};

const getExampleWingFile = (exampleName) => {
  if (examplePlatforms.hasOwnProperty(exampleName)) {
    return examplePlatforms[exampleName];
  } else {
    throw new Error(`Example ${exampleName} not found`);
  }
};

export default getExampleWingFile;
