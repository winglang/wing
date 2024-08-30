import { test } from "vitest";

import { turnAsciiColorsIntoHtml } from "./turn-ascii-colors-into-html.js";

test("turnAsciiColorsIntoHtml", async (t) => {
  t.expect(
    turnAsciiColorsIntoHtml(`Error: Expected values to be strictly deep-equal:
\u001B[32m+ actual\u001B[39m \u001B[31m- expected\u001B[39m

\u001B[32m+\u001B[39m [
\u001B[32m+\u001B[39m   'en'
\u001B[32m+\u001B[39m ]
\u001B[31m-\u001B[39m []
   --> src/manager.test.w:15:1
   |   model: model,
   | );
   | 
15 | expect.equal(manager.allLanguages, []);
   | ^
at /home/wing/project/src/manager.test.w:15:1
`),
  ).toEqual(`Error: Expected values to be strictly deep-equal:
<span style="color: green">+ actual</span> <span style="color: red">- expected</span>

<span style="color: green">+</span> [
<span style="color: green">+</span>   'en'
<span style="color: green">+</span> ]
<span style="color: red">-</span> []
   --> src/manager.test.w:15:1
   |   model: model,
   | );
   | 
15 | expect.equal(manager.allLanguages, []);
   | ^
at /home/wing/project/src/manager.test.w:15:1
`);
});
