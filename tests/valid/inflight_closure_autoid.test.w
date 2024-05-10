let var inflights = MutArray<inflight ():num>[];
for i in 0..5 {
  inflights.push(inflight ():num => {
    return i;
  });
}

test "inflight closure auto id" {
  for i in 0..5 {
    assert(inflights.at(i)() == i);
  }
}