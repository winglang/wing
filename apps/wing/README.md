# Wing CLI

Wing CLI is the Cargo of Wing. It's currently published to npm:

```sh
npm i -g @monadahq/wing
```

## Logs

To see debug logs, set the `DEBUG` environment variable to `wing:*`.
To see scoped debug logs, use specific namespaces, e.g. `wing:commands:compile`.

## Commands

## `wing compile`

> ```sh
> $ wing compile --help
> Usage: wing compile [options] <input-file>
> 
> Compiles a wing file
> 
> Arguments:
>   input-file               input file
> 
> Options:
>   -o, --out-dir <out-dir>  Output directory (default: "/home/sep/winglang/apps/wing")
>   -t, --target <target>    Target platform (default: "tf-aws")
> ```

## `wing run`

> ```sh
> $ wing run --help
> Usage: wing run [options] <input-file>
> 
> Runs a Wing intermediate file in Wing Simulator
> 
> Arguments:
>   input-file  input file
> ```
