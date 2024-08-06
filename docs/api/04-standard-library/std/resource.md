---
title: resource
id: resource
---

# API Reference <a name="API Reference" id="api-reference"></a>



## Structs <a name="Structs" id="Structs"></a>

### LiftAnnotation <a name="LiftAnnotation" id="@winglang/sdk.std.LiftAnnotation"></a>

Annotations about preflight data and desired inflight operations.

#### Initializer <a name="Initializer" id="@winglang/sdk.std.LiftAnnotation.Initializer"></a>

```wing
let LiftAnnotation = LiftAnnotation{ ... };
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@winglang/sdk.std.LiftAnnotation.property.obj">obj</a></code> | <code>any</code> | Preflight object to lift. |
| <code><a href="#@winglang/sdk.std.LiftAnnotation.property.alias">alias</a></code> | <code>str</code> | Name of the object in the inflight context. |
| <code><a href="#@winglang/sdk.std.LiftAnnotation.property.ops">ops</a></code> | <code>MutArray&lt;str&gt;</code> | Operations to lift on the object. |

---

##### `obj`<sup>Required</sup> <a name="obj" id="@winglang/sdk.std.LiftAnnotation.property.obj"></a>

```wing
obj: any;
```

- *Type:* any

Preflight object to lift.

---

##### `alias`<sup>Optional</sup> <a name="alias" id="@winglang/sdk.std.LiftAnnotation.property.alias"></a>

```wing
alias: str;
```

- *Type:* str
- *Default:* "obj" If the object is a simple identifier, it will be used as the alias

Name of the object in the inflight context.

Required if the object provided is not an identifier.

---

##### `ops`<sup>Optional</sup> <a name="ops" id="@winglang/sdk.std.LiftAnnotation.property.ops"></a>

```wing
ops: MutArray<str>;
```

- *Type:* MutArray&lt;str&gt;
- *Default:* * All possible operations will be available

Operations to lift on the object.

---

## Protocols <a name="Protocols" id="Protocols"></a>

### IHostedLiftable <a name="IHostedLiftable" id="@winglang/sdk.std.IHostedLiftable"></a>

- *Extends:* <a href="#@winglang/sdk.std.ILiftable">ILiftable</a>

- *Implemented By:* <a href="#@winglang/sdk.aws.BucketRef">BucketRef</a>, <a href="#@winglang/sdk.aws.Domain">Domain</a>, <a href="#@winglang/sdk.aws.FunctionRef">FunctionRef</a>, <a href="#@winglang/sdk.aws.QueueRef">QueueRef</a>, <a href="#@winglang/sdk.aws.SecretRef">SecretRef</a>, <a href="#@winglang/sdk.cloud.Api">Api</a>, <a href="#@winglang/sdk.cloud.Bucket">Bucket</a>, <a href="#@winglang/sdk.cloud.Counter">Counter</a>, <a href="#@winglang/sdk.cloud.Domain">Domain</a>, <a href="#@winglang/sdk.cloud.Endpoint">Endpoint</a>, <a href="#@winglang/sdk.cloud.Function">Function</a>, <a href="#@winglang/sdk.cloud.OnDeploy">OnDeploy</a>, <a href="#@winglang/sdk.cloud.Queue">Queue</a>, <a href="#@winglang/sdk.cloud.Schedule">Schedule</a>, <a href="#@winglang/sdk.cloud.Secret">Secret</a>, <a href="#@winglang/sdk.cloud.Service">Service</a>, <a href="#@winglang/sdk.cloud.Topic">Topic</a>, <a href="#@winglang/sdk.cloud.Website">Website</a>, <a href="#@winglang/sdk.sim.Container">Container</a>, <a href="#@winglang/sdk.sim.Policy">Policy</a>, <a href="#@winglang/sdk.sim.Resource">Resource</a>, <a href="#@winglang/sdk.sim.State">State</a>, <a href="#@winglang/sdk.std.AutoIdResource">AutoIdResource</a>, <a href="#@winglang/sdk.std.Resource">Resource</a>, <a href="#@winglang/sdk.std.Test">Test</a>, <a href="#@winglang/sdk.std.TestRunner">TestRunner</a>, <a href="#@winglang/sdk.ui.Button">Button</a>, <a href="#@winglang/sdk.ui.Field">Field</a>, <a href="#@winglang/sdk.ui.FileBrowser">FileBrowser</a>, <a href="#@winglang/sdk.ui.HttpClient">HttpClient</a>, <a href="#@winglang/sdk.ui.Section">Section</a>, <a href="#@winglang/sdk.ui.Table">Table</a>, <a href="#@winglang/sdk.ui.ValueField">ValueField</a>, <a href="#@winglang/sdk.ui.VisualComponent">VisualComponent</a>, <a href="#@winglang/sdk.aws.IAwsFunction">IAwsFunction</a>, <a href="#@winglang/sdk.aws.IAwsInflightHost">IAwsInflightHost</a>, <a href="#@winglang/sdk.cloud.IApiEndpointHandler">IApiEndpointHandler</a>, <a href="#@winglang/sdk.cloud.IBucketEventHandler">IBucketEventHandler</a>, <a href="#@winglang/sdk.cloud.IFunctionHandler">IFunctionHandler</a>, <a href="#@winglang/sdk.cloud.IOnDeployHandler">IOnDeployHandler</a>, <a href="#@winglang/sdk.cloud.IQueueSetConsumerHandler">IQueueSetConsumerHandler</a>, <a href="#@winglang/sdk.cloud.IScheduleOnTickHandler">IScheduleOnTickHandler</a>, <a href="#@winglang/sdk.cloud.IServiceHandler">IServiceHandler</a>, <a href="#@winglang/sdk.cloud.IServiceStopHandler">IServiceStopHandler</a>, <a href="#@winglang/sdk.cloud.ITopicOnMessageHandler">ITopicOnMessageHandler</a>, <a href="#@winglang/sdk.sim.IResourceFactory">IResourceFactory</a>, <a href="#@winglang/sdk.sim.ISimulatorInflightHost">ISimulatorInflightHost</a>, <a href="#@winglang/sdk.sim.ISimulatorResource">ISimulatorResource</a>, <a href="#@winglang/sdk.std.IHostedLiftable">IHostedLiftable</a>, <a href="#@winglang/sdk.std.IInflight">IInflight</a>, <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>, <a href="#@winglang/sdk.std.IResource">IResource</a>, <a href="#@winglang/sdk.std.ITestHandler">ITestHandler</a>, <a href="#@winglang/sdk.ui.IButtonHandler">IButtonHandler</a>, <a href="#@winglang/sdk.ui.IFieldHandler">IFieldHandler</a>, <a href="#@winglang/sdk.ui.IFileBrowserDeleteHandler">IFileBrowserDeleteHandler</a>, <a href="#@winglang/sdk.ui.IFileBrowserGetHandler">IFileBrowserGetHandler</a>, <a href="#@winglang/sdk.ui.IFileBrowserListHandler">IFileBrowserListHandler</a>, <a href="#@winglang/sdk.ui.IFileBrowserPutHandler">IFileBrowserPutHandler</a>, <a href="#@winglang/sdk.ui.IHttpClientGetApiSpecHandler">IHttpClientGetApiSpecHandler</a>, <a href="#@winglang/sdk.ui.IHttpClientGetUrlHandler">IHttpClientGetUrlHandler</a>, <a href="#@winglang/sdk.ui.ITableScanHandler">ITableScanHandler</a>, <a href="#@winglang/sdk.util.IPredicateHandler">IPredicateHandler</a>

A liftable object that needs to be registered on the host as part of the lifting process.

This is generally used so the host can set up permissions
to access the lifted object inflight.

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@winglang/sdk.std.IHostedLiftable.onLift">onLift</a></code> | A hook called by the Wing compiler once for each inflight host that needs to use this object inflight. |

---

##### `onLift` <a name="onLift" id="@winglang/sdk.std.IHostedLiftable.onLift"></a>

```wing
onLift(host: IInflightHost, ops: MutArray<str>): void
```

A hook called by the Wing compiler once for each inflight host that needs to use this object inflight.

The list of requested inflight methods
needed by the inflight host are given by `ops`.

Any preflight class can implement this instance method to add permissions,
environment variables, or other capabilities to the inflight host when
one or more of its methods are called.

###### `host`<sup>Required</sup> <a name="host" id="@winglang/sdk.std.IHostedLiftable.onLift.parameter.host"></a>

- *Type:* <a href="#@winglang/sdk.std.IInflightHost">IInflightHost</a>

---

###### `ops`<sup>Required</sup> <a name="ops" id="@winglang/sdk.std.IHostedLiftable.onLift.parameter.ops"></a>

- *Type:* MutArray&lt;str&gt;

---


