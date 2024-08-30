<h2>API Reference</h2>

<h3>Table of Contents</h3>

- **Classes**
  - <a href="#@winglibs/testfixture.PublicClass">PublicClass</a>
  - <a href="#@winglibs/testfixture.Store">Store</a>
  - <a href="#@winglibs/testfixture.subdir.Util">subdir.Util</a>
- **Interfaces**
  - <a href="#@winglibs/testfixture.PublicInterface">PublicInterface</a>
- **Structs**
  - <a href="#@winglibs/testfixture.PublicStruct">PublicStruct</a>
  - <a href="#@winglibs/testfixture.StoreOptions">StoreOptions</a>
- **Enums**
  - <a href="#@winglibs/testfixture.FavoriteNumbers">FavoriteNumbers</a>

<h3 id="@winglibs/testfixture.PublicClass">PublicClass (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(): PublicClass
</pre>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>publicField</code> | <code>num</code> | *No description* |

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>publicMethod(): void</code> | *No description* |

<h3 id="@winglibs/testfixture.Store">Store (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(options: StoreOptions?): Store
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>static makeKey(name: str): str</code> | *No description* |
| <code>static inflight makeKeyInflight(name: str): str</code> | *No description* |
| <code>onSet(handler: inflight (str): void): void</code> | *No description* |
| <code>inflight set(message: str): void</code> | *No description* |

<h3 id="@winglibs/testfixture.subdir.Util">subdir.Util (preflight class)</h3>

<h4>Constructor</h4>

<pre>
new(): Util
</pre>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

| **Signature** | **Description** |
| --- | --- |
| <code>static inflight double(msg: str): str</code> | *No description* |
| <code>static inflight makeKeyInflight(name: str): str</code> | *No description* |

<h3 id="@winglibs/testfixture.PublicInterface">PublicInterface (interface)</h3>

<h4>Properties</h4>

*No properties*

<h4>Methods</h4>

*No methods*

<h3 id="@winglibs/testfixture.PublicStruct">PublicStruct (struct)</h3>

<h4>Properties</h4>

*No properties*

<h3 id="@winglibs/testfixture.StoreOptions">StoreOptions (struct)</h3>

<h4>Properties</h4>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>name</code> | <code>str?</code> | *No description* |

<h3 id="@winglibs/testfixture.FavoriteNumbers">FavoriteNumbers (enum)</h3>

<h4>Values</h4>

| **Name** | **Description** |
| --- | --- |
| <code>SEVEN</code> | *No description* |
| <code>FORTY_TWO</code> | *No description* |

