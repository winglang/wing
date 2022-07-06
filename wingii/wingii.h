#ifndef WINGPF_H_
#define WINGPF_H_

#ifdef __cplusplus
extern "C"
{
#endif

  /** engine type represents environment where preflight is executed */
  typedef enum wingpf_engine_type_t_
  {
    WINGPF_ENGINE_JAVASCRIPT_NODEJS_16 = 1,
    WINGPF_ENGINE_TYPESCRIPT_NODEJS_16,
  } wingpf_engine_type_t;

  /** shallow type of preflight execution configuration */
  typedef struct wingpf_call_prep_t_ wingpf_call_prep_t;

  /** wingpf public API, self explanatory: prep, set, call, free. */
  wingpf_call_prep_t *wingpf_prep(wingpf_engine_type_t const);
  void wingpf_set_program(wingpf_call_prep_t *const, const char *const program);
  void wingpf_set_context(wingpf_call_prep_t *const, const char *const context);
  int wingpf_call(wingpf_call_prep_t *const);
  void wingpf_free(wingpf_call_prep_t *const);

#ifdef __cplusplus
}
#endif

#endif // !WINGPF_H_
