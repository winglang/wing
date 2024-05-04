# [container.test.w](../../../../../../examples/tests/sdk_tests/container/container.test.w) | test | sim

## stdout.log
```log
[INFO] get echo | 2024/05/<TIMESTAMP>:37:09 [INFO] server is listening on :5678
[INFO] get app | #0 building with "default" instance using docker driver

#1 [internal] load .dockerignore
#1 transferring context: 2B done
#1 DONE 0.0s

#2 [internal] load build definition from Dockerfile
#2 transferring dockerfile: 130B done
#2 DONE 0.0s
[INFO] get app | #3 [auth] library/node:pull token for registry-1.docker.io
[INFO] get app | #3 DONE 0.0s

#4 [internal] load metadata for docker.io/library/node:20.8.0-alpine
[INFO] get app | #4 DONE 0.5s
[INFO] get app | #5 [internal] load build context
#5 transferring context: 375B done
#5 DONE 0.0s

#6 [1/2] FROM docker.io/library/node:20.8.0-alpine@sha256:37750e51d61bef92165b2e29a77da4277ba0777258446b7a9c99511f119db096
#6 resolve docker.io/library/node:20.8.0-alpine@sha256:37750e51d61bef92165b2e29a77da4277ba0777258446b7a9c99511f119db096 done
#6 sha256:e722ab35703785bed3cf7b5f8f87652efbb311562fa6ec4634445ee31e9ec224 6.78kB / 6.78kB done
#6 sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 1.05MB / 3.40MB 0.1s
#6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 0B / 49.80MB 0.1s
#6 sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995 0B / 2.34MB 0.1s
#6 sha256:37750e51d61bef92165b2e29a77da4277ba0777258446b7a9c99511f119db096 1.43kB / 1.43kB done
#6 sha256:80cc2c520781c1a4681e59df6791d81a432a6cb3da0c385d8d62e9f16acf8e5f 1.16kB / 1.16kB done
[INFO] get app | #6 sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 3.40MB / 3.40MB 0.1s done
[INFO] get app | #6 sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995 2.34MB / 2.34MB 0.2s done
#6 extracting sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 0.1s
#6 sha256:20bf5151d902500e94a168975a49a04897e1f895290d75782ff2da96becab400 451B / 451B 0.2s done
[INFO] get app | #6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 7.34MB / 49.80MB 0.3s
[INFO] get app | #6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 17.83MB / 49.80MB 0.5s
#6 extracting sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 0.3s done
[INFO] get app | #6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 23.07MB / 49.80MB 0.6s
[INFO] get app | #6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 33.55MB / 49.80MB 0.8s
[INFO] get app | #6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 44.04MB / 49.80MB 1.0s
[INFO] get app | #6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 49.28MB / 49.80MB 1.1s
[INFO] get app | #6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 49.80MB / 49.80MB 1.2s done
#6 extracting sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459
[INFO] get app | #6 extracting sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 3.7s done
[INFO] get app | #6 extracting sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995
[INFO] get app | #6 extracting sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995 0.1s done
#6 extracting sha256:20bf5151d902500e94a168975a49a04897e1f895290d75782ff2da96becab400 done
#6 DONE 5.5s
[INFO] get app | #7 [2/2] ADD index.js <ABSOLUTE>/index.js
#7 DONE 0.0s

#8 exporting to image
#8 exporting layers
[INFO] get app | #8 exporting layers 0.4s done
[INFO] get app | #8 writing image sha256:29205bcc047325c53d39888711e82ffa3f55188c821d6b40b27bc79810851a7f done
#8 naming to docker.io/library/my-app:a9ae83b54b1ec21faa1a3255f05c095c done
#8 DONE 0.4s
[INFO] get app | 2024/05/<TIMESTAMP>:37:18 [INFO] server is listening on :5678
[INFO] get echo | bang
[INFO] get echo | 
[INFO] get app | Hello, Wingnuts!
pass ─ container.test.wsim » root/env0/test:get echo
pass ─ container.test.wsim » root/env1/test:get app 

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

