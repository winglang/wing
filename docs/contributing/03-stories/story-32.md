# User Story 31 - Wing Platforms

Marcus is an engineer in the Platform Engineering Team for a large company that has multiple internal teams all building applications that get deployed into the cloud. 

Recently, his company decided to start investigating adopting Winglang as the main language for their internal teams. However, his company's Cloud Center of Excellence (CCoE) 
has a few concerns about adopting Winglang. Primarily, they are concerned about how they will still be able to enforce company best practices and standards across all the teams,
if Wing infers the infrastructure from the code.

Marcus, has taken up the torch to investigate how they can conform the Winglang code written by the internal teams to the company standards. He has stumbled upon the concept of
Wing Platforms and is now a few energy drinks deep into a late night investigation.

The Wing documentation on Custom Platforms depicts an exposed `interface` called `IPlatform` which defines the methods that a Platform may implement. 

```typescript
export interface IPlatform {
  newInstance?(type: string, scope: Construct, id: string, props: any): any;
  newApp?(): App;

  preSynth?(app: Construct): void;
  postSynth?(config: any): any;
  validate?(config: any): any;
}
```

As he understands it, Wing comes with a set of built-in platforms `tf-aws`, `tf-azure`, `tf-gcp`, and `sim`. These platforms define how the resources are translated into
the underlying infrastructure and inflight clients. He knows his company is an AWS shop and many in the company have extensive experience with Terraform so the `tf-aws` platform sounds like a great
place to start.

He has determined that he can create a new platform lovingly dubbed `MarcusPlatform` which should be able to just extend the `tf-aws` platform and override a few methods to
enforce the company standards.

He begins by creating his platform in a new npm project:

```typescript
// marcus-platform.ts
import { Construct } from "constructs";
import { IPlatform } from "@winglang/sdk";
import * as tfaws from "@winglang/sdk/tf-aws";


export class MarcusPlatform extends tfaws.Platform {
  newInstance(type: string, scope: Construct, id: string, props: any): any {
    if (type === wingsdk.BUCKET_TYPE) {
      // return custom bucket
      return new MarcusBucket(scope, id, props);
    }

    return super.newInstance(type, scope, id, props);
  }
}

// Custom Bucket class
export class Bucket extends tfaws.Bucket {
  constructor(scope: Construct, id: string, props: any) {
    super(scope, id, props);

    // enable bucket versioning
    const bucket = new S3Bucket(scope, name, {
      versioning: {enabled: true},
    });
  }
}
```

As Marcus continues to change the resources to implement his company's standards he recalls that all IAM roles in his company must have a permission boundary set. 

He recalls the `preSynth` method from the `IPlatform` interface which will allow him to traverse the Construct tree before any synthesis occurs. Meaning he can apply the permission boundary to all IAM roles before the code is compiled.


He is able to just add the following method to his platform
```typescript
  // .. code omitted for brevity
  export class MarcusPlatform extends TfAWS.Platform {
    validate(app: Construct): void {
      // apply the Permission boundary aspect
      cdktf.Aspects.of(app).add(new PermissionBoundaryAspect("some-boundary-arn"));
    }
  }
  // .. code omitted for brevity
  class PermissionBoundaryAspect {
    constructor(permissionBoundaryArn: string) {
      this.permissionBoundaryArn = permissionBoundaryArn;
    }

    visit(node: any) {
      if (node.terraformResourceType === "aws_iam_role") {
        node.permissionsBoundary = this.permissionBoundaryArn;
      }
    }
  }
```

Finally he publishes his platform to his companies private npm registry. 

He is now able to share with his internal teams that if they want to compile and deploy their code to AWS they can use the `MarcusPlatform` platform as such:

```bash
# install the platform
npm install @company/marcus-wing-platform
# compile with the platform
wing compile app.main.w --platform tf-aws --platform MarcusPlatform
```


The following milestones will be:
- [ ] Convert targets and plugins to new Platform API
- [ ] Define compatibility between platforms
- [ ] Document how to create a new Platform
- [ ] Expose builtin platforms for extension
