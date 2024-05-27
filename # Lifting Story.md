# Lifting Story

## TSOA

### "toInflight()"

Process executed during preflight generates typescript which is then bundled by esbuild into an express app.
toInflight() returns a require statement that imports the generated server code.

### "Lifting"

.lift()ed clients are injected into the generated server code, AsyncLocalStorage is used at runtime to retrieve them with a convenience function.

---

## Python

### "toInflight()"

N/A except for the python version of cloud.Function, which "require()"s some 

### "Lifting"

.lift()ed clients are injected into the container via ENV. The "client" depends on target.
- In sim, the env is the resource "handle" and the sim protocol is used for communication
- In aws, individual sdk resources are overridden with ones that set specific env vars (e.g. "BUCKET_NAME")

---

## Containers

### "toInflight()"

N/A

### "Lifting"

Environment variables with resolved string tokens.

---

## React/Vite

### "toInflight()"
Static files in a directory, script is run during preflight to generate the static files

### "Lifting"
"environment file" is generated containing resolved string tokens.