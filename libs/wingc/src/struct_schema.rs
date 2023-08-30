use crate::{jsify::JSifier, visit::Visit, ast::Reference, visit_context::{VisitContext, VisitorWithContext}};

pub struct ReferenceVisitor<'a> {
  jsify: &'a JSifier<'a>,
  ctx: VisitContext
}

impl<'a> ReferenceVisitor<'a> {
  pub fn new(jsifier: &'a JSifier<'a>) -> Self {
    Self { 
      jsify: jsifier,
      ctx: VisitContext::new()
    }
  }
}

impl<'a> Visit<'a> for ReferenceVisitor<'a> {
  fn visit_reference(&mut self, node: &'a crate::ast::Reference) {
    match node {
      Reference::TypeMember { type_name, property } => {
        // dbg!(&type_name);
        // let lookup = self.ctx.current_env().unwrap().lookup_nested_str(&type_name.root.name, None);
        // let lookup = self.ctx().current_env().unwrap().lookup_nested_str(&type_name.root.name, None);
        // dbg!(&lookup);
      }
      _ => {}
    }
  }
}

impl VisitorWithContext for ReferenceVisitor<'_> {
  fn ctx(&mut self) -> &mut VisitContext {
    &mut self.ctx
  }
}