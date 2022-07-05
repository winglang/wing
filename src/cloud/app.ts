import { Construct } from 'constructs';

export class App extends Construct {
  constructor() {
    super(undefined as any, 'App');
  }

  public synth() {
    console.log(this.node.children);
  }
}