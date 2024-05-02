# `on_tick.test.w.tf-gcp.snap.md`

## main.tf.json

```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.20.3"
    },
    "outputs": {
    }
  },
  "provider": {
    "google": [
      {
        "project": "sdk-spec-tests",
        "region": "us-east1"
      }
    ],
    "random": [
      {
      }
    ]
  },
  "resource": {
    "google_cloud_scheduler_job": {
      "from_cron_Scheduler_2F03B2E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/Scheduler",
            "uniqueId": "from_cron_Scheduler_2F03B2E5"
          }
        },
        "attempt_deadline": "300s",
        "description": "Trigger ${google_cloudfunctions_function.from_cron_OnTick0_DefaultFunction_F4D413FD.name}",
        "http_target": {
          "http_method": "GET",
          "oidc_token": {
            "service_account_email": "${google_service_account.from_cron_SchedulerServiceAccount_BF7611D4.email}"
          },
          "uri": "${google_cloudfunctions_function.from_cron_OnTick0_DefaultFunction_F4D413FD.https_trigger_url}"
        },
        "name": "scheduler-c87c1726",
        "schedule": "* * * * *",
        "time_zone": "Etc/UTC"
      },
      "from_rate_Scheduler_AB1E4702": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/Scheduler",
            "uniqueId": "from_rate_Scheduler_AB1E4702"
          }
        },
        "attempt_deadline": "300s",
        "description": "Trigger ${google_cloudfunctions_function.from_rate_OnTick0_DefaultFunction_E06C4134.name}",
        "http_target": {
          "http_method": "GET",
          "oidc_token": {
            "service_account_email": "${google_service_account.from_rate_SchedulerServiceAccount_DF19EF8F.email}"
          },
          "uri": "${google_cloudfunctions_function.from_rate_OnTick0_DefaultFunction_E06C4134.https_trigger_url}"
        },
        "name": "scheduler-c83fb79a",
        "schedule": "*/1 * * * *",
        "time_zone": "Etc/UTC"
      }
    },
    "google_cloudfunctions_function": {
      "from_cron_OnTick0_DefaultFunction_F4D413FD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/DefaultFunction",
            "uniqueId": "from_cron_OnTick0_DefaultFunction_F4D413FD"
          }
        },
        "available_memory_mb": 1024,
        "description": "This function was created by Wing",
        "entry_point": "handler",
        "environment_variables": {
          "FIRESTORE_DATABASE_NAME_bca69a1d": "${google_firestore_database.c1.name}",
          "WING_TARGET": "tf-gcp"
        },
        "https_trigger_security_level": "SECURE_ALWAYS",
        "name": "ontick0-c82d2f1d",
        "project": "sdk-spec-tests",
        "region": "us-east1",
        "runtime": "nodejs20",
        "service_account_email": "${google_service_account.from_cron_OnTick0_ServiceAccountc82d2f1d8fec3e13d91c6485d180aae181b7120c58_93C05499.email}",
        "source_archive_bucket": "${google_storage_bucket.from_cron_OnTick0_FunctionBucket_EEF9EDC7.name}",
        "source_archive_object": "${google_storage_bucket_object.from_cron_OnTick0_FunctionObjectBucket_27411FAD.name}",
        "timeout": 120,
        "trigger_http": true
      },
      "from_rate_OnTick0_DefaultFunction_E06C4134": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/DefaultFunction",
            "uniqueId": "from_rate_OnTick0_DefaultFunction_E06C4134"
          }
        },
        "available_memory_mb": 1024,
        "description": "This function was created by Wing",
        "entry_point": "handler",
        "environment_variables": {
          "FIRESTORE_DATABASE_NAME_7ba9f967": "${google_firestore_database.c2.name}",
          "WING_TARGET": "tf-gcp"
        },
        "https_trigger_security_level": "SECURE_ALWAYS",
        "name": "ontick0-c82ff92a",
        "project": "sdk-spec-tests",
        "region": "us-east1",
        "runtime": "nodejs20",
        "service_account_email": "${google_service_account.from_rate_OnTick0_ServiceAccountc82ff92ac8509ee3ca0a2da5631717182783eabb3a_2CEA3C34.email}",
        "source_archive_bucket": "${google_storage_bucket.from_rate_OnTick0_FunctionBucket_7752D553.name}",
        "source_archive_object": "${google_storage_bucket_object.from_rate_OnTick0_FunctionObjectBucket_F8336CE2.name}",
        "timeout": 120,
        "trigger_http": true
      }
    },
    "google_cloudfunctions_function_iam_member": {
      "from_cron_OnTick0_invoker-permission-KEN13_A669F87A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/invoker-permission-KEN.13]}",
            "uniqueId": "from_cron_OnTick0_invoker-permission-KEN13_A669F87A"
          }
        },
        "cloud_function": "${google_cloudfunctions_function.from_cron_OnTick0_DefaultFunction_F4D413FD.name}",
        "member": "serviceAccount:${google_service_account.from_cron_SchedulerServiceAccount_BF7611D4.email}",
        "project": "${google_cloudfunctions_function.from_cron_OnTick0_DefaultFunction_F4D413FD.project}",
        "region": "${google_cloudfunctions_function.from_cron_OnTick0_DefaultFunction_F4D413FD.region}",
        "role": "roles/cloudfunctions.invoker"
      },
      "from_rate_OnTick0_invoker-permission-KEN32_D7833EB6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/invoker-permission-KEN.32]}",
            "uniqueId": "from_rate_OnTick0_invoker-permission-KEN32_D7833EB6"
          }
        },
        "cloud_function": "${google_cloudfunctions_function.from_rate_OnTick0_DefaultFunction_E06C4134.name}",
        "member": "serviceAccount:${google_service_account.from_rate_SchedulerServiceAccount_DF19EF8F.email}",
        "project": "${google_cloudfunctions_function.from_rate_OnTick0_DefaultFunction_E06C4134.project}",
        "region": "${google_cloudfunctions_function.from_rate_OnTick0_DefaultFunction_E06C4134.region}",
        "role": "roles/cloudfunctions.invoker"
      }
    },
    "google_firestore_database": {
      "c1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c1/Default",
            "uniqueId": "c1"
          }
        },
        "app_engine_integration_mode": "DISABLED",
        "concurrency_mode": "OPTIMISTIC",
        "delete_protection_state": "DELETE_PROTECTION_DISABLED",
        "deletion_policy": "DELETE",
        "depends_on": [
          "google_project_service.c1_CloudFirestoreAPI_886AC909"
        ],
        "location_id": "us-east1",
        "name": "wing-counter-c1-c8b6c50f",
        "point_in_time_recovery_enablement": "POINT_IN_TIME_RECOVERY_DISABLED",
        "type": "DATASTORE_MODE"
      },
      "c2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c2/Default",
            "uniqueId": "c2"
          }
        },
        "app_engine_integration_mode": "DISABLED",
        "concurrency_mode": "OPTIMISTIC",
        "delete_protection_state": "DELETE_PROTECTION_DISABLED",
        "deletion_policy": "DELETE",
        "depends_on": [
          "google_project_service.c2_CloudFirestoreAPI_C80229BA"
        ],
        "location_id": "us-east1",
        "name": "wing-counter-c2-c81701d2",
        "point_in_time_recovery_enablement": "POINT_IN_TIME_RECOVERY_DISABLED",
        "type": "DATASTORE_MODE"
      }
    },
    "google_project_iam_custom_role": {
      "from_cron_OnTick0_CustomRolec82d2f1d8fec3e13d91c6485d180aae181b7120c58_61D80EEB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/CustomRolec82d2f1d8fec3e13d91c6485d180aae181b7120c58",
            "uniqueId": "from_cron_OnTick0_CustomRolec82d2f1d8fec3e13d91c6485d180aae181b7120c58_61D80EEB"
          }
        },
        "permissions": [
          "cloudfunctions.functions.get",
          "datastore.entities.get",
          "datastore.entities.create",
          "datastore.entities.update"
        ],
        "role_id": "cloudfunctions.customc82d2f1d8fec3e13d91c6485d180aae181b7120c58",
        "title": "Custom Role for Cloud Function c82d2f1d8fec3e13d91c6485d180aae181b7120c58"
      },
      "from_rate_OnTick0_CustomRolec82ff92ac8509ee3ca0a2da5631717182783eabb3a_CF202318": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/CustomRolec82ff92ac8509ee3ca0a2da5631717182783eabb3a",
            "uniqueId": "from_rate_OnTick0_CustomRolec82ff92ac8509ee3ca0a2da5631717182783eabb3a_CF202318"
          }
        },
        "permissions": [
          "cloudfunctions.functions.get",
          "datastore.entities.get",
          "datastore.entities.create",
          "datastore.entities.update"
        ],
        "role_id": "cloudfunctions.customc82ff92ac8509ee3ca0a2da5631717182783eabb3a",
        "title": "Custom Role for Cloud Function c82ff92ac8509ee3ca0a2da5631717182783eabb3a"
      }
    },
    "google_project_iam_member": {
      "from_cron_OnTick0_ProjectIamMember_F932FAC2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/ProjectIamMember",
            "uniqueId": "from_cron_OnTick0_ProjectIamMember_F932FAC2"
          }
        },
        "member": "serviceAccount:${google_service_account.from_cron_OnTick0_ServiceAccountc82d2f1d8fec3e13d91c6485d180aae181b7120c58_93C05499.email}",
        "project": "sdk-spec-tests",
        "role": "projects/sdk-spec-tests/roles/${google_project_iam_custom_role.from_cron_OnTick0_CustomRolec82d2f1d8fec3e13d91c6485d180aae181b7120c58_61D80EEB.role_id}"
      },
      "from_rate_OnTick0_ProjectIamMember_AC7C530B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/ProjectIamMember",
            "uniqueId": "from_rate_OnTick0_ProjectIamMember_AC7C530B"
          }
        },
        "member": "serviceAccount:${google_service_account.from_rate_OnTick0_ServiceAccountc82ff92ac8509ee3ca0a2da5631717182783eabb3a_2CEA3C34.email}",
        "project": "sdk-spec-tests",
        "role": "projects/sdk-spec-tests/roles/${google_project_iam_custom_role.from_rate_OnTick0_CustomRolec82ff92ac8509ee3ca0a2da5631717182783eabb3a_CF202318.role_id}"
      }
    },
    "google_project_service": {
      "c1_CloudFirestoreAPI_886AC909": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c1/CloudFirestoreAPI",
            "uniqueId": "c1_CloudFirestoreAPI_886AC909"
          }
        },
        "disable_on_destroy": false,
        "service": "firestore.googleapis.com"
      },
      "c2_CloudFirestoreAPI_C80229BA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/c2/CloudFirestoreAPI",
            "uniqueId": "c2_CloudFirestoreAPI_C80229BA"
          }
        },
        "disable_on_destroy": false,
        "service": "firestore.googleapis.com"
      },
      "from_cron_OnTick0_FunctionBucket_IamServiceAccountCredentialsApi_4C3315B8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/FunctionBucket/IamServiceAccountCredentialsApi",
            "uniqueId": "from_cron_OnTick0_FunctionBucket_IamServiceAccountCredentialsApi_4C3315B8"
          }
        },
        "disable_dependent_services": false,
        "disable_on_destroy": false,
        "service": "iamcredentials.googleapis.com"
      },
      "from_rate_OnTick0_FunctionBucket_IamServiceAccountCredentialsApi_B9283082": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/FunctionBucket/IamServiceAccountCredentialsApi",
            "uniqueId": "from_rate_OnTick0_FunctionBucket_IamServiceAccountCredentialsApi_B9283082"
          }
        },
        "disable_dependent_services": false,
        "disable_on_destroy": false,
        "service": "iamcredentials.googleapis.com"
      }
    },
    "google_service_account": {
      "from_cron_OnTick0_ServiceAccountc82d2f1d8fec3e13d91c6485d180aae181b7120c58_93C05499": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/ServiceAccountc82d2f1d8fec3e13d91c6485d180aae181b7120c58",
            "uniqueId": "from_cron_OnTick0_ServiceAccountc82d2f1d8fec3e13d91c6485d180aae181b7120c58_93C05499"
          }
        },
        "account_id": "ontick0-c82d2f1d",
        "display_name": "Custom Service Account for Cloud Function c82d2f1d8fec3e13d91c6485d180aae181b7120c58"
      },
      "from_cron_SchedulerServiceAccount_BF7611D4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/SchedulerServiceAccount",
            "uniqueId": "from_cron_SchedulerServiceAccount_BF7611D4"
          }
        },
        "account_id": "scheduler-c87c1726-sa",
        "display_name": "Service Account for scheduler-c87c1726"
      },
      "from_rate_OnTick0_ServiceAccountc82ff92ac8509ee3ca0a2da5631717182783eabb3a_2CEA3C34": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/ServiceAccountc82ff92ac8509ee3ca0a2da5631717182783eabb3a",
            "uniqueId": "from_rate_OnTick0_ServiceAccountc82ff92ac8509ee3ca0a2da5631717182783eabb3a_2CEA3C34"
          }
        },
        "account_id": "ontick0-c82ff92a",
        "display_name": "Custom Service Account for Cloud Function c82ff92ac8509ee3ca0a2da5631717182783eabb3a"
      },
      "from_rate_SchedulerServiceAccount_DF19EF8F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/SchedulerServiceAccount",
            "uniqueId": "from_rate_SchedulerServiceAccount_DF19EF8F"
          }
        },
        "account_id": "scheduler-c83fb79a-sa",
        "display_name": "Service Account for scheduler-c83fb79a"
      }
    },
    "google_storage_bucket": {
      "from_cron_OnTick0_FunctionBucket_EEF9EDC7": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/FunctionBucket/Default",
            "uniqueId": "from_cron_OnTick0_FunctionBucket_EEF9EDC7"
          }
        },
        "depends_on": [
          "google_project_service.from_cron_OnTick0_FunctionBucket_IamServiceAccountCredentialsApi_4C3315B8"
        ],
        "force_destroy": false,
        "location": "us-east1",
        "name": "functionbucket-${random_id.from_cron_OnTick0_FunctionBucket_Id_3324D148.hex}",
        "public_access_prevention": "enforced",
        "uniform_bucket_level_access": true
      },
      "from_rate_OnTick0_FunctionBucket_7752D553": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/FunctionBucket/Default",
            "uniqueId": "from_rate_OnTick0_FunctionBucket_7752D553"
          }
        },
        "depends_on": [
          "google_project_service.from_rate_OnTick0_FunctionBucket_IamServiceAccountCredentialsApi_B9283082"
        ],
        "force_destroy": false,
        "location": "us-east1",
        "name": "functionbucket-${random_id.from_rate_OnTick0_FunctionBucket_Id_79DF80D2.hex}",
        "public_access_prevention": "enforced",
        "uniform_bucket_level_access": true
      }
    },
    "google_storage_bucket_object": {
      "from_cron_OnTick0_FunctionObjectBucket_27411FAD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/FunctionObjectBucket",
            "uniqueId": "from_cron_OnTick0_FunctionObjectBucket_27411FAD"
          }
        },
        "bucket": "${google_storage_bucket.from_cron_OnTick0_FunctionBucket_EEF9EDC7.name}",
        "name": "objects",
        "source": "assets/from_cron_OnTick0_Asset_74EEBD07/1475918152EEA8CC1F1497A753366550/archive.zip"
      },
      "from_rate_OnTick0_FunctionObjectBucket_F8336CE2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/FunctionObjectBucket",
            "uniqueId": "from_rate_OnTick0_FunctionObjectBucket_F8336CE2"
          }
        },
        "bucket": "${google_storage_bucket.from_rate_OnTick0_FunctionBucket_7752D553.name}",
        "name": "objects",
        "source": "assets/from_rate_OnTick0_Asset_94CD035E/1487EB653C82BC034E750583C10FEB68/archive.zip"
      }
    },
    "random_id": {
      "from_cron_OnTick0_FunctionBucket_Id_3324D148": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_cron/OnTick0/FunctionBucket/Id",
            "uniqueId": "from_cron_OnTick0_FunctionBucket_Id_3324D148"
          }
        },
        "byte_length": 4
      },
      "from_rate_OnTick0_FunctionBucket_Id_79DF80D2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/from_rate/OnTick0/FunctionBucket/Id",
            "uniqueId": "from_rate_OnTick0_FunctionBucket_Id_79DF80D2"
          }
        },
        "byte_length": 4
      }
    }
  },
  "terraform": {
    "backend": {
      "local": {
        "path": "./terraform.tfstate"
      }
    },
    "required_providers": {
      "google": {
        "source": "google",
        "version": "5.10.0"
      },
      "random": {
        "source": "random",
        "version": "3.5.1"
      }
    }
  }
}
```
