# [build-failure.test.w](../../../../../../examples/tests/sdk_tests/container/build-failure.test.w) | test | sim

## stdout.log
```log
[INFO] (no test) | Building build-failure:254b90b319982ab8774e4d039952d2f8 from ./build-failure...
[ERROR] (no test) | Error: Failed to start container: non-zero exit code 1: #0 building with "default" instance using docker driver

#1 [internal] load .dockerignore
#1 transferring context: 2B 0.0s done
#1 DONE 0.0s

#2 [internal] load build definition from Dockerfile
#2 transferring dockerfile: 71B 0.0s done
#2 DONE 0.0s

#3 [auth] library/node:pull token for registry-1.docker.io
#3 DONE 0.0s

#4 [internal] load metadata for docker.io/library/node:20.8.0-alpine
#4 DONE 0.5s

#5 [1/2] FROM docker.io/library/node:20.8.0-alpine@sha256:37750e51d61bef92165b2e29a77da4277ba0777258446b7a9c99511f119db096
#5 resolve docker.io/library/node:20.8.0-alpine@sha256:37750e51d61bef92165b2e29a77da4277ba0777258446b7a9c99511f119db096 done
#5 sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995 0B / 2.34MB 0.1s
#5 sha256:37750e51d61bef92165b2e29a77da4277ba0777258446b7a9c99511f119db096 1.43kB / 1.43kB done
#5 sha256:80cc2c520781c1a4681e59df6791d81a432a6cb3da0c385d8d62e9f16acf8e5f 1.16kB / 1.16kB done
#5 sha256:e722ab35703785bed3cf7b5f8f87652efbb311562fa6ec4634445ee31e9ec224 6.78kB / 6.78kB done
#5 sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 0B / 3.40MB 0.1s
#5 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 5.24MB / 49.80MB 0.1s
#5 sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995 2.34MB / 2.34MB 0.2s done
#5 sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 3.40MB / 3.40MB 0.2s done
#5 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 14.68MB / 49.80MB 0.2s
#5 extracting sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 0.1s
#5 sha256:20bf5151d902500e94a168975a49a04897e1f895290d75782ff2da96becab400 0B / 451B 0.2s
#5 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 22.60MB / 49.80MB 0.4s
#5 extracting sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 0.2s done
#5 sha256:20bf5151d902500e94a168975a49a04897e1f895290d75782ff2da96becab400 451B / 451B 0.2s done
#5 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 28.31MB / 49.80MB 0.5s
#5 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 34.60MB / 49.80MB 0.6s
#5 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 42.99MB / 49.80MB 0.8s
#5 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 49.80MB / 49.80MB 0.9s
#5 extracting sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459
#5 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 49.80MB / 49.80MB 0.9s done
#5 extracting sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 3.8s done
#5 extracting sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995
#5 extracting sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995 0.1s done
#5 extracting sha256:20bf5151d902500e94a168975a49a04897e1f895290d75782ff2da96becab400
#5 extracting sha256:20bf5151d902500e94a168975a49a04897e1f895290d75782ff2da96becab400 done
#5 DONE 5.4s

#6 [2/2] RUN exit 1
#6 ERROR: process "<ABSOLUTE>/sh -c exit 1" did not complete successfully: exit code: 1
------
 > [2/2] RUN exit 1:
------
Dockerfile:2
--------------------
   1 |     FROM node:20.8.0-alpine
   2 | >>> RUN exit 1
--------------------
ERROR: failed to solve: process "<ABSOLUTE>/sh -c exit 1" did not complete successfully: exit code: 1
at 0-alpine → 0-alpine sha256:37750:undefined
pass ─ build-failure.test.wsim (no tests)

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

