use crate::type_check::Type;
use std::collections::HashMap;

pub struct TypeEnv<'a> {
    type_map: HashMap<String, Type>,
    parent: Option<&'a TypeEnv<'a>>
}

impl<'a> TypeEnv<'a> {
    pub fn new(parent: Option<&'a TypeEnv<'a>>) -> Self {
        Self { 
            type_map: HashMap::new(), 
            parent
        }
    }

    pub fn define(&mut self, name: &str, _type: Type) {
        if self.type_map.contains_key(name) {
            panic!("Identifier {} already defined", name);
        }

        self.type_map.insert(name.into(), _type);

    }

    pub fn lookup(&self, name: &str) -> Type {
        if let Some(_type) = self.type_map.get(name) {
            *_type
        } else if let Some(parent_env) = self.parent {
            parent_env.lookup(name)
        } else {
            panic!("Unknown identifier {}", name);
        }
    }
}
