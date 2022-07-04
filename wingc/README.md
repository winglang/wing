# Wing Compiler
This projects strives to be a [wing](https://github.com/monadahq/rfcs/pull/4) compiler. It's currently a WIP.

All development is currently under the `dev` branch. I've opened a [PR for to `main`](https://github.com/monadahq/winglang/pull/1) where you're welcome to add any comments/suggestions/questions you have regarding this code.

## Building

### Prerequisites
* The rust toolchain: https://rustup.rs/
* node and npm - you might need these, not sure, let me know!

### Building

```
cd wingc
cargo build
```
### Testing

Tests are still missing, but this is how you'd run them:

`cargo test`

### Running

```
cargo run -- test.w
```
This will complie `test.w` into `test.w.out`

Note: currently the preflight code JS is printed to the standard output instead of being written into the output directory.
