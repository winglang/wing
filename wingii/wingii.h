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

  /**
   * @brief Prepares preflight execution configuration.
   * @param type engine type
   * @return preflight execution configuration
   * @note This function is thread-safe.
   */
  wingpf_call_prep_t *wingpf_prep(wingpf_engine_type_t const);

  /**
   * @brief Sets program path on disk to be executed.
   * @param instance preflight execution configuration
   * @param program program path to be executed
   * @note This function is thread-safe.
   */
  void wingpf_set_program(wingpf_call_prep_t *const, const char *const program);

  /**
   * @brief Sets context path on disk for "program" to execute in.
   * @details Context works a lot like Docker's context. "program" pointer when
   * executed, only has access to its context on filesystem and nowhere else.
   * @param instance preflight execution configuration
   * @param context context path of execution
   * @note This function is thread-safe.
   */
  void wingpf_set_context(wingpf_call_prep_t *const, const char *const context);

  /**
   * @brief Executes preflight code.
   * @param instance preflight execution configuration
   * @return 0 on success, non-zero on failure
   * @note This function is thread-safe.
   */
  int wingpf_call(wingpf_call_prep_t *const);

  /**
   * @brief Frees preflight execution configuration.
   * @param instance preflight execution configuration
   * @note This function is thread-safe.
   */
  void wingpf_free(wingpf_call_prep_t *const);

#ifdef __cplusplus
}
#endif

#endif // !WINGPF_H_
