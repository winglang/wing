// originally from: https://github.com/patr0nus/libnode
#ifndef NODE_EMBEDDING_API_H
#define NODE_EMBEDDING_API_H

#include <node_api.h>

#ifdef __cplusplus
extern "C"
{
#endif

	typedef struct
	{
		int process_argc;
		const char *const *process_argv;
		napi_addon_register_func napi_reg_func;
	} node_options_t;

	typedef struct
	{
		int exit_code;
		char *error;
	} node_run_result_t;

	node_run_result_t node_run(node_options_t);

#ifdef __cplusplus
}
#endif

#endif
