# [container.test.w](../../../../../../examples/tests/sdk_tests/container/container.test.w) | test | sim

## stdout.log
```log
pass ┌ container.test.wsim » root/env0/test:get echo
     │ pulling hashicorp/http-echo
     │ starting container from image hashicorp/http-echo
     │ docker run --detach --rm --name wing-container-01HTM6SEHQW36DD99EFWFQDECS -p 5678 hashicorp/http-echo -text=bang
     │ containerName=wing-container-01HTM6SEHQW36DD99EFWFQDECS
     │ building locally from ./my-docker-image and tagging my-app:a9ae83b54b1ec21faa1a3255f05c095c...
     │ starting container from image my-app:a9ae83b54b1ec21faa1a3255f05c095c
     │ docker run --detach --rm --name wing-container-01HTM6SHS4S0453Z8TXGKMJAV3 -p 3000 my-app:a9ae83b54b1ec21faa1a3255f05c095c
     │ containerName=wing-container-01HTM6SHS4S0453Z8TXGKMJAV3
     │ image my-app:a9ae83b54b1ec21faa1a3255f05c095c already exists
     │ starting container from image my-app:a9ae83b54b1ec21faa1a3255f05c095c
     │ docker run --detach --rm --name wing-container-01HTM6SSZKK6PMJQJGTDJ7TDM1 -p 3000 my-app:a9ae83b54b1ec21faa1a3255f05c095c
     │ containerName=wing-container-01HTM6SSZKK6PMJQJGTDJ7TDM1
     │ image hashicorp/http-echo already exists
     │ starting container from image hashicorp/http-echo
     │ docker run --detach --rm --name wing-container-01HTM6STFJS0FESRNDXGYVC2FK -p 5678 hashicorp/http-echo -text=bang
     │ containerName=wing-container-01HTM6STFJS0FESRNDXGYVC2FK
     │ bang
     └ 
pass ┌ container.test.wsim » root/env1/test:get app 
     │ pulling hashicorp/http-echo
     │ starting container from image hashicorp/http-echo
     │ docker run --detach --rm --name wing-container-01HTM6SEHQW36DD99EFWFQDECS -p 5678 hashicorp/http-echo -text=bang
     │ containerName=wing-container-01HTM6SEHQW36DD99EFWFQDECS
     │ building locally from ./my-docker-image and tagging my-app:a9ae83b54b1ec21faa1a3255f05c095c...
     │ starting container from image my-app:a9ae83b54b1ec21faa1a3255f05c095c
     │ docker run --detach --rm --name wing-container-01HTM6SHS4S0453Z8TXGKMJAV3 -p 3000 my-app:a9ae83b54b1ec21faa1a3255f05c095c
     │ containerName=wing-container-01HTM6SHS4S0453Z8TXGKMJAV3
     │ image my-app:a9ae83b54b1ec21faa1a3255f05c095c already exists
     │ starting container from image my-app:a9ae83b54b1ec21faa1a3255f05c095c
     │ docker run --detach --rm --name wing-container-01HTM6SSZKK6PMJQJGTDJ7TDM1 -p 3000 my-app:a9ae83b54b1ec21faa1a3255f05c095c
     │ containerName=wing-container-01HTM6SSZKK6PMJQJGTDJ7TDM1
     │ image hashicorp/http-echo already exists
     │ starting container from image hashicorp/http-echo
     │ docker run --detach --rm --name wing-container-01HTM6STFJS0FESRNDXGYVC2FK -p 5678 hashicorp/http-echo -text=bang
     │ containerName=wing-container-01HTM6STFJS0FESRNDXGYVC2FK
     │ bang
     │ 
     └ Hello, Wingnuts!
 
 
Tests 2 passed (2)
Test Files 1 passed (1)
Duration <DURATION>
```

