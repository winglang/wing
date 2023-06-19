# [resource.w](../../../../../examples/tests/valid/resource.w) | test | sim

## stdout.log
```log
ERROR: Resource "root/env0/Bar" does not support inflight operation "foo.inflightField" (requested by "root/env0/test:test/Handler")

../../../../examples/tests/valid/target/test/resource.wsim.465176.tmp/.wing/preflight.js:100
             Bar._registerBindObject(this.e, host, []);
           }
>>         super._registerBind(host, ops);
         }
       }

 




Tests 1 failed (1) 
Duration <DURATION>

```

