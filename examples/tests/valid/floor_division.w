bring cloud;

new cloud.Function(inflight () => {
    let result = 501 \ (99+1);
    assert(result == 5);
}) as "test:floor_division";