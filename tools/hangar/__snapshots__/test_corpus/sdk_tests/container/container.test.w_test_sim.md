# [container.test.w](../../../../../../examples/tests/sdk_tests/container/container.test.w) | test | sim

## stdout.log
```log
[INFO] get echo | Using default tag: latest
[INFO] get echo | latest: Pulling from hashicorp/http-echo
[INFO] get echo | 3d17c666b2a2: Pulling fs layer
e5dbef90bae3: Pulling fs layer
2047f8b74670: Pulling fs layer
eebb06941f3e: Pulling fs layer
02cd68c0cbf6: Pulling fs layer
d3c894b5b2b0: Pulling fs layer
b40161cd83fc: Pulling fs layer
65efb1cabba4: Pulling fs layer
13547472c521: Pulling fs layer
5d4746900976: Pulling fs layer
d3c894b5b2b0: Waiting
b40161cd83fc: Waiting
65efb1cabba4: Waiting
13547472c521: Waiting
5d4746900976: Waiting
eebb06941f3e: Waiting
02cd68c0cbf6: Waiting
[INFO] get echo | e5dbef90bae3:
[INFO] get echo | Verifying Checksum
e5dbef90bae3: Download complete
[INFO] get echo | 3d17c666b2a2: Download complete
[INFO] get echo | 2047f8b74670: Verifying Checksum
2047f8b74670: Download complete
[INFO] get echo | 3d17c666b2a2: Pull complete
[INFO] get echo | 02cd68c0cbf6: Download complete
[INFO] get echo | eebb06941f3e: Download complete
[INFO] get echo | e5dbef90bae3: Pull complete
d3c894b5b2b0: Verifying Checksum
d3c894b5b2b0: Download complete
[INFO] get echo | b40161cd83fc: Verifying Checksum
b40161cd83fc: Download complete
[INFO] get echo | 65efb1cabba4: Verifying Checksum
65efb1cabba4: Download complete
[INFO] get echo | 13547472c521: Verifying Checksum
13547472c521:
[INFO] get echo | Download complete
[INFO] get echo | 5d4746900976: Verifying Checksum
5d4746900976: Download complete
[INFO] get echo | 2047f8b74670: Pull complete
[INFO] get echo | eebb06941f3e: Pull complete
[INFO] get echo | 02cd68c0cbf6: Pull complete
[INFO] get echo | d3c894b5b2b0: Pull complete
[INFO] get echo | b40161cd83fc: Pull complete
[INFO] get echo | 65efb1cabba4: Pull complete
[INFO] get echo | 13547472c521: Pull complete
[INFO] get echo | 5d4746900976: Pull complete
[INFO] get echo | Digest: sha256:fcb75f691c8b0414d670ae570240cbf95502cc18a9ba57e982ecac589760a186
[INFO] get echo | Status: Downloaded newer image for hashicorp/http-echo:latest
[INFO] get echo | docker.io/hashicorp/http-echo:latest
[INFO] get echo | 2024/05/04 10:32:40 [INFO] server is listening on :5678
[INFO] get echo | Container hashicorp/http-echo started
[INFO] get app | #0 building with "default" instance using docker driver

#1 [internal] load .dockerignore
#1 transferring context: 2B done
#1 DONE 0.0s

#2 [internal] load build definition from Dockerfile
#2 transferring dockerfile: 130B done
#2 DONE 0.0s

#3 [auth] library/node:pull token for registry-1.docker.io
#3 DONE 0.0s

#4 [internal] load metadata for docker.io/library/node:20.8.0-alpine
[INFO] get app | #4 DONE 0.6s
[INFO] get app | #5 [internal] load build context
#5 transferring context: 375B done
[INFO] get app | #5 DONE 0.0s

#6 [1/2] FROM docker.io/library/node:20.8.0-alpine@sha256:37750e51d61bef92165b2e29a77da4277ba0777258446b7a9c99511f119db096
#6 resolve docker.io/library/node:20.8.0-alpine@sha256:37750e51d61bef92165b2e29a77da4277ba0777258446b7a9c99511f119db096 done
#6 sha256:37750e51d61bef92165b2e29a77da4277ba0777258446b7a9c99511f119db096 1.43kB / 1.43kB done
#6 sha256:80cc2c520781c1a4681e59df6791d81a432a6cb3da0c385d8d62e9f16acf8e5f 1.16kB / 1.16kB done
#6 sha256:e722ab35703785bed3cf7b5f8f87652efbb311562fa6ec4634445ee31e9ec224 6.78kB / 6.78kB done
#6 sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 3.40MB / 3.40MB 0.1s
#6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 0B / 49.80MB 0.1s
#6 sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995 0B / 2.34MB 0.1s
[INFO] get app | #6 sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 3.40MB / 3.40MB 0.1s done
#6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 8.39MB / 49.80MB 0.2s
#6 sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995 2.34MB / 2.34MB 0.2s done
#6 extracting sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 0.1s
#6 sha256:20bf5151d902500e94a168975a49a04897e1f895290d75782ff2da96becab400 451B / 451B 0.1s done
[INFO] get app | #6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 38.80MB / 49.80MB 0.4s
#6 extracting sha256:96526aa774ef0126ad0fe9e9a95764c5fc37f409ab9e97021e7b4775d82bf6fa 0.2s done
[INFO] get app | #6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 49.80MB / 49.80MB 0.5s
[INFO] get app | #6 sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 49.80MB / 49.80MB 0.5s done
#6 extracting sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459
[INFO] get app | #6 extracting sha256:bd866a276fb26dd895780268b9622a1d92dc4393ab85054317bbd1ac40504459 3.5s done
[INFO] get app | #6 extracting sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995
[INFO] get app | #6 extracting sha256:86562bfdb01870649ea3dcc082af03ed25e8cdccb638638b8fa09ebc169a2995 0.1s done
#6 extracting sha256:20bf5151d902500e94a168975a49a04897e1f895290d75782ff2da96becab400
[INFO] get app | #6 extracting sha256:20bf5151d902500e94a168975a49a04897e1f895290d75782ff2da96becab400 done
[INFO] get app | #6 DONE 4.5s

#7 [2/2] ADD index.js <ABSOLUTE>/index.js
#7 DONE 0.0s

#8 exporting to image
#8 exporting layers
[INFO] get app | #8 exporting layers 0.6s done
[INFO] get app | #8 writing image sha256:9a01cb789ca69dfd849213067a863a10078e714b5037374befe0c43ebbf88e04 done
[INFO] get app | #8 naming to docker.io/library/my-app:a9ae83b54b1ec21faa1a3255f05c095c done
#8 DONE 0.6s
[INFO] get app | Container my-app:a9ae83b54b1ec21faa1a3255f05c095c started
[INFO] get app | listening on port <PORT>
[INFO] get echo | Container my-app:a9ae83b54b1ec21faa1a3255f05c095c started
[INFO] get echo | listening on port <PORT>
[INFO] get app | 2024/05/04 10:32:48 [INFO] server is listening on :5678
[INFO] get app | Container hashicorp/http-echo started
[INFO] get echo | 2024/05/04 10:32:48 localhost:32768 172.17.0.1:44582 "GET / HTTP/1.1" 200 5 "node" 14.667µs
[INFO] get echo | bang
[INFO] get echo | 
[INFO] get app | request received: GET /
[INFO] get app | Hello, Wingnuts!
[INFO] get echo | Error: non-zero exit code: null
    at ChildProcess.<anonymous> (<ABSOLUTE>:LINE:COL)
    at Object.onceWrapper (node:events:633:26)
    at ChildProcess.emit (node:events:530:35)
    at ChildProcess._handle.onexit (node:internal/child_process:294:12)
[INFO] get echo | Error: non-zero exit code: null
    at ChildProcess.<anonymous> (<ABSOLUTE>:LINE:COL)
    at Object.onceWrapper (node:events:633:26)
    at ChildProcess.emit (node:events:530:35)
    at ChildProcess._handle.onexit (node:internal/child_process:294:12)
[INFO] get app | Error: non-zero exit code: null
    at ChildProcess.<anonymous> (<ABSOLUTE>:LINE:COL)
    at Object.onceWrapper (node:events:633:26)
    at ChildProcess.emit (node:events:530:35)
    at ChildProcess._handle.onexit (node:internal/child_process:294:12)
[INFO] get app | Error: non-zero exit code: null
    at ChildProcess.<anonymous> (<ABSOLUTE>:LINE:COL)
    at Object.onceWrapper (node:events:633:26)
    at ChildProcess.emit (node:events:530:35)
    at ChildProcess._handle.onexit (node:internal/child_process:294:12)
pass ─ container.test.wsim » root/env0/test:get echo
pass ─ container.test.wsim » root/env1/test:get app 

Tests 2 passed (2)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

