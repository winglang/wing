use crate::{
	ast::{FunctionDefinition, Reference},
	visit::{self, Visit},
};

/// Visits an expression and determines whether it contains a reference to a
/// variable that is being initialized in the same statement.
///
/// For example, in `let x = x;` the right-hand side references `x`, which at
/// runtime causes a `ReferenceError` because the variable does not exist yet
/// (Wing has no TDZ semantics users can rely on). This visitor flags such
/// self-references so the compiler can emit a clear error instead.
#[derive(Default)]
pub struct SelfReferenceVisitor {
	var_name: Option<String>,
	pub has_self_reference: bool,
}

impl SelfReferenceVisitor {
	pub fn analyze(&mut self, var_name: &str, expr: &crate::ast::Expr) {
		self.var_name = Some(var_name.to_string());
		self.has_self_reference = false;
		self.visit_expr(expr);
	}
}

impl Visit<'_> for SelfReferenceVisitor {
	fn visit_reference(&mut self, node: &Reference) {
		if let Reference::Identifier(symbol) = node {
			if Some(&symbol.name) == self.var_name.as_ref() {
				self.has_self_reference = true;
			}
		}
		visit::visit_reference(self, node);
	}

	fn visit_function_definition(&mut self, _node: &FunctionDefinition) {
		// Don't recurse into closures. A reference to the variable being
		// initialized inside a closure is only resolved when the closure is
		// called, which happens after the variable has been initialized, so it
		// is not a self-reference error.
	}
}

#[cfg(test)]
mod tests {
	use super::*;
	use crate::ast::{
		AccessModifier, Expr, ExprKind, FunctionBody, FunctionDefinition, FunctionSignature, InterpolatedString,
		InterpolatedStringPart, Literal, Phase, Reference, Scope, Stmt, StmtKind, Symbol, TypeAnnotation, TypeAnnotationKind,
	};
	use crate::diagnostic::WingSpan;

	fn span() -> WingSpan {
		WingSpan::for_file("test")
	}

	fn expr(kind: ExprKind) -> Expr {
		Expr::new(kind, span())
	}

	fn ident(name: &str) -> Expr {
		let symbol = Symbol::new(name, span());
		expr(ExprKind::Reference(Reference::Identifier(symbol)))
	}

	fn stmt(kind: StmtKind) -> Stmt {
		Stmt {
			kind,
			span: span(),
			idx: 0,
			doc: None,
		}
	}

	fn closure(body: Vec<Stmt>) -> Expr {
		let signature = FunctionSignature {
			parameters: vec![],
			return_type: Box::new(TypeAnnotation {
				kind: TypeAnnotationKind::Void,
				span: span(),
			}),
			phase: Phase::Preflight,
		};
		let def = FunctionDefinition {
			name: None,
			body: FunctionBody::Statements(Scope::new(body, span())),
			signature,
			is_static: true,
			access: AccessModifier::Public,
			doc: None,
			span: span(),
		};
		expr(ExprKind::FunctionClosure(def))
	}

	#[test]
	fn detects_direct_self_reference() {
		let mut visitor = SelfReferenceVisitor::default();
		visitor.analyze("body", &ident("body"));
		assert!(visitor.has_self_reference);
	}

	#[test]
	fn detects_self_reference_nested_in_expression() {
		// `${body}world` is represented as an interpolated string literal
		let mut visitor = SelfReferenceVisitor::default();
		let str_literal = expr(ExprKind::Literal(Literal::InterpolatedString(InterpolatedString {
			parts: vec![InterpolatedStringPart::Expr(ident("body"))],
		})));
		visitor.analyze("body", &str_literal);
		assert!(visitor.has_self_reference);
	}

	#[test]
	fn ignores_references_to_other_variables() {
		let mut visitor = SelfReferenceVisitor::default();
		let expr = expr(ExprKind::Binary {
			op: crate::ast::BinaryOperator::AddOrConcat,
			left: Box::new(ident("body")),
			right: Box::new(ident("other")),
		});
		visitor.analyze("foo", &expr);
		assert!(!visitor.has_self_reference);
	}

	#[test]
	fn ignores_self_reference_inside_closure() {
		// `let f = () => { return body; };` -- the reference to `body` is only
		// resolved when the closure is invoked, after `f` is initialized, so it
		// should not be flagged.
		let closure_body = vec![stmt(StmtKind::Return(Some(ident("body"))))];
		let mut visitor = SelfReferenceVisitor::default();
		visitor.analyze("f", &closure(closure_body));
		assert!(!visitor.has_self_reference);
	}
}
