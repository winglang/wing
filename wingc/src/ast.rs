use std::collections::HashMap;

use crate::Capture;

#[derive(Debug)]
pub enum Statement {
    Use {
        module_name: String, // Reference?
        identifier: Option<String>
    },
    VariableDef {
        var_name: String,
        initial_value: Expression
    },
    FunctionDefinition {
        name: String,
        parameters: Vec<ParameterDefinition>,
        statements: Scope,
    },
    ProcessDefinition {
        name: String,
        parameters: Vec<ParameterDefinition>,
        statements: Scope,
    },
    ForLoop {
        iterator: Reference,
        iterable: Expression,
        statements: Scope,
    },
    If {
        condition: Expression,
        statements: Scope,
    },
    Expression(Expression),
    Assignment {
        variable: Reference,
        value: Expression
    }
}
#[derive(Debug)]
pub struct ParameterDefinition {
    pub name: String,
    pub parameter_type: Type,
}

#[derive(Debug)]
pub enum Type {
    Number,
    String,
    Duration,
    Boolean,
    Custom(Reference)
}

#[derive(Debug)]
pub enum Expression {
    New {
        class: Reference, // TypeReference
        obj_id: Option<String>,
        arg_list: ArgList,
    },
    Literal(Literal),
    Reference(Reference),
    FunctionCall {
        function: Reference,
        args: ArgList
    },
    MethodCall(MethodCall),
    CapturedObjMethodCall(MethodCall),
    Unary { // TODO: Split to LgicalUnary, NumericUnary
        op: UnaryOperator,
        exp: Box<Expression>,
    },
    Binary { // TODO: Split to LgicalBinary, NumericBinary, Bit/String??
        op: BinaryOperator,
        lexp: Box<Expression>,
        rexp: Box<Expression>
    }
}

#[derive(Debug)]
pub struct ArgList {
    pub pos_args: Vec<Expression>,
    pub named_args: HashMap<String, Expression>
}

impl ArgList {
    pub fn new() -> Self {
        ArgList {
            pos_args: vec![],
            named_args: HashMap::new(),
        }
    }
}

#[derive(Debug)]
pub enum Literal {
    String(String),
    Number(f64),
    Duration(f64),
}

#[derive(Debug)]
pub struct Scope {
    pub statements: Vec<Statement>
}

#[derive(Debug)]
pub struct MethodCall {
    object: Reference, // ObjectReference
    method: String,
    args: ArgList
}
#[derive(Debug)]
pub enum UnaryOperator {
    Plus,
    Minus,
    Not,
}

#[derive(Debug)]
pub enum BinaryOperator {
    Add,
    Sub,
    Mul,
    Div,
    Mod,
    Greater,
    GreaterOrEqual,
    Less,
    LessOrEqual,
    Equal,
    NotEqual,
    LogicalAnd,
    LogicalOr
}

// TODO: ObjReferene, FuncReference, MethodReference, TypeReference, CapturedObjReference, ProcReference
#[derive(Debug)]
pub struct Reference {
    //namespace: Option<Vec<String>>,
    pub namespace: Option<String>,
    pub identifier: String,
}

