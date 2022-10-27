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
> Usage: wing compile [options] <entrypoint>.w
> 
> Compiles a Wing program
> 
> Arguments:
>   entrypoint               program .w entrypoint
> 
> Options:
>   -o, --out-dir <out-dir>  Output directory (default: "/home/sep/winglang/apps/wing")
>   -t, --target <target>    Target platform (options: 'tf-aws', 'sim') (default: "tf-aws")
> ```

## `wing run`

> ```sh
> $ wing run --help
> Usage: wing run [options] <entrypoint>.wx
> 
> Runs a Wing executable in the Wing Console
> 
> Arguments:
>   executable  executable .wx file
> ```
