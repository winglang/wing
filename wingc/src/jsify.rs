use std::fmt::format;

use crate::ast::{Statement, Scope, Expression};

const STDLIB: &str = "$stdlib";
const STDLIB_MODULE: &str = "@monadahq/wingsdk";

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

pub fn jsify(scope: &Scope, shim: bool) -> String {
    let mut js = vec![];
    let mut imports = vec![];

    for statement in scope.statements.iter() {
        let line = jsify_statement(statement);
        if line.is_empty() {
            continue;
        }
        if let Statement::Use { identifier, module_name } = statement {
            imports.push(line);
        } else {
            js.push(line);
        }
    }
    
    let mut output = vec![];
    
    if shim {
        output.push(format!("const {} = require('{}');", STDLIB, STDLIB_MODULE));
    }

    output.append(&mut imports);

    if shim {
        js.insert(0, "super();\n".to_string());
        output.push(format!("class MyApp extends {}.cloud.App {{\nconstructor() {}\n}}", STDLIB, render_block(js)));
        output.push("new MyApp().synth();".to_string());
    } else {
        output.append(&mut js);
    }
    output.join("\n")
}

fn jsify_scope(scope: &Scope) -> String {
    let mut lines = vec![];
    lines.push("{".to_string());

    for statement in scope.statements.iter() {
      let statement_str = format!("{}", jsify_statement(statement));
      let result = statement_str.split("\n");
      for l in result {
        lines.push(format!("  {}", l));
      }
    }

    lines.push("}".to_string());
    return lines.join("\n");
}

fn jsify_expression(expression: &Expression) -> String {
    match expression {
        Expression::New { class, obj_id, arg_list } => todo!(),
        Expression::Literal(lit) => match lit {
            crate::ast::Literal::String(s) => format!("\"{}\"", s),
            crate::ast::Literal::Number(n) => format!("{}", n),
            crate::ast::Literal::Duration(sec) => format!("{}.core.Duration.fromSeconds({})", STDLIB, sec),
        },
        Expression::Reference(_) => todo!(),
        Expression::FunctionCall { function, args } => todo!(),
        Expression::MethodCall(_) => todo!(),
        Expression::CapturedObjMethodCall(_) => todo!(),
        Expression::Unary { op, exp } => todo!(),
        Expression::Binary { op, lexp, rexp } => {
            let op = match op {
                crate::ast::BinaryOperator::Add => "+",
                crate::ast::BinaryOperator::Sub => "-",
                crate::ast::BinaryOperator::Mul => "*",
                crate::ast::BinaryOperator::Div => "/",
                crate::ast::BinaryOperator::Mod => "%",
                crate::ast::BinaryOperator::Greater => ">",
                crate::ast::BinaryOperator::GreaterOrEqual => ">=",
                crate::ast::BinaryOperator::Less => "<",
                crate::ast::BinaryOperator::LessOrEqual => "<=",
                crate::ast::BinaryOperator::Equal => "===",
                crate::ast::BinaryOperator::NotEqual => "!==",
                crate::ast::BinaryOperator::LogicalAnd => "&&",
                crate::ast::BinaryOperator::LogicalOr => "||",
            };
            format!("({}{}{})", jsify_expression(lexp), op, jsify_expression(rexp))
        },
    }
}

fn jsify_statement(statement: &Statement) -> String {
    match statement {
        Statement::Use { module_name, identifier } => {
            if let Some(identifier) = identifier {
                // use <module_name> from <parent_module>
                format!("const {} = require('{}/{}').{};", module_name, STDLIB_MODULE, module_name, identifier)
            } else {
                // use <module_name>
                format!("const {} = require('{}').{};", module_name, STDLIB_MODULE, module_name)
            }
        },
        Statement::VariableDef { var_name, initial_value } => {
            let initial_value = jsify_expression(initial_value);
            format!("const {} = {};", var_name, initial_value)
        },
        Statement::FunctionDefinition { name, parameters, statements } => {
            let mut parameter_list = vec![];
            for p in parameters {
                parameter_list.push(p.name.clone());
            }
            
            format!("function {}({}) {}", name, parameter_list.join(", "), jsify_scope(statements))
        },
        Statement::ProcessDefinition { name, parameters, statements } => {
            /*
            let parameter_list = vec![];
            for p in parameters {
                parameter_list.push(p.name);
            }
    
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
            */
            todo!()

        },
        Statement::ForLoop { iterator, iterable, statements } => todo!(),
        Statement::If { condition, statements } => todo!(),
        Statement::Expression(e) => jsify_expression(e),
        Statement::Assignment { variable, value } => todo!(),
    }
}