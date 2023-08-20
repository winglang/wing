// We cannot parse the folder structure at runtime because of Docusaurus and webpack limitations

import wingHelloPath from '!file-loader?outputPath=docs!./wing/hello.w';
export default { name: "hello.w", path: wingHelloPath };
