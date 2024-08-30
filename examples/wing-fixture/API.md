## API Reference

### Table of Contents

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

### PublicClass (preflight class) <a id="@winglibs/testfixture.PublicClass"></a>

#### Constructor

<pre>
new(): PublicClass
</pre>

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>publicField</code> | <code>num</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>publicMethod(): void</code> | *No description* |

### Store (preflight class) <a id="@winglibs/testfixture.Store"></a>

#### Constructor

<pre>
new(options: StoreOptions?): Store
</pre>

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>static makeKey(name: str): str</code> | *No description* |
| <code>static inflight makeKeyInflight(name: str): str</code> | *No description* |
| <code>onSet(handler: inflight (str): void): void</code> | *No description* |
| <code>inflight set(message: str): void</code> | *No description* |

### subdir.Util (preflight class) <a id="@winglibs/testfixture.subdir.Util"></a>

#### Constructor

<pre>
new(): Util
</pre>

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>static inflight double(msg: str): str</code> | *No description* |
| <code>static inflight makeKeyInflight(name: str): str</code> | *No description* |

### PublicInterface (interface) <a name=PublicInterface id="@winglibs/testfixture.PublicInterface"></a>

#### Properties

*No properties*

#### Methods

*No methods*

### PublicStruct (struct) <a name=PublicStruct id="@winglibs/testfixture.PublicStruct"></a>

#### Properties

*No properties*

### StoreOptions (struct) <a name=StoreOptions id="@winglibs/testfixture.StoreOptions"></a>

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>name</code> | <code>str?</code> | *No description* |

### FavoriteNumbers (enum) <a name=FavoriteNumbers id="@winglibs/testfixture.FavoriteNumbers"></a>

#### Values

| **Name** | **Description** |
| --- | --- |
| <code>SEVEN</code> | *No description* |
| <code>FORTY_TWO</code> | *No description* |

