bring cloud;

    break;
//  ^^^^^^ Expected break statement to be inside of a loop (while/for)

new cloud.Function(inflight () => {
    break;
//  ^^^^^^ Expected break statement to be inside of a loop (while/for)
});

    continue;
//  ^^^^^^^^^ Expected continue statement to be inside of a loop (while/for)

new cloud.Function(inflight () => {
    continue;
//  ^^^^^^^^^ Expected continue statement to be inside of a loop (while/for)
});