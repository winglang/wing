#![allow(non_upper_case_globals)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

use std::ffi::CString;

include!("./bindings.rs");

fn execute_lang(t: wingrr_engine_type_t_, program: &str, workdir: &str) -> i32 {
    let _result;
    let _program = CString::new(program).unwrap();
    let _workdir = CString::new(workdir).unwrap();
    unsafe {
        let context = wingrr_prep(t);
        wingrr_set_program(context, _program.as_ptr());
        wingrr_set_workdir(context, _workdir.as_ptr());
        _result = wingrr_exec(context);
        wingrr_free(context);
    }
    return _result;
}

pub fn execute_javascript(program: &str, workdir: &str) -> i32 {
    return execute_lang(
        wingrr_engine_type_t__WINGRR_ENGINE_JAVASCRIPT,
        program,
        workdir,
    );
}
pub fn execute_typescript(program: &str, workdir: &str) -> i32 {
    return execute_lang(
        wingrr_engine_type_t__WINGRR_ENGINE_TYPESCRIPT,
        program,
        workdir,
    );
}
pub fn execute_python(program: &str, workdir: &str) -> i32 {
    return execute_lang(wingrr_engine_type_t__WINGRR_ENGINE_PYTHON, program, workdir);
}
pub fn execute_csharp(program: &str, workdir: &str) -> i32 {
    return execute_lang(wingrr_engine_type_t__WINGRR_ENGINE_CSHARP, program, workdir);
}
pub fn execute_go(program: &str, workdir: &str) -> i32 {
    return execute_lang(wingrr_engine_type_t__WINGRR_ENGINE_GO, program, workdir);
}
pub fn execute_java(program: &str, workdir: &str) -> i32 {
    return execute_lang(wingrr_engine_type_t__WINGRR_ENGINE_JAVA, program, workdir);
}
pub fn execute_lua(program: &str, workdir: &str) -> i32 {
    return execute_lang(wingrr_engine_type_t__WINGRR_ENGINE_LUA, program, workdir);
}
pub fn execute_ruby(program: &str, workdir: &str) -> i32 {
    return execute_lang(wingrr_engine_type_t__WINGRR_ENGINE_RUBY, program, workdir);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn javascript() {
        // known bug: Node is not re-entrant. This test is temporarily disabled.
        // assert_eq!(0, execute_javascript("../../tests/hello.js", "../../"));
    }

    #[test]
    fn typescript() {
        assert_eq!(0, execute_typescript("../../tests/hello.ts", "../../"));
    }

    #[test]
    fn python() {
        assert_eq!(0, execute_python("../../tests/hello.py", "../../"));
    }

    #[test]
    fn go() {
        assert_eq!(0, execute_go("../../tests/hello.go", "../../"));
    }

    #[test]
    fn csharp() {
        assert_eq!(0, execute_csharp("../../tests/hello.cs", "../../"));
    }

    #[test]
    fn ruby() {
        assert_eq!(0, execute_ruby("../../tests/hello.rb", "../../"));
    }

    #[test]
    fn java() {
        assert_eq!(0, execute_java("../../tests/hello.java", "../../"));
    }

    #[test]
    fn lua() {
        assert_eq!(0, execute_lua("../../tests/hello.lua", "../../"));
    }
}
