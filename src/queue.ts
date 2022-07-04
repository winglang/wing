
import { Construct } from 'constructs';
import { Function } from './lambda';
import { Binding, ICapturable, ICaptureSource } from './proc';

export class Queue extends Construct implements ICapturable {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  public addWorker(fn: Function) {
    fn;
  }

  public capture(_symbol: string, _binding: Binding): ICaptureSource {
    throw new Error('Method not implemented.');
  }
}
