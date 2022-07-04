import { Construct } from 'constructs';
import * as cloud from '../../src';

export interface PageParserProps {
  readonly outgoing: cloud.Queue;
}

export class ImageExtractor extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const queue = new cloud.Queue(this, 'Queue');
    new PageParser(this, 'PageParser', { outgoing: queue });
    new ImageStore(this, 'ImageStore', { incoming: queue });
  }
}

export interface PageParserProps {
  readonly outgoing: cloud.Queue;
}

export class PageParser extends Construct {
  constructor(scope: Construct, id: string, props: PageParserProps) {
    super(scope, id);

    const image_extractor_endpoint = new cloud.Endpoint(this, 'Endpoint');

    const page_parser_handler = new cloud.Process({
      path: __dirname + '/inflight/page-parser',
      bindings: {
        outgoing: {
          obj: props.outgoing,
          methods: ['push'],
        },
      },
    });

    image_extractor_endpoint.onGet('/image_extractor', page_parser_handler);
  }
}

export interface ImageStoreProps {
  readonly incoming: cloud.Queue;
}

export class ImageStore extends Construct {
  constructor(scope: Construct, id: string, props: ImageStoreProps) {
    super(scope, id);

    const bucket = new cloud.Bucket(this, 'Bucket');
    const image_store_handler = new cloud.Process({
      path: __dirname + '/inflight/image-store',
      bindings: {
        bucket: {
          obj: bucket,
          methods: ['upload'],
        },
      },
    });

    const image_store = new cloud.Function(this, 'Function', {
      handler: image_store_handler,
    });

    props.incoming.addWorker(image_store);
  }
}