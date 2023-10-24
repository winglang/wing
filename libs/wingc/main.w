let errFunc = () => {
  throw "error";
};

let otherFunc = () => {
  errFunc();
};

otherFunc();