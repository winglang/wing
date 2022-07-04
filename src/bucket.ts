import { Construct } from 'constructs';
import { Binding, ICapturable, ICaptureSource } from './proc';

export class Bucket extends Construct implements ICapturable {
  constructor(scope: Construct, id: string) {
    super(scope, id);
  }

  public capture(_symbol: string, _binding: Binding): ICaptureSource {
    throw new Error('Method not implemented.');
  }
}