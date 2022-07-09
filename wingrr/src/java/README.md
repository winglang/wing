# `libwrr.java`

Wing Rosetta Runtime Java Engine.

## Mission

Output of this Java app is a single free function that allows C++ to call it.

The single free function is capable of executing arbitrary Java, akin to a REPL.

Internally it uses
[JShell](https://docs.oracle.com/javase/9/jshell/introduction-jshell.htm).

## Build

You need to have a working Java environment. This can be achieved by either:

1. Installing official JDK binaries <sup>1</sup>
1. Installing OpenJDK on your platform of your choice <sup>2</sup>

After that, you can compile with:

```bash
javac libwrr.java
```

Output is `libwrr.class` which is a Java bytecode file.

<sup>1</sup><https://www.oracle.com/java/technologies/downloads/><br />
<sup>2</sup><https://openjdk.org/install/><br />
