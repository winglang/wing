#ifndef WINGR_H_
#define WINGR_H_

#ifdef __cplusplus
extern "C"
{
#endif

  /** engine type represents environment where preflight is executed */
  typedef enum wingr_engine_type_t_
  {
    WINGR_ENGINE_JAVASCRIPT = 1,
    WINGR_ENGINE_TYPESCRIPT = 2,
    WINGR_ENGINE_WINGLANG = 3,
  } wingr_engine_type_t;

  /** shallow type of preflight execution configuration */
  typedef struct wingr_context_t_ wingr_context_t;

  /**
   * @brief Prepares preflight execution configuration.
   * @param type engine type
   * @return preflight execution configuration
   * @note This function is thread-safe.
   */
  wingr_context_t *wingr_prep(wingr_engine_type_t const);

  /**
   * @brief Sets program path on disk to be executed.
   * @param instance preflight execution configuration
   * @param program can be either a string in memory or a file path
   * @note if string length of "program" is less than 4096 AND it exists on disk
   * then it will be loaded from disk into memory before execution.
   * @note This function is thread-safe.
   */
  void wingr_set_program(wingr_context_t *const, const char *const program);

  /**
   * @brief Sets working directory path on disk for "program" to execute in.
   * @param instance preflight execution configuration
   * @param workdir path of execution
   * @note This function is thread-safe.
   */
  void wingr_set_workdir(wingr_context_t *const, const char *const workdir);

  /**
   * @brief Executes preflight code.
   * @param instance preflight execution configuration
   * @return 0 on success, non-zero on failure
   * @note This function is thread-safe.
   */
  int wingr_exec(wingr_context_t *const);

  /**
   * @brief Frees preflight execution configuration.
   * @param instance preflight execution configuration
   * @note This function is thread-safe.
   */
  void wingr_free(wingr_context_t *const);

#ifdef __cplusplus
}
#endif

#endif // !WINGR_H_
