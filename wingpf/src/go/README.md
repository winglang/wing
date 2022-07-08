# `libwrr-go`

Wing Rosetta Runtime Go Engine.

## Mission

Output of this Go library is a single free function that allows C++ to call it.

The single free function is capable of executing arbitrary Go, akin to a REPL.

Internally it uses [Yaegi](https://github.com/traefik/yaegi).

## Build

You need to have a working Go build environment. This can be achieved by either:

1. Installing Go from its official website <sup>1</sup>
1. Installing Go with the `g` version manager <sup>2</sup>

After that, you can compile with:

```bash
go mod tidy
go build -o libwrr-go.so -buildmode=c-shared libwrr-go.go
```

<sup>1</sup> <https://go.dev/dl/><br />
<sup>2</sup> <https://github.com/stefanmaric/g><br />
