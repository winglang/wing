// This file was auto generated from an example found in: 15-classes.md_example_2
// Example metadata: {"valid":true}
bring cloud;

// define the interface
inflight interface IProfile {
  // inflight function
  inflight name(): str;
}

// new class that implements the interface
inflight class WingPerson impl IProfile {
  // custom definition of the name function
  pub inflight name(): str {
    return "Fairy Wing";
  }
}

// inflight function that accepts the interface
let logName = inflight(profile: IProfile): void => {
  log(profile.name());
};

new cloud.Function(inflight () => {
  logName(new WingPerson());
});
