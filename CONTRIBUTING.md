# Winglang repository - key files/folders map

> Below are selected folders and files


    winglang
    ├── corpus                  # Sample Wing code
    ├── wing                    # Toolchain
    ├── wing-analyzer           # VSCode extension
    ├── wingc                   # Compiler
    │   ├── grammar             # Defining language grammar and Rust binder
    │   │   ├── bindings        # Binds the grammar and provides Rust API to interact with it
    │   │   ├── test            # 
    │   │   │   ├── corpus      # Tests for the grammar using a Tree-sitter built-in mechanism
    │   │   ├── grammar.js      # Tree-sitter file defining Wing grammar
    │   ├── src                 #  
    │   │   ├── ast.rs          # Scope and AST data structure
    │   │   ├── diagnostics.rs  # Compiler errors and warnings
    │   │   ├── jsify.rs        # Build javascript from AST
    │   │   ├── lib.rs          # Main compiler lib, exposing compile API (which runs parse, type_check and jsify)
    │   │   ├── parser.rs       # Code parser
    │   │   ├── type_check.rs   # Type checker
    │   │   ├── type_env.rs     # A struct containing a map between Identifier and its Type
    ├── wingrt                  # Runtime
    ├── LICENSE
    └── README.md
