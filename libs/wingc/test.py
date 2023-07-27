def canonicalize_path(path):
  """Canonicalizes a path that may contain "." or ".." inside it.

  The input paths may be absolute (starting with "/") or relative. It must also
  handle the case where the final path is outside of the current directory, for
  example "a/../../c" should canonicalize to "../c".

  Args:
    path: The path to canonicalize.

  Returns:
    The canonicalized path.
  """

  if not path:
    return path

  path = path.strip("/")
  if path.startswith("/"):
    path = path[1:]

  stack = []
  for component in path.split("/"):
    if component == ".":
      pass
    elif component == "..":
      if stack:
        stack.pop()
    else:
      stack.append(component)

  path = "/".join(stack)
  if path == "/":
    path = ""

  return path

print(canonicalize_path("/a/../../c"))
print(canonicalize_path("a/b/../c"))
print(canonicalize_path("a/b/.."))

