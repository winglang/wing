use crate::{
	ast::{Expr, ExprKind, Intrinsic, IntrinsicKind, Scope},
	diagnostic::{report_diagnostic, Diagnostic, DiagnosticSeverity},
	type_check::{JsonData, JsonDataKind, SpannedTypeInfo, Type, Types},
	visit::{self, Visit},
};

/// This visitor validates that all Json literal expression only has legal json values unless it is being cast to another type.
///
/// This is not during the initial type checking pass for 2 reasons:
/// - All inferences need to be resolved first.
/// - When type checking an expression, it's not known if the literal is only being used for casting so we don't know whether to skip the validation or not
pub struct ValidJsonVisitor<'a> {
	types: &'a Types,
}

impl<'a> ValidJsonVisitor<'a> {
	pub fn new(types: &'a Types) -> Self {
		Self { types }
	}

	pub fn check(&mut self, scope: &Scope) {
		self.visit_scope(scope);
	}

	fn report_invalid_json_value(&mut self, inner: &SpannedTypeInfo) {
		let tt = self.types.maybe_unwrap_inference(inner.type_);
		// Report an error if this isn't a valid type to put in a json (avoiding cascading errors resulting from unresolved types)
		if !tt.is_json_legal_value() && !tt.is_unresolved() {
			report_diagnostic(Diagnostic {
				message: format!("\"{tt}\" is not a legal JSON value"),
				span: Some(inner.span.clone()),
				annotations: vec![],
				hints: vec![],
				severity: DiagnosticSeverity::Error,
			})
		}
	}
}

impl<'a> Visit<'_> for ValidJsonVisitor<'a> {
	fn visit_expr(&mut self, expr: &Expr) {
		if matches!(
			expr.kind,
			ExprKind::Intrinsic(Intrinsic {
				kind: IntrinsicKind::Unknown,
				..
			})
		) {
			// don't bother checking unknown intrinsics
			return;
		}

		if let Some(t) = self.types.try_get_expr_type(expr.id) {
			let t = self.types.maybe_unwrap_inference(t);

			// If the type is Array<Json>, check if the entire array is being cast to a Array<Struct>
			if let Type::Array(inner_t) = &*t {
				let inner_t = self.types.maybe_unwrap_inference(*inner_t);
				if let Type::Json(Some(JsonData { expression_id, .. })) = &*inner_t {
					let exclude = if expr.id == *expression_id {
						// this is a origin of the Json literal data, so check if it's being cast to something else
						self.types.get_type_from_json_cast(*expression_id).is_some()
					} else {
						// only bother checking literals, no reason to check references to Json data
						matches!(expr.kind, ExprKind::JsonLiteral { .. })
					};
					if exclude {
						return;
					}
				}
			}

			// if the type is json with known values, then we may need to validate that the values are legal json values
			if let Type::Json(Some(JsonData { kind, expression_id })) = &*t {
				// if this json expr is not being cast to something else, then it must be a legal json value
				let exclude = if expr.id == *expression_id {
					// this is a origin of the Json literal data, so check if it's being cast to something else
					self.types.get_type_from_json_cast(*expression_id).is_some()
				} else {
					// only bother checking literals, no reason to check references to Json data
					matches!(expr.kind, ExprKind::JsonLiteral { .. })
				};
				if !exclude {
					match kind {
						JsonDataKind::Type(inner) => {
							self.report_invalid_json_value(inner);
						}
						JsonDataKind::Fields(fields) => {
							for (_, inner) in fields {
								self.report_invalid_json_value(inner);
							}
						}
						JsonDataKind::List(list) => {
							for v in list {
								self.report_invalid_json_value(v);
							}
						}
					}

					// don't bother checking the children of this expr since we've already validated the json values
					return;
				}
			}
		}

		visit::visit_expr(self, expr);
	}
}
