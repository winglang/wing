# `init.test.w.tf-gcp.snap.md`

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
