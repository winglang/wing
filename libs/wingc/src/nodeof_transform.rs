use crate::{
	ast::{CalleeKind, Expr, ExprKind, Reference, Symbol, UserDefinedType},
	diagnostic::WingSpan,
	fold::{self, Fold},
};

/// Transforms `nodeof(x)` expressions into `std.Node.of(x)`
pub struct NodeofTransformer;

impl NodeofTransformer {
	pub fn new() -> Self {
		Self
	}
}

impl Fold for NodeofTransformer {
	fn fold_expr(&mut self, expr: Expr) -> Expr {
		let file_id = &expr.span.file_id;

		let ExprKind::Call { callee, arg_list } = expr.kind else {
			return fold::fold_expr(self, expr);
		};

		let arg_list = self.fold_args(arg_list);

		let callee = match callee {
			CalleeKind::Expr(call_expr) => call_expr,
			_ => {
				return Expr {
					kind: ExprKind::Call { callee, arg_list },
					id: expr.id,
					span: expr.span,
				};
			}
		};

		let ExprKind::Reference(Reference::Identifier(Symbol { ref name, .. })) = callee.kind else {
			return Expr {
				kind: ExprKind::Call {
					callee: CalleeKind::Expr(callee),
					arg_list,
				},
				id: expr.id,
				span: expr.span,
			};
		};

		if name != "nodeof" {
			return Expr {
				kind: ExprKind::Call {
					callee: CalleeKind::Expr(callee),
					arg_list,
				},
				id: expr.id,
				span: expr.span,
			};
		}

		Expr::new(
			ExprKind::Call {
				callee: CalleeKind::Expr(Box::new(Expr::new(
					ExprKind::Reference(Reference::TypeMember {
						type_name: UserDefinedType {
							root: Symbol::new("std", WingSpan::for_file(file_id)),
							fields: vec![Symbol::new("Node", WingSpan::for_file(file_id))],
							span: WingSpan::for_file(file_id),
						},
						property: Symbol::new("of", WingSpan::for_file(file_id)),
					}),
					WingSpan::for_file(file_id),
				))),
				arg_list,
			},
			WingSpan::for_file(file_id),
		)
	}
}
