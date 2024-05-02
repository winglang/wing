bring cloud;
bring sim;

interface IPreflightInterface {}

inflight interface IInflightInterface {}

struct MyStructWithNonSerializableTypes {
  a: duration;
  b: Set<num>;
}

inflight class ResourceBackend impl sim.IResource {
  new() {}
  pub onStart(ctx: sim.IResourceContext) {}
  pub onStop() {}

  pub methodWithMutJsons(a: MutJson): MutJson { return {}; }
  // ^ error: Parameter "a" cannot have mutable type "MutJson" because the class implements sim.IResource. Only serializable, non-mutable types can be used as arguments or return types on simulator resources.
  pub methodWithMuArrays(a: MutArray<str>, b: MutArray<num>): MutArray<bool> {
    // ^ error: Parameter "a" cannot have mutable type "MutArray<str>" because the class implements sim.IResource. Only serializable, non-mutable types can be used as arguments or return types on simulator resources.
    return MutArray<bool>[];
  }
  pub methodWithSets(a: Set<str>, b: Set<num>): Set<bool> {
    // ^ error: Parameter "a" cannot have non-serializable type "Set<str>" because the class implements sim.IResource. Only serializable, non-mutable types can be used as arguments or return types on simulator resources.
    return Set<bool>[];
  }
  pub methodWithMutSets(a: MutSet<str>, b: MutSet<num>): MutSet<bool> {
    // ^ error: Parameter "a" cannot have mutable type "MutSet<str>" because the class implements sim.IResource. Only serializable, non-mutable types can be used as arguments or return types on simulator resources.
    return MutSet<bool>[];
  }
  pub methodWithMutMaps(a: MutMap<num>, b: MutMap<str>): MutMap<bool> {
    // ^ error: Parameter "a" cannot have mutable type "MutMap<num>" because the class implements sim.IResource. Only serializable, non-mutable types can be used as arguments or return types on simulator resources.
    return MutMap<bool>{};
  }
  pub methodWithDurations(a: duration): duration {
    // ^ error: Parameter "a" cannot have non-serializable type "duration" because the class implements sim.IResource. Only serializable, non-mutable types can be used as arguments or return types on simulator resources.
    return 0s;
  }
  pub methodWithClasses(a: cloud.Bucket): cloud.Queue? {
    // ^ error: Parameter "a" cannot have non-serializable type "cloud.Bucket" because the class implements sim.IResource. Only serializable, non-mutable types can be used as arguments or return types on simulator resources.
    return nil;
  }
  pub methodWithInterfaces(a: IPreflightInterface, b: IInflightInterface): IPreflightInterface {
    // ^ error: Parameter "a" cannot have non-serializable type "IPreflightInterface" because the class implements sim.IResource. Only serializable, non-mutable types can be used as arguments or return types on simulator resources.
    return a;
  }
  pub methodWithFunctions(a: (str): str, b: inflight (num): bool): (inflight (): bool)? {
    // ^ error: Parameter "a" cannot have non-serializable type "(str): str" because the class implements sim.IResource. Only serializable, non-mutable types can be used as arguments or return types on simulator resources.
    return nil;
  }
  pub methodWithBadStructs(a: MyStructWithNonSerializableTypes): MyStructWithNonSerializableTypes {
    // ^ error: Parameter "a" cannot have non-serializable type "MyStructWithNonSerializableTypes" because the class implements sim.IResource. Only serializable, non-mutable types can be used as arguments or return types on simulator resources.
    return a;
  }
}
