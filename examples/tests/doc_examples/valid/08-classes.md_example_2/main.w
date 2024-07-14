// This file was auto generated from an example found in: 08-classes.md_example_2
// Example metadata: {"valid":true}
bring cloud;

inflight interface IProfile {
  inflight name(): str;
}

inflight class WingPerson impl IProfile {
  pub inflight name(): str {
    return "Fairy Wing";
  }
}

let logName = inflight(profile: IProfile): void => {
  log(profile.name());
};

new cloud.Function(inflight () => {
  logName(new WingPerson());
});
