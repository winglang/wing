use std::fmt::Display;

use crate::ast::*;

#[derive(PartialEq)]
pub enum Type {
    Number,
    String,
    Duration,
    Boolean
}

impl Display for Type {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Type::Number => write!(f, "number"),
            Type::String => write!(f, "string"),
            Type::Duration => write!(f, "duration"),
            Type::Boolean => write!(f, "bool"),
        }
    }
}


pub fn type_check_exp(exp: &Expression) -> Type {
    match exp {
        Expression::Literal(lit) => match lit {
            Literal::String(_) => Type::String,
            Literal::Number(_) => Type::Number,
            Literal::Duration(_) => Type::Duration,
        },
        Expression::Binary { op, lexp, rexp } => {
            let ltype = type_check_exp(lexp);
            let rtype = type_check_exp(rexp);
            validate_type(ltype, rtype, rexp, exp)
        }
        _ => panic!("Unknonwn type for expression: {:?}", exp)
    }
}

fn validate_type(actual_type: Type, expected_type: Type, value: &Expression, exp: &Expression) -> Type {
    if actual_type != expected_type {
        panic!("Expected type {} in {:?} to be {}, in expression {:?}", actual_type, value, expected_type, exp);
    }
    actual_type
}

pub fn type_check_scope(scope: &Scope) {
    for statement in scope.statements.iter() {
        type_check_statement(statement);
    }
}

fn type_check_statement(statement: &Statement) {
    match statement {
        Statement::VariableDef { var_name, initial_value } => todo!(),
        Statement::FunctionDefinition { name, parameters, statements } => todo!(),
        Statement::ProcessDefinition { name, parameters, statements } => todo!(),
        Statement::ForLoop { iterator, iterable, statements } => todo!(),
        Statement::If { condition, statements } => todo!(),
        Statement::Expression(e) => {
            type_check_exp(e);
        },
        Statement::Assignment { variable, value } => todo!(),
        Statement::Use { module_name, identifier } => todo!(),
    }
}