
import { Construct } from 'constructs';
import { Binding, ICapturable, ICaptureSource } from '../core';
import { Function } from './lambda';

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
