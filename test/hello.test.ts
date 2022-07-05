import { cloud } from '../src';
import { ImageExtractor } from './app';

test('hello', () => {
  const app = new cloud.App();
  new ImageExtractor(app, 'ImageExtractor');
  app.synth();
});