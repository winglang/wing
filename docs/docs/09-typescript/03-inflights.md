

## Creating an inflight

```ts

```

## inflight limitations

### Scope

Inflight must not reference any variables outside of its scope. This include imports and globals that are not built-in to the language runtime. To access these variables, they must be lifted into the inflight and accessed through the first argument.

### Filesystem

While filesystem access is allowed, keep in mind that inflights may executed in other locations or other hosts. This is especially important when using relative paths, which will not always resolve the same way. 
If it's necessary to access the local filesystem, it's recommended to `lift` the file's contents into the inflight by reading it prior.

### Runtime

inflights execute in a Node.js environment by default and are CJS modules. This means that
inflights may use `require` to import modules, but not `import`.

## lifting

To bring data into scope for use an inflight, you can use the `lift` function before defining the inflight:

```ts

```

What can be lifted:
- primitives (number, string, boolean, null, undefined)
- objects that implement `std.ILiftable`
- Arrays of liftable objects
- Maps of liftable objects

What can't be lifted:

- functions
- classes

## granting

By default, lifting a cloud resource grants all permissions to the caller even if they are not all used.
To limit the permissions granted, you can use the `grant` method after `lift`:

```ts
```