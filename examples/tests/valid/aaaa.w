struct Contact {
  first: str;
  last: str;
  phone: str?;
}

let j = { first: "Wing", last: "Lyly" };
let c = Contact.fromJson(j);
