use crate::{
	ast::{Ast, Reference, ScopeId},
	fold::{self, Fold},
};

/// Replaces InstanceMembers pointing to a type a proper TypeMember.
pub struct TypeReferenceTransformer<'a> {
	pub types: &'a mut crate::type_check::Types,
	pub ast: &'a mut Ast,
}

impl<'a> Fold for TypeReferenceTransformer<'a> {
	fn ast(&self) -> &Ast {
		self.ast
	}

	fn ast_mut(&mut self) -> &mut Ast {
		self.ast
	}

	fn fold_scope(&mut self, node: ScopeId) -> ScopeId {
		if self.types.type_expressions.is_empty() {
			return node;
		} else {
			fold::fold_scope(self, node)
		}
	}
	fn fold_reference(&mut self, node: Reference) -> Reference {
		match node {
			Reference::InstanceMember { ref object, .. } => {
				if let Some(new_ref) = self.types.type_expressions.swap_remove(&object.id) {
					new_ref
				} else {
					fold::fold_reference(self, node)
				}
			}
			Reference::Identifier(..) | Reference::TypeMember { .. } => node,
		}
	}
}
