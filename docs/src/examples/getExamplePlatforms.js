// We cannot parse the folder structure at runtime because of Docusaurus and webpack limitations

import functionUploadToBucket from './function-upload-to-bucket/platforms';

const examplePlatforms = {
    "function-upload-to-bucket": functionUploadToBucket
};

const getExamplePlatforms = (exampleName, desiredPlatforms) => {
  if (examplePlatforms.hasOwnProperty(exampleName)) {
    return examplePlatforms[exampleName](desiredPlatforms);
  } else {
    throw new Error(`Example ${exampleName} not found`);
  }
};

export default getExamplePlatforms;
