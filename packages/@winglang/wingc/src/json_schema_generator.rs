use crate::{
	docs::Docs,
	jsify::{codemaker::CodeMaker, JSifier},
	type_check::{symbol_env::SymbolEnv, Struct, Type, UnsafeRef},
};

pub(crate) struct JsonSchemaGenerator;

impl JsonSchemaGenerator {
	pub fn new() -> Self {
		Self {}
	}

	fn get_struct_env_properties(&self, env: &SymbolEnv) -> CodeMaker {
		let mut code = CodeMaker::default();
		for (field_name, entry) in env.symbol_map.iter() {
			let var_info = entry.kind.as_variable().unwrap();
			let docs = var_info.docs.clone();
			code.append(format!(
				"{}:{},",
				field_name,
				self.get_struct_schema_field(&entry.kind.as_variable().unwrap().type_, docs)
			));
		}
		code
	}

	fn get_struct_schema_required_fields(&self, env: &SymbolEnv) -> CodeMaker {
		let mut code = CodeMaker::default();
		code.append("required:[");
		for (field_name, entry) in env.symbol_map.iter() {
			if !matches!(*entry.kind.as_variable().unwrap().type_, Type::Optional(_)) {
				code.append(format!("\"{}\",", field_name));
			}
		}
		code.append("]");
		code
	}

	fn get_struct_schema_field(&self, typ: &UnsafeRef<Type>, docs: Option<Docs>) -> String {
		let field_type = self.get_struct_schema_field_type(typ, docs.clone());
		let mut code = CodeMaker::default();
		code.append("{");
		code.append(format!("type:{}", field_type));
		if let Some(docs) = docs {
			code.append(format!(",description:\"{}\"", docs.to_escaped_string()));
		}
		code.append("}");
		code.to_string()
	}

	fn get_struct_schema_field_type(&self, typ: &UnsafeRef<Type>, _docs: Option<Docs>) -> String {
		match **typ {
			Type::String | Type::Number | Type::Boolean => {
				format!("\"{}\"", JSifier::jsify_type(typ).unwrap())
			}
			Type::Struct(_) => "\"object\"".to_string(),
			Type::Array(_) | Type::Set(_) => "\"array\"".to_string(),
			Type::Map(_) => "\"object\"".to_string(),
			Type::Optional(ref t) => {
				let inner_type = self.get_struct_schema_field_type(t, None);
				format!("[\"null\",{}]", inner_type)
			}
			Type::Json(_) => "[\"object\",\"string\",\"boolean\",\"number\",\"array\"]".to_string(),
			Type::Enum(_) => "\"string\"".to_string(),
			_ => "\"null\"".to_string(),
		}
	}

	pub fn create_from_struct(&self, struct_: &Struct) -> CodeMaker {
		let mut code = CodeMaker::default();

		code.append("{");
		code.append(format!("$id:\"/{}\",", struct_.name));
		code.append("type:\"object\",".to_string());

		code.append("properties:{");

		code.append(self.get_struct_env_properties(&struct_.env));

		//close properties
		code.append("},");

		code.append(self.get_struct_schema_required_fields(&struct_.env));

		code.append(format!(",description:\"{}\"", struct_.docs.to_escaped_string()));

		// close schema
		code.append("}");

		code
	}
}
