import * as fs from 'fs';
import { Construct } from 'constructs';

export interface FileProps {
  readonly contents?: string;
}

export class File extends Construct {
  constructor(scope: Construct, id: string, filename: string, props: FileProps) {
    super(scope, id);

    if (props.contents) {
      fs.writeFileSync(filename, props.contents);
    }
  }
}
