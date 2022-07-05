import { Construct } from 'constructs';

export class App extends Construct {
  constructor() {
    super(undefined as any, 'App');
  }

  public synth() {
    const printNode = (c: Construct, level = 0) => {
      console.log(' '.repeat(level * 2) + c.node.id);
      for (const child of c.node.children) {
        printNode(child, level + 1);
      }
    };

    printNode(this);
  }
}