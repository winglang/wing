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
		match **typ {
			Type::String | Type::Number | Type::Boolean => {
				let jsified_type = JSifier::jsify_type(typ).unwrap();
				match docs {
					Some(docs) => format!(
						"{{type:\"{}\",description:\"{}\"}}",
						jsified_type,
						docs.to_escaped_string()
					),
					None => format!("{{type:\"{}\"}}", jsified_type),
				}
			}
			Type::Struct(ref s) => {
				let mut code = CodeMaker::default();
				code.append("{");
				code.append("type:\"object\",");
				code.append("properties:{");
				code.append(self.get_struct_env_properties(&s.env));
				code.append("},");
				code.append(self.get_struct_schema_required_fields(&s.env));
				let docs = docs.unwrap_or(s.docs.clone());
				code.append(format!(",description:\"{}\"", docs.to_escaped_string()));
				code.append("}");
				code.to_string()
			}
			Type::Array(ref t) | Type::Set(ref t) => {
				let mut code = CodeMaker::default();
				code.append("{");

				code.append("type:\"array\"");

				if matches!(**typ, Type::Set(_)) {
					code.append(",uniqueItems:true");
				}

				code.append(format!(",items:{}", self.get_struct_schema_field(t, None)));

				if let Some(docs) = docs {
					code.append(format!(",description:\"{}\"", docs.to_escaped_string()));
				}

				code.append("}");
				code.to_string()
			}
			Type::Map(ref t) => {
				let mut code = CodeMaker::default();
				code.append("{");

				code.append("type:\"object\",");
				code.append(format!(
					"patternProperties: {{\".*\":{}}},",
					self.get_struct_schema_field(t, None)
				));

				if let Some(docs) = docs {
					code.append(format!("description:\"{}\",", docs.to_escaped_string()));
				}

				code.append("}");
				code.to_string()
			}
			Type::Optional(ref t) => format!("{{oneOf:[{{type:\"null\"}},{}]}}", self.get_struct_schema_field(t, docs)),
			Type::Json(_) => match docs {
				Some(docs) => format!(
					"{{type:[\"object\",\"string\",\"boolean\",\"number\",\"array\"],description:\"{}\"}}",
					docs.to_escaped_string()
				),
				None => "{type:[\"object\",\"string\",\"boolean\",\"number\",\"array\"]}".to_string(),
			},
			Type::Enum(ref enu) => {
				let choices = enu
					.values
					.iter()
					.map(|(s, _)| format!("\"{}\"", s))
					.collect::<Vec<String>>()
					.join(", ");
				let docs = docs.unwrap_or(enu.docs.clone());
				format!(
					"{{type:\"string\",enum:[{}],description:\"{}\"}}",
					choices,
					docs.to_escaped_string()
				)
			}
			_ => match docs {
				Some(docs) => format!("{{type:\"null\",description:\"{}\" }}", docs.to_escaped_string()),
				None => "{type:\"null\"}".to_string(),
			},
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
