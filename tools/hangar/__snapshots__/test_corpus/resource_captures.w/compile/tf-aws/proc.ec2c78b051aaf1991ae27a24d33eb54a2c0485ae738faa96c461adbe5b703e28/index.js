async handle() {
  const { r } = this;
  (await r.test_no_capture());
  (await r.test_capture_collections_of_data());
  (await r.test_capture_primitives());
  (await r.test_capture_resource());
  (await r.test_nested_preflight_field());
  (await r.test_nested_resource());
  (await r.test_expression_recursive());
  (await r.test_external());
  (await r.test_user_defined_resource());
  (await r.test_inflight_field());
}
