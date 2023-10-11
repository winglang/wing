use std::collections::BTreeMap;

use itertools::Itertools;

use crate::{
	ast::Phase,
	closure_transform::CLOSURE_CLASS_PREFIX,
	jsify::codemaker::CodeMaker,
	type_check::{
		jsii_importer::is_construct_base, Class, ClassLike, Enum, FunctionSignature, Interface, Namespace, Struct,
		SymbolKind, Type, TypeRef, VariableInfo, VariableKind,
	},
};

#[derive(Debug, Default, Clone)]
pub struct Docs {
	pub summary: Option<String>,
	pub remarks: Option<String>,
	pub example: Option<String>,

	pub returns: Option<String>,
	pub deprecated: Option<String>,
	pub see: Option<String>,

	pub custom: BTreeMap<String, String>,

	// ---
	pub default: Option<String>,
	pub stability: Option<String>,
	pub subclassable: Option<bool>,
}

pub trait Documented {
	fn render_docs(&self) -> String;
}

impl Docs {
	pub(crate) fn with_summary(summary: &str) -> Docs {
		Docs {
			summary: Some(summary.to_string()),
			..Default::default()
		}
	}
}

impl Documented for SymbolKind {
	fn render_docs(&self) -> String {
		match self {
			SymbolKind::Type(t) => t.render_docs(),
			SymbolKind::Variable(v) => v.render_docs(),
			SymbolKind::Namespace(n) => n.render_docs(),
		}
	}
}

impl Documented for Namespace {
	fn render_docs(&self) -> String {
		format!("Module `{}`", self.name).to_string()
	}
}

impl Documented for TypeRef {
	fn render_docs(&self) -> String {
		match &**self {
			Type::Function(f) => render_function(f),
			Type::Class(c) => render_class(c),
			Type::Interface(i) => render_interface(i),
			Type::Struct(s) => render_struct(s),
			Type::Optional(t) => t.render_docs(),
			Type::Enum(e) => render_enum(e),

			// primitive types don't have docs yet
			Type::Anything
			| Type::Number
			| Type::String
			| Type::Duration
			| Type::Boolean
			| Type::Void
			| Type::Json(_)
			| Type::MutJson
			| Type::Nil
			| Type::Inferred(_)
			| Type::Unresolved
			| Type::Array(_)
			| Type::MutArray(_)
			| Type::Map(_)
			| Type::MutMap(_)
			| Type::Set(_)
			| Type::MutSet(_) => "".to_string(),
		}
	}
}

impl Documented for VariableInfo {
	fn render_docs(&self) -> String {
		let mut modifiers = vec![];

		if let VariableKind::StaticMember = self.kind {
			modifiers.push("static");
		}

		match self.phase {
			Phase::Inflight => modifiers.push("inflight"),
			Phase::Preflight => modifiers.push("preflight"),
			Phase::Independent => {}
		}

		if self.reassignable {
			modifiers.push("var");
		}

		let modifiers_str = modifiers.join(" ");
		let name_str = if modifiers.is_empty() {
			self.name.name.clone()
		} else {
			format!("{} {}", modifiers_str, self.name)
		};

		let mut markdown = CodeMaker::default();
		markdown.line("```wing");
		markdown.line(format!("{name_str}: {}", self.type_));

		if let Some(d) = &self.docs {
			markdown.line("```");

			markdown.line("---");

			if let Some(summary) = &d.summary {
				markdown.line(summary);
				markdown.empty_line();
			}

			render_docs(&mut markdown, d);
		} else {
			let type_docs = self.type_.render_docs();

			if !type_docs.is_empty() {
				if type_docs.starts_with("```wing") {
					// skip the first line to combine the code block
					markdown.line(type_docs.lines().skip(1).join("\n"));
				} else {
					markdown.line("```");
					markdown.line("---");
					markdown.line(type_docs);
				}
			} else {
				markdown.line("```");
			}
		}

		markdown.to_string().trim().to_string()
	}
}

fn render_docs(markdown: &mut CodeMaker, docs: &Docs) {
	if let Some(s) = &docs.returns {
		markdown.empty_line();
		markdown.line("### Returns");
		markdown.line(s);
	}

	if let Some(s) = &docs.remarks {
		markdown.empty_line();
		markdown.line("### Remarks");
		markdown.line(s);
	}

	if let Some(s) = &docs.example {
		markdown.empty_line();
		markdown.line("### Example");
		// For now, the examples are all still in typescript
		markdown.line("```ts");
		markdown.line(s);
		markdown.line("```");
	}

	markdown.empty_line();

	if let Some(_) = &docs.deprecated {
		markdown.line("@deprecated");
	}

	docs.custom.iter().for_each(|(k, v)| {
		// skip "@inflight" because it is already included in the type system
		if k == "inflight" {
			return;
		}
		if k == "macro" {
			return;
		}
		// marking types that are skipped/changed in the documentation, irrelevant to the language server
		if k == "skipDocs" || k == "wingType" {
			return;
		}

		let value = if v == "true" {
			String::default()
		} else {
			format!("*{v}*")
		};
		markdown.line(format!("*@{}* {}", k, value));
	});

	if let Some(s) = &docs.see {
		markdown.empty_line();
		markdown.line(format!("See [{}]({})", s, s));
	}
}

fn render_function(f: &FunctionSignature) -> String {
	let mut markdown = CodeMaker::default();

	if let Some(s) = &f.docs.summary {
		markdown.line(s);
	}

	if has_parameters_documentation(f) {
		markdown.empty_line();
		markdown.line("### Parameters");

		for p in &f.parameters {
			let summary = if let Some(s) = &p.docs.summary {
				format!(" — {}", s)
			} else {
				String::default()
			};

			markdown.line(format!("- `{}`{}", p.name, summary));
		}
	}

	render_docs(&mut markdown, &f.docs);

	markdown.to_string().trim().to_string()
}

fn has_parameters_documentation(f: &FunctionSignature) -> bool {
	f.parameters.iter().any(|p| p.docs.summary.is_some())
}

fn render_struct(s: &Struct) -> String {
	let mut markdown = CodeMaker::default();

	let extends = s.extends.iter().map(ToString::to_string).join(", ");
	let extends = if extends.is_empty() {
		String::default()
	} else {
		format!(" extends {}", extends)
	};

	markdown.line("```wing");
	markdown.line(format!("struct {}{extends}", s.name));
	markdown.line("```");
	markdown.line("---");

	if let Some(s) = &s.docs.summary {
		markdown.line(s);
	}

	if s.fields(true).count() > 0 {
		markdown.line("### Fields");
	}

	for field in s.env.iter(true) {
		let Some(variable) = field.1.as_variable() else {
			continue;
		};
		let optional = if variable.type_.is_option() { "?" } else { "" };
		markdown.line(&format!(
			"- `{}{optional}` — {}\n",
			field.0,
			variable
				.docs
				.as_ref()
				.and_then(|d| d.summary.clone())
				.unwrap_or(format!("{}", variable.type_))
		));
	}

	render_docs(&mut markdown, &s.docs);

	markdown.to_string().trim().to_string()
}

fn render_interface(i: &Interface) -> String {
	let mut markdown = CodeMaker::default();

	let extends = i
		.extends
		.iter()
		.map(|i| render_typeref(&Some(*i)))
		.map(|i| i.unwrap_or_default())
		.collect_vec();

	let extends = if !extends.is_empty() {
		format!(" extends {}", extends.join(", "))
	} else {
		String::default()
	};

	markdown.line("```wing");
	markdown.line(format!("interface {}{extends}", i.name));
	markdown.line("```");
	markdown.line("---");

	if let Some(s) = &i.docs.summary {
		markdown.line(s);
	}

	if i.env.iter(true).next().is_some() {
		markdown.line("### Methods");
	}

	for prop in i.env.iter(true) {
		let prop_docs = prop
			.1
			.as_variable()
			.and_then(|v| v.docs.as_ref().and_then(|d| d.summary.clone()));
		markdown.line(&format!(
			"- `{}` — {}\n",
			prop.0,
			prop_docs.unwrap_or(format!("`{}`", prop.1.as_variable().unwrap().type_))
		));
	}

	markdown.empty_line();

	render_docs(&mut markdown, &i.docs);

	markdown.to_string().trim().to_string()
}

fn render_enum(e: &Enum) -> String {
	let mut markdown = CodeMaker::default();

	markdown.line("```wing");
	markdown.line(format!("enum {}", e.name));
	markdown.line("```");
	markdown.line("---");

	if let Some(s) = &e.docs.summary {
		markdown.line(s);
	}

	for prop in e.values.iter() {
		markdown.line(&format!("- `{}`\n", prop));
	}

	markdown.empty_line();

	render_docs(&mut markdown, &e.docs);

	markdown.to_string().trim().to_string()
}

fn render_class(c: &Class) -> String {
	if c.name.name.starts_with(CLOSURE_CLASS_PREFIX) {
		if let Some(closure) = c.get_closure_method() {
			return closure.maybe_unwrap_option().render_docs();
		}
	}

	let mut markdown = CodeMaker::default();

	markdown.line("```wing");

	let extends = if let Some(t) = render_typeref(&c.parent) {
		format!(" extends {}", t)
	} else {
		String::default()
	};

	let interfaces = c
		.implements
		.iter()
		.map(|i| render_typeref(&Some(*i)))
		.map(|i| i.unwrap_or_default())
		.collect_vec();

	let implements = if !interfaces.is_empty() {
		format!(" impl {}", interfaces.join(", "))
	} else {
		String::default()
	};

	markdown.line(format!("class {}{}{}", c.name, extends, implements));

	markdown.line("```");
	markdown.line("---");

	if let Some(s) = &c.docs.summary {
		markdown.line(s);
	}
	render_docs(&mut markdown, &c.docs);

	// if let Some(initializer) = c.get_init() {
	// 	let rfn = initializer.render_docs();
	// 	markdown.line(rfn);
	// }

	markdown.to_string().trim().to_string()
}

fn render_typeref(typeref: &Option<TypeRef>) -> Option<String> {
	let Some(t) = typeref else {
		return None;
	};

	if let Some(class) = t.as_class() {
		// if the base class is "Resource" or "Construct" then we don't need to render it
		if let Some(fqn) = &class.fqn {
			if is_construct_base(&fqn) {
				return None;
			}
		}
	}

	// use TypeRef's Display trait to render the type
	Some(t.to_string())
}
