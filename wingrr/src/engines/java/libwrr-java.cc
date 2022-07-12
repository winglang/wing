#include "libwrr-java.hh"
#include "../../utils/scoped-chdir.hh"
#include "../../utils/runtime-path.hh"

#include <jni.h>

#include <array>

namespace wrr
{
  JavaEngine::JavaEngine(const std::string &workdir) : Engine(workdir)
  {
  }

  int JavaEngine::execute(const std::string &program) const
  {
    auto chdir = ScopedChdir(workdir());
    JavaVM *jvm;
    JNIEnv *env;
    JavaVMInitArgs jvm_args;
    std::array<JavaVMOption, 3> options;
    options[0].optionString = const_cast<char *>("-Djava.compiler=NONE");
    std::string classPath = "-Djava.class.path=" + runtime_path(); // RUNTIME_PATH;
    options[1].optionString = const_cast<char *>(classPath.data());
    options[2].optionString = const_cast<char *>("-verbose:none"); // class|module|gc|jni
    jvm_args.version = JNI_VERSION_1_6;
    jvm_args.nOptions = 3;
    jvm_args.options = options.data();
    jvm_args.ignoreUnrecognized = false;
    JNI_CreateJavaVM(&jvm, reinterpret_cast<void **>(&env), &jvm_args);
    auto MainClass = env->FindClass("libwrr");
    auto MainMethod = env->GetStaticMethodID(MainClass, "main", "([Ljava/lang/String;)V");
    auto arg0 = env->NewStringUTF(program.c_str());
    auto arg1 = env->NewStringUTF(chdir.cwd().c_str());
    auto argv = env->NewObjectArray(2, env->FindClass("java/lang/String"), nullptr);
    env->SetObjectArrayElement(argv, 0, arg0);
    env->SetObjectArrayElement(argv, 1, arg1);
    env->CallStaticVoidMethod(MainClass, MainMethod, argv);
    env->DeleteLocalRef(argv);
    env->DeleteLocalRef(arg1);
    env->DeleteLocalRef(arg0);
    jvm->DestroyJavaVM();
    return 0; // fixme
  }
} // !namespace wrr
