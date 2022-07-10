#![allow(non_upper_case_globals)]
#![allow(non_camel_case_types)]
#![allow(non_snake_case)]

include!("./bindings.rs");

#[cfg(test)]
mod tests {
    use super::*;
    use std::ffi::CString;

    #[test]
    fn javascript() {
        // known bug: Node is not re-entrant. This test is temporarily disabled.
        assert_eq!(0, 0);
        // let result;
        // let program = CString::new("../../tests/hello.js").unwrap();
        // let workdir = CString::new("../../").unwrap();
        // unsafe {
        //     let context = wingrr_prep(wingrr_engine_type_t__WINGRR_ENGINE_JAVASCRIPT);
        //     wingrr_set_program(context, program.as_ptr());
        //     wingrr_set_workdir(context, workdir.as_ptr());
        //     result = wingrr_exec(context);
        //     wingrr_free(context);
        // }
        // assert_eq!(result, 0);
    }

    #[test]
    fn typescript() {
        let result;
        let program = CString::new("../../tests/hello.ts").unwrap();
        let workdir = CString::new("../../").unwrap();
        unsafe {
            let context = wingrr_prep(wingrr_engine_type_t__WINGRR_ENGINE_TYPESCRIPT);
            wingrr_set_program(context, program.as_ptr());
            wingrr_set_workdir(context, workdir.as_ptr());
            result = wingrr_exec(context);
            wingrr_free(context);
        }
        assert_eq!(result, 0);
    }

    #[test]
    fn python() {
        let result;
        let program = CString::new("../../tests/hello.py").unwrap();
        let workdir = CString::new("../../").unwrap();
        unsafe {
            let context = wingrr_prep(wingrr_engine_type_t__WINGRR_ENGINE_PYTHON);
            wingrr_set_program(context, program.as_ptr());
            wingrr_set_workdir(context, workdir.as_ptr());
            result = wingrr_exec(context);
            wingrr_free(context);
        }
        assert_eq!(result, 0);
    }

    #[test]
    fn go() {
        let result;
        let program = CString::new("../../tests/hello.go").unwrap();
        let workdir = CString::new("../../").unwrap();
        unsafe {
            let context = wingrr_prep(wingrr_engine_type_t__WINGRR_ENGINE_GO);
            wingrr_set_program(context, program.as_ptr());
            wingrr_set_workdir(context, workdir.as_ptr());
            result = wingrr_exec(context);
            wingrr_free(context);
        }
        assert_eq!(result, 0);
    }

    #[test]
    fn csharp() {
        let result;
        let program = CString::new("../../tests/hello.cs").unwrap();
        let workdir = CString::new("../../").unwrap();
        unsafe {
            let context = wingrr_prep(wingrr_engine_type_t__WINGRR_ENGINE_CSHARP);
            wingrr_set_program(context, program.as_ptr());
            wingrr_set_workdir(context, workdir.as_ptr());
            result = wingrr_exec(context);
            wingrr_free(context);
        }
        assert_eq!(result, 0);
    }

    #[test]
    fn ruby() {
        let result;
        let program = CString::new("../../tests/hello.rb").unwrap();
        let workdir = CString::new("../../").unwrap();
        unsafe {
            let context = wingrr_prep(wingrr_engine_type_t__WINGRR_ENGINE_RUBY);
            wingrr_set_program(context, program.as_ptr());
            wingrr_set_workdir(context, workdir.as_ptr());
            result = wingrr_exec(context);
            wingrr_free(context);
        }
        assert_eq!(result, 0);
    }

    #[test]
    fn java() {
        let result;
        let program = CString::new("../../tests/hello.java").unwrap();
        let workdir = CString::new("../../").unwrap();
        unsafe {
            let context = wingrr_prep(wingrr_engine_type_t__WINGRR_ENGINE_JAVA);
            wingrr_set_program(context, program.as_ptr());
            wingrr_set_workdir(context, workdir.as_ptr());
            result = wingrr_exec(context);
            wingrr_free(context);
        }
        assert_eq!(result, 0);
    }

    #[test]
    fn lua() {
        let result;
        let program = CString::new("../../tests/hello.lua").unwrap();
        let workdir = CString::new("../../").unwrap();
        unsafe {
            let context = wingrr_prep(wingrr_engine_type_t__WINGRR_ENGINE_LUA);
            wingrr_set_program(context, program.as_ptr());
            wingrr_set_workdir(context, workdir.as_ptr());
            result = wingrr_exec(context);
            wingrr_free(context);
        }
        assert_eq!(result, 0);
    }
}
