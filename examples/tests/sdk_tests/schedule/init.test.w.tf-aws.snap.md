# `init.test.w.tf-aws.snap.md`

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
    "aws_cloudwatch_event_rule": {
      "s0_Schedule_7FE1E150": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/s0/Schedule",
            "uniqueId": "s0_Schedule_7FE1E150"
          }
        },
        "schedule_expression": "rate(5 minutes)"
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
