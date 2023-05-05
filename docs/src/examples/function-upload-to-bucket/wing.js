// We cannot parse the folder structure at runtime because of Docusaurus and webpack limitations

import wingHelloPath from '!file-loader!./wing/hello.w';
  
export default { name: "hello.js", path: wingHelloPath };
