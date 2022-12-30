resource R {
  name: str;
  
  init(name: str) {
    this.name = name;
  }
}

let res = new R("Arr");
print(res.name);
