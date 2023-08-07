use crate::{
	ast::{Expr, Scope},
	diagnostic::{report_diagnostic, Diagnostic},
	type_check::{JsonData, JsonDataKind, Type, Types},
	visit::{self, Visit},
};

/// This visitor validates:
/// 1. All expressions in the AST were resolved to some type.
/// 2. If any were resolved to `Unresolved` then we should have generated some error diagnostics.
/// 3. Any Json literal expression only has legal json values unless it is being used as a struct.
pub struct TypeCheckAssert<'a> {
	types: &'a Types,
	tc_found_errors: bool,
}

impl<'a> TypeCheckAssert<'a> {
	pub fn new(types: &'a Types, tc_found_errors: bool) -> Self {
		Self { types, tc_found_errors }
	}

	pub fn check(&mut self, scope: &Scope) {
		self.visit_scope(scope);
	}
}

impl<'a> Visit<'_> for TypeCheckAssert<'a> {
	fn visit_expr(&mut self, expr: &Expr) {
		if let Some(t) = self.types.try_get_expr_type(expr) {
			assert!(
				self.tc_found_errors || !t.is_unresolved(),
				"Expr's type was not resolved: {:?}",
				expr
			);

			// if the type is json with known values, then we need to validate that the values are legal json values
			if let Type::Json(Some(JsonData { kind, expression_id })) = &*t {
				// if this json expr is not being cast to something else, then it must be a legal json value
				if self.types.get_type_from_json_cast(*expression_id).is_none() {
					match kind {
						JsonDataKind::Type(inner) => {
							let tt = self.types.maybe_unwrap_inference(inner.type_);
							if !tt.is_json_legal_value() {
								report_diagnostic(Diagnostic {
									message: format!("\"{tt}\" is not a legal JSON value"),
									span: Some(inner.span.clone()),
								})
							}
						}
						JsonDataKind::Fields(fields) => {
							for (_, inner) in fields {
								let tt = self.types.maybe_unwrap_inference(inner.type_);
								if !tt.is_json_legal_value() {
									report_diagnostic(Diagnostic {
										message: format!("\"{tt}\" is not a legal JSON value"),
										span: Some(inner.span.clone()),
									})
								}
							}
						}
						JsonDataKind::List(list) => {
							for v in list {
								let tt = self.types.maybe_unwrap_inference(v.type_);
								if !tt.is_json_legal_value() {
									report_diagnostic(Diagnostic {
										message: format!("\"{tt}\" is not a legal JSON value"),
										span: Some(v.span.clone()),
									})
								}
							}
						}
					}
				}
			}
		} else {
			panic!("Expr was not type checked: {:?}", expr)
		}
		visit::visit_expr(self, expr);
	}
}
