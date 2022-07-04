import { App } from '../src';
import { ImageExtractor } from './app';

test('hello', () => {
  const app = new App();
  new ImageExtractor(app, 'ImageExtractor');
  app.synth();
});