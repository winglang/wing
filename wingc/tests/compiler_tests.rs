use wingc::compiler;

//TODO: delete
#[test]
fn compiler_mock_test() {
    assert_eq!(4, compiler::return_four())
}

#[test]
fn compiler_basic_flow() {
    let test_file_path = "../playground/examples/test.w";
    assert_eq!("bla bla", compiler::run())
}