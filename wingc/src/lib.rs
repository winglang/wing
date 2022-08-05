#![allow(non_upper_case_globals)]
#![allow(non_camel_case_types)]
#![allow(unused_must_use)]
#![allow(non_snake_case)]

use sha2::{Digest, Sha256};
use std::collections::HashMap;
use std::ffi::{CStr, CString};
use std::os::raw::c_char;
use std::path::PathBuf;
use std::str;
use std::{fs, mem};
use tree_sitter::{Language, Node, Parser};

const STDLIB: &str = "$stdlib";
const STDLIB_MODULE: &str = "@monadahq/wingsdk";

extern "C" {
    fn tree_sitter_winglang() -> Language;
}

struct Capture {
    symbol: String,
    method: String,
}

struct Compiler<'a> {
    out_dir: PathBuf,
    state_file: PathBuf,
    source: &'a [u8],
    shim: bool,
}

impl Compiler<'_> {
    fn node_text<'a>(&'a self, node: &Node) -> &'a str {
        return str::from_utf8(&self.source[node.byte_range()]).unwrap();
    }

    fn parse_qualified_name(&self, node: &Node) -> String {
        if node.named_child_count() == 1 {
            return String::from(self.node_text(&node.named_child(0).unwrap()));
        } else if node.named_child_count() == 2 {
            let namespace = self.node_text(&node.named_child(0).unwrap());
            let name = self.node_text(&node.named_child(1).unwrap());
            return format!("{}.{}", namespace, name);
        } else {
            panic!(
                "Unexpected number of named childer for qualified name {:?}",
                node
            );
        }
    }

    fn find_captures(&self, node: &Node) -> Vec<Capture> {
        let mut res = vec![];
        if node.kind() == "proc_call_name" {
            let cloud_object = self.node_text(&node.named_child(0).unwrap());
            let method_name = self.node_text(&node.named_child(1).unwrap());
            res.push(Capture {
                symbol: cloud_object.to_string(),
                method: method_name.to_string(),
            });
        }

        let mut cursor = node.walk();
        for child in node.children(&mut cursor) {
            res.append(&mut self.find_captures(&child));
        }
        res
    }

    fn render_block(statements: impl IntoIterator<Item = impl core::fmt::Display>) -> String {
        let mut lines = vec![];
        lines.push("{".to_string());

        for statement in statements {
            let statement_str = format!("{}", statement);
            let result = statement_str.split("\n");
            for l in result {
                lines.push(format!("  {}", l));
            }
        }

        lines.push("}".to_string());
        return lines.join("\n");
    }

    fn compile(&self, root: &Node) -> String {
        //compile(self.root, self.source)
        //println!("{}", root.kind());
        match root.kind() {
            "source_file" => {
                let mut js = vec![];
                let mut imports = vec![];

                let mut cursor = root.walk();
                for child in root.children(&mut cursor) {
                    let line = self.compile(&child);
                    if line.is_empty() {
                        continue;
                    }
                    if child.kind() == "use_statement" {
                        imports.push(line);
                    } else {
                        js.push(line);
                    }
                }

                let mut output = vec![];

                if self.shim {
                    output.push(format!("const {} = require('{}');", STDLIB, STDLIB_MODULE));
                    output.push("const { Construct } = require('constructs');".to_string());
                }

                output.append(&mut imports);

                if self.shim {
                    js.insert(0, "super(scope, id)".to_string());
                    output.push(format!(
                        "class Root extends Construct {{\nconstructor(scope, id) {}\n}}",
                        Self::render_block(js)
                    ));
                    output.push(format!(
                        "const app = new {}.core.App({{ stateFile: '{}' }});",
                        STDLIB,
                        self.state_file.display()
                    ));
                    output.push("new Root(app.root, 'Root');".to_string());
                    output.push("app.synth();".to_string());
                } else {
                    output.append(&mut js);
                }
                output.join("\n")
            }
            "use_statement" => {
                let module_name = self.node_text(&root.named_child(0).unwrap());

                if let Some(parent_module) = root.named_child(1) {
                    // use <module_name> from <parent_module>
                    format!(
                        "const {} = require('{}/{}').{};",
                        module_name,
                        STDLIB_MODULE,
                        self.node_text(&parent_module),
                        module_name
                    )
                } else {
                    // use <module_name>
                    format!(
                        "const {} = require('{}').{};",
                        module_name, STDLIB_MODULE, module_name
                    )
                }
            }
            "variable_definition" => {
                let var_name = self.node_text(&root.child(0).unwrap());
                let initial_value_node = root.child(2).unwrap();
                let initial_value = self.compile(&initial_value_node.child(0).unwrap());
                format!("const {} = {};", var_name, initial_value)
            }
            "new_expression" => {
                let custom_type = self.compile(&root.named_child(0).unwrap());
                let args = match root.named_child(1) {
                    Some(args_node) => self.compile(&args_node),
                    None => String::from(""),
                };
                let obj_id = match root.named_child(2) {
                    Some(new_object_id) => self.compile(&new_object_id.named_child(0).unwrap()),
                    None => format!("\"{}\"", custom_type.clone()),
                };
                let real_args = ["this", obj_id.as_str(), args.as_str()]
                    .iter()
                    .filter(|&x| !x.is_empty())
                    .cloned()
                    .collect::<Vec<&str>>()
                    .join(", ");
                format!("new {}({});", custom_type, real_args)
            }
            "class" => self.parse_qualified_name(&root),
            "argument_list" => {
                let mut positional_args = Vec::new();
                let mut kw_args = HashMap::new();

                let mut cursor = root.walk();
                for child in root.named_children(&mut cursor) {
                    match child.kind() {
                        "positional_argument" => {
                            positional_args.push(self.compile(&child));
                        }
                        "keyword_argument" => {
                            kw_args.insert(
                                self.node_text(&child.named_child(0).unwrap()),
                                self.compile(&child.named_child(1).unwrap()),
                            );
                        }
                        other => panic!("Unexpected argument type {}", other),
                    }
                }

                if !kw_args.is_empty() {
                    positional_args.push(format!(
                        "{{\n  {}\n}}",
                        kw_args
                            .iter()
                            .map(|(k, v)| format!("{}: {}", k, v))
                            .collect::<Vec<String>>()
                            .join(",\n  ")
                    ));
                }

                positional_args.join(",")
            }
            "function_call" => {
                let call_name = self.compile(&root.named_child(0).unwrap());
                let argument_list = self.compile(&root.named_child(1).unwrap());

                format!("{}({})", call_name, argument_list)
            }
            "function_call_name" => {
                let reference = self.compile(&root.child(0).unwrap());
                if let Some(method_name) = root.named_child(1) {
                    format!("{}.{}", reference, self.node_text(&method_name))
                } else {
                    reference
                }
            }
            "reference" => self.parse_qualified_name(root),
            "positional_argument" => self.compile(&root.named_child(0).unwrap()),
            "keyword_argument_value" => self.compile(&root.named_child(0).unwrap()),
            "proc_definition" => {
                let function_name = self.compile(&root.named_child(0).unwrap());
                let parameter_list = self.compile(&root.named_child(1).unwrap());

                // find all cloud objects referenced in the proc
                let captures = self.find_captures(&root.named_child(2).unwrap());

                let block = self.compile(&root.named_child(2).unwrap());

                let procid =
                    base16ct::lower::encode_string(&Sha256::new().chain_update(&block).finalize());

                let mut proc_source = vec![];

                proc_source.push(format!(
                    "async function $proc($cap, {}) {};",
                    parameter_list, block
                ));

                let proc_dir = self.out_dir.join(format!("proc.{}", procid));

                fs::create_dir_all(&proc_dir).expect("Creating inflight proc dir");
                fs::write(proc_dir.join("index.js"), proc_source.join("\n"))
                    .expect("Writing inflight proc source");

                let mut methods_per_object = HashMap::new();
                for capture in captures.iter() {
                    if !methods_per_object.contains_key(&capture.symbol) {
                        methods_per_object.insert(capture.symbol.clone(), vec![]);
                    }
                    methods_per_object
                        .get_mut(&capture.symbol)
                        .unwrap()
                        .push(capture.method.clone());
                }

                let mut bindings = vec![];
                for (symbol, methods) in methods_per_object {
                    bindings.push(format!(
                        "{}: {},",
                        symbol,
                        Self::render_block([
                            format!("obj: {},", symbol),
                            format!(
                                "methods: [{}]",
                                methods
                                    .iter()
                                    .map(|x| format!("\"{}\"", x))
                                    .collect::<Vec<_>>()
                                    .join(",")
                            )
                        ])
                    ));
                }

                let props_block = Self::render_block([
                    format!("path: \"{}\",", proc_dir.display()),
                    if !bindings.is_empty() {
                        format!("captures: {}", Self::render_block(&bindings))
                    } else {
                        "".to_string()
                    },
                ]);

                format!(
                    "const {} = new {}.core.Process({});",
                    function_name, STDLIB, props_block
                )
            }
            "function_name" => self.node_text(root).to_string(),
            "parameter_list" => {
                let mut params = vec![];
                let mut cursor = root.walk();
                for p in root.named_children(&mut cursor) {
                    params.push(self.node_text(&p.named_child(0).unwrap()));
                }
                params.join(", ")
            }
            "block" => {
                let mut cursor = root.walk();
                let x = root.named_children(&mut cursor).map(|n| self.compile(&n));
                Self::render_block(x)
            }
            "proc_call_name" => {
                let cobject = self.compile(&root.named_child(0).unwrap());
                let method_name = self.node_text(&root.named_child(1).unwrap());

                format!("await $cap.{}.{}", cobject, method_name)
            }
            "cloud_object" => self.node_text(root).to_string(),
            "string" => self.node_text(root).to_string(),
            "seconds" => {
                format!(
                    "{}.core.Duration.fromSeconds({})",
                    STDLIB,
                    self.node_text(&root.child(0).unwrap())
                )
            }
            "minutes" => {
                format!(
                    "{}.core.Duration.fromMinutes({})",
                    STDLIB,
                    self.node_text(&root.child(0).unwrap())
                )
            }
            other => {
                panic!("Unexpected node type {}", other);
            }
        }
    }
}

#[no_mangle]
pub extern "C" fn compile(source: *const c_char, outdir: *const c_char) -> *const c_char {
    let source_file = unsafe { CStr::from_ptr(source).to_str().unwrap() };
    let out_dir = if outdir != std::ptr::null() {
        unsafe { CStr::from_ptr(outdir).to_str().unwrap() }
    } else {
        Box::leak(format!("{}.out", source_file).into_boxed_str())
    };
    let language = unsafe { tree_sitter_winglang() };
    let mut parser = Parser::new();
    parser.set_language(language).unwrap();

    let source = match fs::read(source_file) {
        Ok(source) => source,
        Err(_) => {
            println!("Error reading source file: {}", source_file);
            std::process::exit(1);
        }
    };

    let tree = match parser.parse(&source[..], None) {
        Some(tree) => tree,
        None => {
            println!("Failed parsing source file: {}", source_file);
            std::process::exit(1);
        }
    };

    let intermediate_dir = PathBuf::from(out_dir);
    fs::create_dir_all(&intermediate_dir).expect("create output dir");
    let intermediate_dir = intermediate_dir.join(".intermediate");
    let state_file = PathBuf::from(format!("{}.state", source_file));

    let output = Compiler {
        out_dir: intermediate_dir,
        state_file,
        source: &source[..],
        shim: true,
    }
    .compile(&tree.root_node());

    println!("{}", output);
    CString::new(output).unwrap().into_raw()
}

#[no_mangle]
pub extern "C" fn release(s: *const c_char) {
    let _ = unsafe { CString::from_raw(mem::transmute(s)) };
}

#[cfg(test)]
mod tests {
    use crate::{compile, release};
    use std::ffi::CString;
    use std::ptr::null;

    #[test]
    fn does_not_blow_up() {
        let source = "../playground/examples/hello.w";
        let source_raw = CString::new(source).unwrap();
        let intermediate = compile(source_raw.as_ptr(), null());
        release(intermediate)
    }
}
