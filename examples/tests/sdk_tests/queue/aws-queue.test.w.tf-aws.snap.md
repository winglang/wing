# `aws-queue.test.w.tf-aws.snap.md`

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
    "aws": [
      {
      }
    ]
  },
  "resource": {
    "aws_sqs_queue": {
      "aws-wing-queue": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/aws-wing-queue/Default",
            "uniqueId": "aws-wing-queue"
          }
        },
        "message_retention_seconds": 3600,
        "name": "aws-wing-queue-c87f4487",
        "visibility_timeout_seconds": 30
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
      "aws": {
        "source": "aws",
        "version": "5.31.0"
      }
    }
  }
}
```
