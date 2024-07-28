use crate::{
	docs::Documented, jsify::{codemaker::CodeMaker, JSifier}, type_check::{symbol_env::SymbolEnv, Struct, Type, UnsafeRef}
};

pub(crate) struct JsonSchemaGenerator;

impl JsonSchemaGenerator {
	pub fn new() -> Self {
		Self {}
	}

	fn get_struct_env_properties(&self, env: &SymbolEnv) -> CodeMaker {
		let mut code = CodeMaker::default();
		for (field_name, entry) in env.symbol_map.iter() {
			code.line(format!(
				"{}: {{ {}, \"description\": \"{}\" }},",
				field_name,
				self.get_struct_schema_field(&entry.kind.as_variable().unwrap().type_),
				entry.kind.render_docs().replace("\n", "\\n")
			));
		}
		code
	}

	fn get_struct_schema_required_fields(&self, env: &SymbolEnv) -> CodeMaker {
		let mut code = CodeMaker::default();
		code.open("required: [");
		for (field_name, entry) in env.symbol_map.iter() {
			if !matches!(*entry.kind.as_variable().unwrap().type_, Type::Optional(_)) {
				code.line(format!("\"{}\",", field_name));
			}
		}
		code.close("]");
		code
	}

	fn get_struct_schema_field(&self, typ: &UnsafeRef<Type>) -> String {
		match **typ {
			Type::String | Type::Number | Type::Boolean => {
				format!(" type: \"{}\" ", JSifier::jsify_type(typ).unwrap())
			}
			Type::Struct(ref s) => {
				let mut code = CodeMaker::default();
				code.line("type: \"object\",");
				code.open("properties: {");
				code.add_code(self.get_struct_env_properties(&s.env));
				code.close("},");
				code.add_code(self.get_struct_schema_required_fields(&s.env));
				code.to_string()
			}
			Type::Array(ref t) | Type::Set(ref t) => {
				let mut code = CodeMaker::default();
				code.line("type: \"array\",");

				if matches!(**typ, Type::Set(_)) {
					code.line("uniqueItems: true,");
				}

				code.line(format!("items: {}", self.get_struct_schema_field(t)));

				code.to_string()
			}
			Type::Map(ref t) => {
				let mut code = CodeMaker::default();
				code.line("type: \"object\",");
				code.line(format!(
					"patternProperties: {{ \".*\": {} }}",
					self.get_struct_schema_field(t)
				));

				code.to_string()
			}
			Type::Optional(t) => self.get_struct_schema_field(&t),
			Type::Json(_) => " type: [\"object\", \"string\", \"boolean\", \"number\", \"array\"] ".to_string(),
			_ => " type: \"null\" ".to_string(),
		}
	}

	pub fn create_from_struct(&self, struct_: &Struct) -> CodeMaker {
		let mut code = CodeMaker::default();

		code.open("{");
		code.line(format!("$id: \"/{}\",", struct_.name));
		code.line("type: \"object\",".to_string());
		code.line(format!("description: \"{}\",", struct_.docs.render().replace("\n", "\\n")));

		code.open("properties: {");

		code.add_code(self.get_struct_env_properties(&struct_.env));

		//close properties
		code.close("},");

		code.add_code(self.get_struct_schema_required_fields(&struct_.env));

		// close schema
		code.close("}");

		let cleaned = code.to_string();

		CodeMaker::one_line(cleaned)
	}
}
