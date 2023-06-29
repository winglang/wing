# [construct-base.w](../../../../../examples/tests/valid/construct-base.w) | test | sim

## stdout.log
```log
error: Cannot find module "@cdktf/provider-aws" in source directory: Unable to load "cdktf": Module not found from "../../../../examples/tests/valid/node_modules/@cdktf/provider-aws"
  --> ../../../../examples/tests/valid/construct-base.w:4:1
  |
4 | bring "@cdktf/provider-aws" as aws;
  | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Cannot find module "@cdktf/provider-aws" in source directory: Unable to load "cdktf": Module not found from "../../../../examples/tests/valid/node_modules/@cdktf/provider-aws"


error: Unknown symbol "aws"
   --> ../../../../examples/tests/valid/construct-base.w:20:13
   |
20 | let q = new aws.sqsQueue.SqsQueue();
   |             ^^^ Unknown symbol "aws"


 
<<<<<<< HEAD




Tests 1 failed (1) 
=======
 
Tests 1 passed (1)
Test Files 1 passed (1)
>>>>>>> e65e61b6f133e9791aa3e3a46ed4dc4909de89c3
Duration <DURATION>
```

