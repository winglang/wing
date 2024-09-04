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

### PublicClass (preflight class) <a class="wing-docs-anchor" id="@winglibs/testfixture.PublicClass"></a>

*No description*

#### Constructor

```
new(): PublicClass
```

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>publicField</code> | <code>num</code> | *No description* |

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>publicMethod(): void</code> | *No description* |

### Store (preflight class) <a class="wing-docs-anchor" id="@winglibs/testfixture.Store"></a>

*No description*

#### Constructor

```
new(options: StoreOptions?): Store
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>static makeKey(name: str): str</code> | *No description* |
| <code>static inflight makeKeyInflight(name: str): str</code> | *No description* |
| <code>onSet(handler: inflight (str): void): void</code> | *No description* |
| <code>inflight set(message: str): void</code> | *No description* |

### subdir.Util (preflight class) <a class="wing-docs-anchor" id="@winglibs/testfixture.subdir.Util"></a>

*No description*

#### Constructor

```
new(): Util
```

#### Properties

*No properties*

#### Methods

| **Signature** | **Description** |
| --- | --- |
| <code>static inflight double(msg: str): str</code> | *No description* |
| <code>static inflight makeKeyInflight(name: str): str</code> | *No description* |

### PublicInterface (interface) <a class="wing-docs-anchor" id="@winglibs/testfixture.PublicInterface"></a>

*No description*

#### Properties

*No properties*

#### Methods

*No methods*

### PublicStruct (struct) <a class="wing-docs-anchor" id="@winglibs/testfixture.PublicStruct"></a>

*No description*

#### Properties

*No properties*

### StoreOptions (struct) <a class="wing-docs-anchor" id="@winglibs/testfixture.StoreOptions"></a>

*No description*

#### Properties

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code>name</code> | <code>str?</code> | *No description* |

### FavoriteNumbers (enum) <a class="wing-docs-anchor" id="@winglibs/testfixture.FavoriteNumbers"></a>

*No description*

#### Values

| **Name** | **Description** |
| --- | --- |
| <code>SEVEN</code> | *No description* |
| <code>FORTY_TWO</code> | *No description* |

