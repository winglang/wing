Here's an overview of what each module in `src` contains:

- `.gen` - generated code for [CDKTF](https://github.com/hashicorp/terraform-cdk) classes that are used to synthesize Terraform resource config
- `cloud` - abstract APIs for Wing's built-in resources that can be accessed using a "bring cloud" statement
- `core` - classes and logic underpinning how Wing applications are constructed, how preflight code is translated into inflight code, how Wing plugins work, and other APIs that may need to be exported publicly for the compiler but don't necessarily belong in the `cloud` module
- `redis` - abstract API for the `Redis` resource
- `shared` - classes and functions that are used by multiple modules
- `shared-aws` - classes and functions that are used by both the `awscdk` and `tf-aws` targets
- `shared-tf` - classes and functions that are used by the `tf-aws`, `tf-gcp`, and `tf-azure` targets
- `std` - APIs for built-in types like `Array`, `str`, etc.
- `target-awscdk` - implementations of resources in the `cloud` module for the `awscdk` target
- `target-sim` - implementations of resources in the `cloud` module for the `sim` target
- `target-tf-aws` - implementations of resources in the `cloud` module for the `tf-aws` target
- `target-tf-azure` - implementations of resources in the `cloud` module for the `tf-azure` target
- `target-tf-gcp` - implementations of resources in the `cloud` module for the `tf-gcp` target
- `testing` - classes and functions used for testing Wing itself
- `util` - utility functions that are publicly available using a "bring util" statement
