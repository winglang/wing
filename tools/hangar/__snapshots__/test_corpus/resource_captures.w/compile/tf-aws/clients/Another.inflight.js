class  Another {
  constructor({ first, my_field, stateful }) {
    this.first = first;
    this.my_field = my_field;
    this.stateful = stateful;
  }
  async meaning_of_life()  {
    {
      return 42;
    }
  }
  async another_func()  {
    {
      return "42";
    }
  }
}
exports.Another = Another;
