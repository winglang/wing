class A {
  static logThisId() {
    log(this.node.id);
      //^^^^ Unkown symbol "this" 
  }
}