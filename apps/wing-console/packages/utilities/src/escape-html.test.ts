import { expect, test } from "vitest";

import { escapeHtml } from "./escape-html.js";

test("escapes html characters", () => {
  expect(escapeHtml(`<div class="class" id='1'>Wing & Console</div>`)).toEqual(
    `&lt;div class=&quot;class&quot; id=&#39;1&#39;&gt;Wing &amp; Console&lt;/div&gt;`,
  );
});
