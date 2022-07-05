#ifndef WINGII_H_
#define WINGII_H_

#ifdef __cplusplus
extern "C"
{
#endif

  /**
   * @brief the execution environment
   * This essentially tells wingii what language your input program is in
   */
  typedef enum wingii_runtime_env_t_
  {
    // format is: <LANGUAGE>_<RUNTIME>_<VERSION>
    WINGII_RUNTIME_ENV_JAVASCRIPT_NODEJS_16 = 1,
    WINGII_RUNTIME_ENV_TYPESCRIPT_NODEJS_16,
  } wingii_runtime_env_t;

  /**
   * @brief the type of input program
   * This essentially tells wingii what type of input program you are using
   * In memory execution might not be supported for all input programs
   */
  typedef enum wingii_program_type_t_
  {
    // some providers may not support all types
    WINGII_SOURCE_TYPE_MEMORY = 1,
    WINGII_SOURCE_TYPE_FILE,
  } wingii_program_type_t;

  typedef struct wingii_runtime_call_prep_t_
  {
    const char *const program;
    const char *const context;
    wingii_program_type_t type;
    wingii_runtime_env_t env;
  } wingii_runtime_call_prep_t;

  wingii_runtime_call_prep_t *wingii_execute_prep_new(
      const char *const program,
      const char *const context,
      wingii_program_type_t type,
      wingii_runtime_env_t env);
  void wingii_execute(const wingii_runtime_call_prep_t *const);
  void wingii_execute_prep_free(wingii_runtime_call_prep_t *const);

#ifdef __cplusplus
}
#endif

#endif // !WINGII_H_
