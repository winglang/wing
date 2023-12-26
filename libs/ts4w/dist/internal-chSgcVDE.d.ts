interface CompileOptions {
    workDir: string;
    entrypoint: string;
}
declare function compile(options: CompileOptions): Promise<string>;

type internal_CompileOptions = CompileOptions;
declare const internal_compile: typeof compile;
declare namespace internal {
  export { type internal_CompileOptions as CompileOptions, internal_compile as compile };
}

export { type CompileOptions as C, compile as c, internal as i };
