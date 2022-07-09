# `libwrr.cs`

Wing Rosetta Runtime C# Engine.

## Mission

Output of this C# library is a single free function that allows C++ to call it.

The single free function is capable of executing arbitrary C#, akin to a REPL.

Internally it uses the Mono Compiler service.

## Build

You need to have a working C# build environment. This can be achieved by either:

1. Installing Mono Development binary packages <sup>1</sup>
1. Installing MonoDevelop on MacOS or other supported OSes <sup>2</sup>

```bash
csc /target:library /reference:Mono.CSharp.dll libwrr-cs.cs
```

It is also possible to create the final managed DLL in native Visual Studio on
Windows. You'd still need to download `Mono.CSharp.dll` from NuGet, but Visual
Studio can make the final `libwrr-cs.dll` for you. This will allow some more
"interesting" and "exotic" C# to be executed on Windows only, by using native
managed assemblies offered by Microsoft. *OG Unity3D scripting...*

<sup>1</sup> <https://www.mono-project.com/download/stable/><br />
<sup>2</sup> <https://www.monodevelop.com/><br />
