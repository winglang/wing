#ifndef WINGRR_H_
#define WINGRR_H_

#ifdef __cplusplus
extern "C"
{
#endif

  /** engine type represents environment where preflight is executed */
  typedef enum wingrr_engine_type_t_
  {
    WINGRR_ENGINE_JAVASCRIPT_NODEJS = 1,
    WINGRR_ENGINE_TYPESCRIPT_NODEJS,
    WINGRR_ENGINE_PYTHON_NODEJS,
    WINGRR_ENGINE_RUBY_NODEJS,
    WINGRR_ENGINE_CSHARP_MONO,
    WINGRR_ENGINE_GO_YAEGI,
    WINGRR_ENGINE_JAVA_JNI,
  } wingrr_engine_type_t;

  /** shallow type of preflight execution configuration */
  typedef struct wingrr_context_t_ wingrr_context_t;

  /**
   * @brief Prepares preflight execution configuration.
   * @param type engine type
   * @return preflight execution configuration
   * @note This function is thread-safe.
   */
  wingrr_context_t *wingrr_prep(wingrr_engine_type_t const);

  /**
   * @brief Sets program path on disk to be executed.
   * @param instance preflight execution configuration
   * @param program can be either a string in memory or a file path
   * @note if string length of "program" is less than 4096 AND it exists on disk
   * then it will be loaded from disk into memory before execution.
   * @note This function is thread-safe.
   */
  void wingrr_set_program(wingrr_context_t *const, const char *const program);

  /**
   * @brief Sets working directory path on disk for "program" to execute in.
   * @param instance preflight execution configuration
   * @param workdir path of execution
   * @note This function is thread-safe.
   */
  void wingrr_set_workdir(wingrr_context_t *const, const char *const workdir);

  /**
   * @brief Executes preflight code.
   * @param instance preflight execution configuration
   * @return 0 on success, non-zero on failure
   * @note This function is thread-safe.
   */
  int wingrr_exec(wingrr_context_t *const);

  /**
   * @brief Frees preflight execution configuration.
   * @param instance preflight execution configuration
   * @note This function is thread-safe.
   */
  void wingrr_free(wingrr_context_t *const);

#ifdef __cplusplus
}
#endif

#endif // !WINGRR_H_
