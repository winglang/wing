# [mount.test.w](../../../../../../examples/tests/sdk_tests/container/mount.test.w) | test | sim

## stdout.log
```log
[INFO] my test | 15: Pulling from library/postgres
[INFO] my test | b0a0cf830b12: Pulling fs layer
b311dac095c3: Pulling fs layer
36163cea98c3: Pulling fs layer
fe401a45083b: Pulling fs layer
b4f63e66f657: Pulling fs layer
9a8245430c33: Pulling fs layer
74c893d239e5: Pulling fs layer
789ed9a95b21: Pulling fs layer
5b691e4e12b4: Pulling fs layer
e502d5360f88: Pulling fs layer
0292671f3c2d: Pulling fs layer
5247a27db111: Pulling fs layer
b3a42a5269c3: Pulling fs layer
5fc19b802589: Pulling fs layer
b4f63e66f657: Waiting
9a8245430c33: Waiting
74c893d239e5: Waiting
789ed9a95b21: Waiting
5b691e4e12b4: Waiting
e502d5360f88: Waiting
0292671f3c2d: Waiting
5247a27db111: Waiting
b3a42a5269c3: Waiting
5fc19b802589: Waiting
fe401a45083b: Waiting
[INFO] my test | b311dac095c3: Verifying Checksum
[INFO] my test | b311dac095c3: Download complete
[INFO] my test | 36163cea98c3: Verifying Checksum
36163cea98c3: Download complete
[INFO] my test | fe401a45083b: Verifying Checksum
fe401a45083b: Download complete
[INFO] my test | 9a8245430c33:
[INFO] my test | Verifying Checksum
9a8245430c33: Download complete
[INFO] my test | b0a0cf830b12: Verifying Checksum
b0a0cf830b12: Download complete
[INFO] my test | b4f63e66f657: Verifying Checksum
b4f63e66f657: Download complete
74c893d239e5: Verifying Checksum
74c893d239e5: Download complete
[INFO] my test | 789ed9a95b21: Verifying Checksum
789ed9a95b21: Download complete
[INFO] my test | e502d5360f88: Verifying Checksum
[INFO] my test | e502d5360f88: Download complete
[INFO] my test | 0292671f3c2d: Verifying Checksum
0292671f3c2d: Download complete
[INFO] my test | 5247a27db111: Verifying Checksum
5247a27db111: Download complete
[INFO] my test | b3a42a5269c3: Verifying Checksum
b3a42a5269c3: Download complete
5fc19b802589: Verifying Checksum
5fc19b802589: Download complete
[INFO] my test | 5b691e4e12b4: Verifying Checksum
5b691e4e12b4: Download complete
[INFO] my test | b0a0cf830b12: Pull complete
[INFO] my test | b311dac095c3: Pull complete
[INFO] my test | 36163cea98c3: Pull complete
[INFO] my test | fe401a45083b: Pull complete
[INFO] my test | b4f63e66f657: Pull complete
[INFO] my test | 9a8245430c33: Pull complete
[INFO] my test | 74c893d239e5: Pull complete
[INFO] my test | 789ed9a95b21: Pull complete
[INFO] my test | 5b691e4e12b4: Pull complete
[INFO] my test | e502d5360f88: Pull complete
[INFO] my test | 0292671f3c2d: Pull complete
[INFO] my test | 5247a27db111: Pull complete
[INFO] my test | b3a42a5269c3: Pull complete
[INFO] my test | 5fc19b802589: Pull complete
[INFO] my test | Digest: sha256:1ebd963e5c598f944a4e9ba27de4c95289d663dcc73731025aa53c5254094d8f
[INFO] my test | Status: Downloaded newer image for postgres:15
[INFO] my test | docker.io/library/postgres:15
[INFO] my test | Container postgres:15 started
[INFO] my test | The files belonging to this database system will be owned by user "postgres".
This user must also own the server process.
[INFO] my test | The database cluster will be initialized with locale "en_US.utf8".
The default database encoding has accordingly been set to "UTF8".
The default text search configuration will be set to "english".

Data page checksums are disabled.
[INFO] my test | fixing permissions on existing directory <ABSOLUTE>/data ... ok
[INFO] my test | creating subdirectories ...
[INFO] my test | ok
[INFO] my test | selecting dynamic shared memory implementation ... posix
selecting default max_connections ...
[INFO] my test | dummy test
pass ─ mount.test.wsim » root/env0/test:my test

Tests 1 passed (1)
Snapshots 1 skipped
Test Files 1 passed (1)
Duration <DURATION>
```

