# User story for MVP-1 (bucket upload)
## Background:
Dave, a dev in Acme Software Solutions Inc. is working on a new app for a client. 
Client needs…yada yada yada… cloud… yada yada… 
Since Dave recently received an exclusive invite to the Wing Early Adopters Program, he chose to take the opportunity to try out and build the project with Wing.

## Requirements:
1. Dave goes to the project website and installs Wing on his Mac.  
   1. Should support Linux and Windows too.
   1. Currently, installation will have 3 steps:
      1. Install the Wing Console app via npm (commercial license).
      1. Install the toolchain (CLI) via npm (opensource license).
      1. Install the VSCode plugin for Wing (opensource license).
1. Dave skims through the "Getting started with Wing" tutorial, reviews the reference documentation and quickly moves on to coding.
1. Dave creates a new file named bucket-uploader.w for Wing code.
1. Dave writes the code using the WingSDK Bucket resource.
   1. The compiler should allow using constructs.
   1. WingSDK should be included in the Wing distribution.
1. Dave develops using VSCode. The VSCode plugin supports a developer experience with autocomplete, go to definition, documentation on hover and compiler diagnostics.
1. Dave receives compiler errors on type mismatch and wrong syntax.
   1. VSCode should recompile and hot reload code changes.
1. Dave uses the logs to figure out what his code is doing.
1. Dave compiles locally using the Wing CLI by running: wing build --target local bucket-uploader.w
   1. An executable file (bucket-uploader.wx - a zip file) is created, containing a local js file.
1. Dave runs the app locally using the Wing CLI by running: wing run bucket-uploader.wx
    1. Dave can interact with the app by writing unit tests or using Postman etc.
1. Dave compiles to aws using the Wing CLI by running: wing build --target aws bucket-uploader.w
   1. This creates the applicable Terraform files.
1. Dave deploys to AWS directly through Terraform.