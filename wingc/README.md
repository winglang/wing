# Wing Compiler
This projects strives to be a [wing](https://github.com/monadahq/rfcs/pull/4) compiler. It's currently a WIP.

## Building

### Prerequisites
* The rust toolchain: https://rustup.rs/
* node and npm - you might need these not sure, let me know!

### Building

```
cd wingc
cargo build
```

### Running

```
cargo run -- test.w
```
This will complie `test.w` into `test.w.out`

Note: currently the preflight code JS is printed to the standard output instead of being written into the output directory.