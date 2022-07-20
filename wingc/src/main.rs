use clap::*;
use tree_sitter::{Parser, Language, Node};
use std::{collections::HashMap};
use std::fs;
use std::path::PathBuf;
use std::str;
use sha2::{Sha256, Digest};

use crate::ast::{ParameterDefinition, Type, Scope, Statement, Expression, Reference, ArgList, BinaryOperator, Literal};

mod ast;
mod jsify;

#[derive(clap::Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    #[clap(value_parser)]
    source_file: String,

    #[clap(value_parser, short, long)]
    out_dir: Option<String>,
}


extern "C" { fn tree_sitter_winglang() -> Language; }

struct Capture {
    symbol: String,
    method: String
}

struct Compiler<'a> {
    out_dir: PathBuf,
    source: &'a[u8],
}

impl Compiler<'_> {
    fn node_text<'a>(&'a self, node: &Node) -> &'a str {
        return str::from_utf8(&self.source[node.byte_range()]).unwrap();
    }

    // fn default_node_text<'a>(&'a self, node: &Node) -> &'a str {
    //     return self.node_text(&node.named_child(0).unwrap());
    // }

    fn parse_qualified_name(&self, node: &Node) -> String {
        if node.named_child_count() == 1 {
            return String::from(self.node_text(&node.named_child(0).unwrap()));
        } else if node.named_child_count() == 2 {
            let namespace = self.node_text(&node.named_child(0).unwrap());
            let name = self.node_text(&node.named_child(1).unwrap());
            return format!("{}.{}", namespace, name);
        } else {
            panic!("Unexpected number of named children for qualified name {:?}", node);
        }
    }
    
    fn find_captures(&self, node: &Node) -> Vec<Capture> {
        let mut res = vec![];
        if node.kind() == "proc_call_name" {
            let cloud_object = self.node_text(&node.named_child(0).unwrap());
            let method_name = self.node_text(&node.named_child(1).unwrap());
            res.push(Capture {
                symbol: cloud_object.to_string(),
                method: method_name.to_string()
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

    fn wingit(&self, root: &Node) -> Scope {
        match root.kind() {
            "source_file" => {
                let mut cursor = root.walk();
                Scope {
                    statements: root.children(&mut cursor).map(|st_node| self.build_statement(&st_node)).collect()
                }
            },
            other => {
                panic!("Unexpected node type {}", other);
            }
        }
    }

    fn build_statement(&self, statement_node: &Node) -> Statement {
        let mut cursor = statement_node.walk();
        match statement_node.kind() {
            "use_statement" => {
                if let Some(parent_module) = statement_node.named_child(1) {
                    Statement::Use { 
                        module_name: self.node_text(&statement_node.named_child(0).unwrap()).into(), 
                        identifier: Some(self.node_text(&parent_module).into())
                    }
                } else {
                    Statement::Use { 
                        module_name: self.node_text(&statement_node.named_child(0).unwrap()).into(), 
                        identifier: None
                    }
                }
                
            },
            "variable_definition" => Statement::VariableDef { 
                    var_name: self.node_text(&statement_node.child(0).unwrap()).into(), 
                    initial_value: self.build_expression(&statement_node.child(2).unwrap())
            },
            "expression_statement" => Statement::Expression(
                self.build_expression(&statement_node.named_child(0).unwrap())
            ),
            "proc_definition" => Statement::ProcessDefinition {
                name: self.node_text(&statement_node.named_child(0).unwrap()).into(),
                parameters: statement_node.child_by_field_name("parameter_list").unwrap().children_by_field_name("value", &mut cursor)
                .map(|st_node| self.build_parameter_definition(&st_node)).collect(),
                statements: Scope {
                    // Duped code from wingit
                    statements: statement_node.children_by_field_name("statements", &mut cursor).map(|st_node| self.build_statement(&st_node)).collect()
                }
                
            },
            other => {
                panic!("Unexpected statement node type {}", other);
            }
        }
    }

    fn build_parameter_definition(&self, parameter_node: &Node) -> ParameterDefinition {
        ParameterDefinition { 
            name: self.node_text(&parameter_node.child_by_field_name("name").unwrap()).to_string(), 
            parameter_type: Type::String // TODO: parse type
        }
    }

    fn build_reference(&self, reference_node: &Node) -> Reference {
        if reference_node.named_child_count() == 1 {
            Reference {
                namespace: None,
                identifier: self.node_text(&reference_node.named_child(0).unwrap()).into(),
            }
        } else if reference_node.named_child_count() == 2 {
            Reference {
                namespace: Some(self.node_text(&reference_node.named_child(0).unwrap()).into()),
                identifier: self.node_text(&reference_node.named_child(1).unwrap()).into()
            }
        } else {
            panic!("Unexpected number of named childer for qualified name {:?}", reference_node);
        }
    }

    fn build_arg_list(&self, arg_list_node: &Node) -> ArgList {
        let mut pos_args = vec![];
        let mut named_args = HashMap::new();

        let mut cursor = arg_list_node.walk();
        for child in arg_list_node.named_children(&mut cursor) {
            match child.kind() {
                "positional_argument" => {
                    pos_args.push(self.build_expression(&child));
                },
                "keyword_argument" => {
                    named_args.insert(
                        self.node_text(&child.named_child(0).unwrap()).into(), 
                        self.build_expression(&child.named_child(1).unwrap())
                    );
                },
                other => panic!("Unexpected argument type {}", other)
            }
        }

        ArgList {
            pos_args,
            named_args,
        }
    }
    
    fn build_expression(&self, expression_node: &Node) -> Expression {
        match expression_node.kind() {
            "new_expression" => {
                let class =  self.build_reference(&expression_node.named_child(0).unwrap());
                let arg_list = if let Some(args_node) = expression_node.named_child(1) {
                    self.build_arg_list(&args_node)
                } else {
                    ArgList::new()
                };
                
                let obj_id = expression_node.named_child(2).map(|n| self.node_text(&n).into());
                Expression::New { 
                    class, 
                    obj_id, 
                    arg_list
                }
            },
            "binary_expression" => Expression::Binary { 
                op: match self.node_text(&expression_node.child(1).unwrap()) {
                    "+" => BinaryOperator::Add,
                    "-" => BinaryOperator::Sub,
                    "==" => BinaryOperator::Equal,
                    "!=" => BinaryOperator::NotEqual,
                    ">" => BinaryOperator::Greater,
                    ">=" => BinaryOperator::GreaterOrEqual,
                    "<" => BinaryOperator::Less,
                    "<=" => BinaryOperator::LessOrEqual,
                    "&&" => BinaryOperator::LogicalAnd,
                    "||" => BinaryOperator::LogicalOr,
                    "%" => BinaryOperator::Mod,
                    "*" => BinaryOperator::Mul,
                    "/" => BinaryOperator::Div,
                    other => { 
                        panic!("Unexpected binary operator {}", other);
                    }
                },
                lexp: Box::new(self.build_expression(&expression_node.named_child(0).unwrap())),
                rexp: Box::new(self.build_expression(&expression_node.named_child(1).unwrap())),
            },
            "number" => Expression::Literal(Literal::Number(
                self.node_text(&expression_node).parse().expect("Number string")
            )),
            "seconds" => Expression::Literal(Literal::Duration(
                self.node_text(&expression_node.child_by_field_name("number").unwrap()).parse().expect("Duration string")
            )),
            "minutes" => Expression::Literal(Literal::Duration(
                // Specific "Minutes" duration needed here
                self.node_text(&expression_node.child_by_field_name("number").unwrap()).parse::<f64>().expect("Duration string") * 60_f64
            )),
            "reference" => Expression::Reference(self.build_reference(&expression_node)),
            "positional_argument" => self.build_expression(&expression_node.named_child(0).unwrap()),
            "keyword_argument_value" => self.build_expression(&expression_node.named_child(0).unwrap()),
            "function_call" => Expression::FunctionCall {
                function: self.build_reference(&expression_node.named_child(0).unwrap()),
                args: self.build_arg_list(&expression_node.named_child(1).unwrap()),
            },
            other => {
                panic!("Unexpected expression node type {}", other);
            }
        }
    }
    
/*
    fn compile2(&self, root: &Node) -> String {
        //compile(self.root, self.source)
        //println!("{}", root.kind());
        match root.kind() {
            "source_file" => {
                let mut js = vec![];
                let mut imports = vec![];

                let mut cursor = root.walk();
                for child in root.children(&mut cursor) {
                    let line = self.compile2(&child);
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
                }

                output.append(&mut imports);

                if self.shim {
                    js.insert(0, "super();\n".to_string());
                    output.push(format!("class MyApp extends {}.cloud.App {{\nconstructor() {}\n}}", STDLIB, Self::render_block(js)));
                    output.push("new MyApp().synth();".to_string());
                } else {
                    output.append(&mut js);
                }
                output.join("\n")
            },
            "use_statement" => {
                let module_name = self.node_text(&root.named_child(0).unwrap());
                
                if let Some(parent_module) = root.named_child(1) {
                    // use <module_name> from <parent_module>
                    format!("const {} = require('{}/{}').{};", module_name, STDLIB_MODULE, self.node_text(&parent_module), module_name)
                } else {
                    // use <module_name>
                    format!("const {} = require('{}').{};", module_name, STDLIB_MODULE, module_name)
                }
            },
            "variable_definition" => {
                let var_name = self.node_text(&root.child(0).unwrap());
                let initial_value_node = root.child(2).unwrap();
                let initial_value = self.compile2(&initial_value_node.child(0).unwrap());
                format!("const {} = {};", var_name, initial_value)
            },
            "new_expression" => {
                let custom_type = self.compile2(&root.named_child(0).unwrap());
                let args = match root.named_child(1) {
                    Some(args_node) => self.compile2(&args_node),
                    None => String::from(""),
                };
                let obj_id = match root.named_child(2) {
                    Some(new_object_id) => self.compile2(&new_object_id.named_child(0).unwrap()),
                    None => format!("\"{}\"", custom_type.clone()),
                };
                let real_args = ["this", obj_id.as_str(), args.as_str()].iter()
                    .filter(|&x| !x.is_empty())
                    .cloned().collect::<Vec<&str>>()
                    .join(", ");
                format!("new {}({});", custom_type, real_args)
            },
            "class" => {
                self.parse_qualified_name(&root)
            },
            "argument_list" => {
                let mut positional_args = Vec::new();
                let mut kw_args = HashMap::new();

                let mut cursor = root.walk();
                for child in root.named_children(&mut cursor) {
                    match child.kind() {
                        "positional_argument" => {
                            positional_args.push(self.compile2(&child));
                        },
                        "keyword_argument" => {
                            kw_args.insert(
                                self.node_text(&child.named_child(0).unwrap()), 
                                self.compile2(&child.named_child(1).unwrap())
                            );
                        },
                        other => panic!("Unexpected argument type {}", other)
                    }
                }

                if !kw_args.is_empty() {
                    positional_args.push(format!("{{\n  {}\n}}", kw_args.iter()
                        .map(|(k,v)| format!("{}: {}", k, v))
                        .collect::<Vec<String>>()
                        .join(",\n  "))
                    );
                }

                positional_args.join(",")
            },
            "function_call" => {
                let call_name = self.compile2(&root.named_child(0).unwrap());
                let argument_list = self.compile2(&root.named_child(1).unwrap());
        
                format!("{}({})", call_name, argument_list)
            },
            "function_call_name" => {
                let reference = self.compile2(&root.child(0).unwrap());
                if let Some(method_name) = root.named_child(1) {
                    format!("{}.{}", reference, self.node_text(&method_name))
                } else {
                    reference
                }
            },
            "reference" => {
                self.parse_qualified_name(root)
            },
            "positional_argument" => {
                self.compile2(&root.named_child(0).unwrap())
            },
            "keyword_argument_value" => {
                self.compile2(&root.named_child(0).unwrap())
            },
            "proc_definition" => {
                let function_name = self.compile2(&root.named_child(0).unwrap());
                let parameter_list = self.compile2(&root.named_child(1).unwrap());
        
                // find all cloud objects referenced in the proc
                let captures = self.find_captures(&root.named_child(2).unwrap());
        
                let block = self.compile2(&root.named_child(2).unwrap());

                let procid = base16ct::lower::encode_string(&Sha256::new().chain_update(&block).finalize());
        
                let mut proc_source = vec![];
        
                for o in captures.iter() {
                    proc_source.push(format!("const __PROC__{} = <<{}>>", o.symbol, o.symbol));
                }
        
                proc_source.push(format!("exports.proc = async function({}) {};", parameter_list, block));
        
                let proc_dir = self.out_dir.join(format!("proc.{}", procid));
                
                fs::create_dir_all(&proc_dir).expect("Creating inflight proc dir");
                fs::write(proc_dir.join("index.js"), proc_source.join("\n")).expect("Writing inflight proc source");
        
                let mut methods_per_object = HashMap::new();
                for capture in captures.iter() {
                    if !methods_per_object.contains_key(&capture.symbol) {
                        methods_per_object.insert(capture.symbol.clone(), vec![]);
                    }
                    methods_per_object.get_mut(&capture.symbol).unwrap().push(capture.method.clone());
                }
        
                let mut bindings = vec![];
                for (symbol, methods) in methods_per_object {
                    bindings.push(
                        format!("{}: {},", symbol, Self::render_block([
                            format!("obj: {},",symbol),
                            format!("methods: [{}]", methods.iter().map(|x| format!("\"{}\"", x)).collect::<Vec<_>>().join(","))
                            ]))
                    
                    );
                }

                let props_block = Self::render_block([
                    format!("path: __dirname + \"/{}\",", proc_dir.display()),
                    if !bindings.is_empty() { format!("bindings: {}", Self::render_block(&bindings)) } else {"".to_string()}
                ]);

                format!("const {} = new {}.core.Process({});", function_name, STDLIB, props_block)
            },
            "function_name" => {
                self.node_text(root).to_string()
            },
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
                let x = root.named_children(&mut cursor).map(|n| self.compile2(&n));
                Self::render_block(x)
            }
            "proc_call_name" => {
                let cobject = self.compile2(&root.named_child(0).unwrap());
                let method_name = self.node_text(&root.named_child(1).unwrap());
          
                format!("await __PROC__{}.{}", cobject, method_name)
            },
            "cloud_object" => {
                self.node_text(root).to_string()
            },
            "string" => {
                self.node_text(root).to_string()
            },
            "seconds" => {
                format!("{}.core.Duration.fromSeconds({})", STDLIB, self.node_text(&root.child(0).unwrap()))
            },
            "minutes" => {
                format!("{}.core.Duration.fromMinutes({})", STDLIB, self.node_text(&root.child(0).unwrap()))
            },
            other => {
                panic!("Unexpected node type {}", other);
            }
        }
    }
    */
}

fn main() {
    let args = Args::parse();
    
    let language = unsafe { tree_sitter_winglang() };
    let mut parser = Parser::new();
    parser.set_language(language).unwrap();

    let source = match fs::read(&args.source_file) {
        Ok(source) => source,
        Err(_) => {
            println!("Error reading source file: {}", &args.source_file);
            std::process::exit(1);
        },
    };

    let tree = match parser.parse(&source[..], None) {
        Some(tree) => tree,
        None => {
            println!("Failed parsing source file: {}", args.source_file);
            std::process::exit(1);
        },
    };

    let out_dir = PathBuf::from(&args.out_dir.unwrap_or(format!("{}.out", args.source_file)));
    fs::create_dir_all(&out_dir).expect("create output dir");
    let intermediate_dir = out_dir.join(".intermediate");

    let ast_root = Compiler {
        out_dir: intermediate_dir,
        source: &source[..],
    }.wingit(&tree.root_node());

    println!("{:#?}", ast_root);

    println!("{}", jsify::jsify(&ast_root, true));
}
