#ifndef WINGPF_H_
#define WINGPF_H_

#ifdef __cplusplus
extern "C"
{
#endif

  /** engine type represents environment where preflight is executed */
  typedef enum wingpf_engine_type_t_
  {
    WINGPF_ENGINE_JAVASCRIPT_NODEJS = 1,
    WINGPF_ENGINE_TYPESCRIPT_NODEJS,
    WINGPF_ENGINE_PYTHON_NODEJS,
    WINGPF_ENGINE_RUBY_NODEJS,
    WINGPF_ENGINE_CSHARP_MONO,
    WINGPF_ENGINE_GO_YAEGI,
  } wingpf_engine_type_t;

  /** shallow type of preflight execution configuration */
  typedef struct wingpf_context_t_ wingpf_context_t;

  /**
   * @brief Prepares preflight execution configuration.
   * @param type engine type
   * @return preflight execution configuration
   * @note This function is thread-safe.
   */
  wingpf_context_t *wingpf_prep(wingpf_engine_type_t const);

  /**
   * @brief Sets program path on disk to be executed.
   * @param instance preflight execution configuration
   * @param program can be either a string in memory or a file path
   * @note if string length of "program" is less than 4096 AND it exists on disk
   * then it will be loaded from disk into memory before execution.
   * @note This function is thread-safe.
   */
  void wingpf_set_program(wingpf_context_t *const, const char *const program);

  /**
   * @brief Sets working directory path on disk for "program" to execute in.
   * @param instance preflight execution configuration
   * @param workdir path of execution
   * @note This function is thread-safe.
   */
  void wingpf_set_workdir(wingpf_context_t *const, const char *const workdir);

  /**
   * @brief Executes preflight code.
   * @param instance preflight execution configuration
   * @return 0 on success, non-zero on failure
   * @note This function is thread-safe.
   */
  int wingpf_exec(wingpf_context_t *const);

  /**
   * @brief Frees preflight execution configuration.
   * @param instance preflight execution configuration
   * @note This function is thread-safe.
   */
  void wingpf_free(wingpf_context_t *const);

#ifdef __cplusplus
}
#endif

#endif // !WINGPF_H_
