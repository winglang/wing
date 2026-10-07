#!/usr/bin/env bash
# Deletes resources leaked by the tf-aws SDK spec tests (tests/sdk_tests) in the
# dedicated e2e sandbox account.
#
# `wing test -t tf-aws` normally runs `terraform destroy` itself, but a
# cancelled/timed-out job (or a crash mid-destroy) leaves resources behind.
# Many Wing resource names are deterministic (e.g. `my-fn-c8abcdef`), so a
# leaked Lambda, log group, table or OAC makes the *next* run fail with "already
# exists" until it is removed.
#
# Safety:
#   * Refuses to run unless the caller is the expected CI role
#     (EXPECTED_ROLE_NAME), i.e. only inside the sandbox account.
#   * Only touches resources whose names match what Wing/Terraform generate:
#     `<name>-c8xxxxxx` (Wing construct-address hash) or `terraform-<26 digits>`
#     (Terraform-generated IAM role / EventBridge rule names).
#   * Only touches resources older than MAX_AGE_HOURS. sdk-spec-test jobs time
#     out after 3h, so anything older than that is not in use by a live run.
#   * DRY_RUN=true (default) only prints what would be deleted.
#
# Not covered (cheap or unused by the spec tests): SNS topics (no creation
# time; CreateTopic is idempotent), ECS/ECR/VPC (cloud.Service tests are
# sim-only today).
set -uo pipefail

REGION="${AWS_REGION:-us-east-1}"
MAX_AGE_HOURS="${MAX_AGE_HOURS:-4}"
DRY_RUN="${DRY_RUN:-true}"
EXPECTED_ROLE_NAME="${EXPECTED_ROLE_NAME:-}"
# DeleteRestApi is throttled to one call per 30s per account.
MAX_API_DELETES="${MAX_API_DELETES:-10}"

if ! [[ "$MAX_AGE_HOURS" =~ ^[0-9]+$ ]] || ((MAX_AGE_HOURS < 1)); then
  echo "error: MAX_AGE_HOURS must be a positive integer (got '$MAX_AGE_HOURS')" >&2
  exit 1
fi

WING_HASH='-c8[0-9a-f]{6}'
TF_NAME='^terraform-[0-9]{26}$'

export AWS_REGION="$REGION" AWS_DEFAULT_REGION="$REGION" AWS_PAGER=""

NOW=$(date -u +%s)
CUTOFF=$((NOW - MAX_AGE_HOURS * 3600))
PLANNED=0
DELETED=0
FAILED=0

log() { echo "$*" >&2; }

# Converts an epoch (seconds or milliseconds) or an ISO-8601 timestamp to epoch seconds.
to_epoch() {
  local v="$1"
  if [[ "$v" =~ ^[0-9]+(\.[0-9]+)?$ ]]; then
    v="${v%%.*}"
    if ((${#v} > 11)); then v=$((v / 1000)); fi
    echo "$v"
  else
    date -u -d "$v" +%s 2>/dev/null || echo "$NOW"
  fi
}

# terraform-20261007103000123400000001 -> epoch of 2026-10-07 10:30:00 UTC
tf_name_epoch() {
  local ts="${1#terraform-}"
  date -u -d "${ts:0:4}-${ts:4:2}-${ts:6:2} ${ts:8:2}:${ts:10:2}:${ts:12:2}" +%s 2>/dev/null || echo "$NOW"
}

is_stale() { (($(to_epoch "$1") < CUTOFF)); }

# act <description> <command...>
act() {
  local desc="$1"
  shift
  if [[ "$DRY_RUN" != "false" ]]; then
    log "[dry-run] would $desc"
    PLANNED=$((PLANNED + 1))
    return 0
  fi
  log "-> $desc"
  if "$@" >/dev/null; then
    DELETED=$((DELETED + 1))
  else
    echo "::warning::failed to $desc"
    FAILED=$((FAILED + 1))
    return 1
  fi
}

# Runs a read-only AWS CLI call and prints its text output with one row per line
# and fields separated by single spaces. Failures are reported, not fatal.
aws_text() {
  local out
  if ! out=$(aws "$@" --output text); then
    echo "::warning::aws $1 $2 failed; skipping" >&2
    return 0
  fi
  tr '\t' ' ' <<<"$out" | grep -v '^None$' || true
}

check_identity() {
  local arn
  arn=$(aws sts get-caller-identity --query Arn --output text) || {
    log "error: no AWS credentials"
    exit 1
  }
  log "caller: $arn"
  if [[ -z "$EXPECTED_ROLE_NAME" ]]; then
    log "error: EXPECTED_ROLE_NAME is not set; refusing to run"
    exit 1
  fi
  if [[ "$arn" != *":assumed-role/${EXPECTED_ROLE_NAME}/"* ]]; then
    log "error: caller is not the e2e CI role '${EXPECTED_ROLE_NAME}'; refusing to run"
    exit 1
  fi
}

# --- CloudFront (two-phase: disable now, delete once disabled + deployed) ---

cloudfront_disable() {
  local id="$1" etag cfg
  cfg=$(mktemp)
  etag=$(aws cloudfront get-distribution-config --id "$id" --query ETag --output text) &&
    aws cloudfront get-distribution-config --id "$id" --query DistributionConfig --output json |
    jq '.Enabled = false' >"$cfg" &&
    aws cloudfront update-distribution --id "$id" --if-match "$etag" --distribution-config "file://$cfg"
  local rc=$?
  rm -f "$cfg"
  return "$rc"
}

cloudfront_delete() {
  local id="$1" etag oacs oac oac_etag
  oacs=$(aws_text cloudfront get-distribution-config --id "$id" \
    --query 'DistributionConfig.Origins.Items[].OriginAccessControlId')
  etag=$(aws cloudfront get-distribution-config --id "$id" --query ETag --output text) || return 1
  aws cloudfront delete-distribution --id "$id" --if-match "$etag" || return 1
  for oac in $oacs; do
    [[ -n "$oac" ]] || continue
    oac_etag=$(aws cloudfront get-origin-access-control --id "$oac" --query ETag --output text) || continue
    aws cloudfront delete-origin-access-control --id "$oac" --if-match "$oac_etag" ||
      echo "::warning::failed to delete origin access control $oac"
  done
}

sweep_cloudfront() {
  local id enabled status modified origins query
  # shellcheck disable=SC2016 # backticks are a JMESPath literal, not shell
  query='DistributionList.Items[].[Id, Enabled, Status, LastModifiedTime, join(`,`, Origins.Items[].DomainName)]'
  while read -r id enabled status modified origins; do
    [[ -n "$id" ]] || continue
    grep -Eq -- "${WING_HASH}-[0-9]{26}\.s3\." <<<"$origins" || continue
    is_stale "$modified" || continue
    if [[ "$enabled" == "True" ]]; then
      act "disable CloudFront distribution $id (deleted on a later run)" cloudfront_disable "$id"
    elif [[ "$status" == "Deployed" ]]; then
      act "delete CloudFront distribution $id and its origin access controls" cloudfront_delete "$id"
    fi
  done < <(aws_text cloudfront list-distributions --query "$query")
}

# --- API Gateway ---

sweep_apis() {
  local id name created n=0
  while read -r id name created; do
    [[ -n "$id" ]] || continue
    [[ "$name" =~ ${WING_HASH}$ ]] || continue
    is_stale "$created" || continue
    if ((n >= MAX_API_DELETES)); then
      log "reached MAX_API_DELETES=$MAX_API_DELETES; leaving the rest for the next run"
      break
    fi
    ((n > 0)) && [[ "$DRY_RUN" == "false" ]] && sleep 31
    act "delete REST API $name ($id)" aws apigateway delete-rest-api --rest-api-id "$id"
    n=$((n + 1))
  done < <(aws_text apigateway get-rest-apis --query 'items[].[id, name, createdDate]')
}

# --- Lambda + log groups ---

sweep_lambdas() {
  local name modified
  while read -r name modified; do
    [[ -n "$name" ]] || continue
    [[ "$name" =~ ${WING_HASH}$ ]] || continue
    is_stale "$modified" || continue
    act "delete Lambda function $name" aws lambda delete-function --function-name "$name"
  done < <(aws_text lambda list-functions --query 'Functions[].[FunctionName, LastModified]')
}

sweep_log_groups() {
  local name created
  while read -r name created; do
    [[ -n "$name" ]] || continue
    [[ "$name" =~ ^/aws/lambda/.*${WING_HASH}$ ]] || continue
    is_stale "$created" || continue
    act "delete log group $name" aws logs delete-log-group --log-group-name "$name"
  done < <(aws_text logs describe-log-groups --log-group-name-prefix /aws/lambda/ \
    --query 'logGroups[].[logGroupName, creationTime]')
}

# --- EventBridge rules (cloud.Schedule) ---

rule_delete() {
  local name="$1" ids
  ids=$(aws_text events list-targets-by-rule --rule "$name" --query 'Targets[].Id')
  if [[ -n "$ids" ]]; then
    # shellcheck disable=SC2086 # intentional word splitting into --ids
    aws events remove-targets --rule "$name" --ids $ids || return 1
  fi
  aws events delete-rule --name "$name"
}

sweep_rules() {
  local name
  while read -r name; do
    [[ -n "$name" ]] || continue
    [[ "$name" =~ $TF_NAME ]] || continue
    (($(tf_name_epoch "$name") < CUTOFF)) || continue
    act "delete EventBridge rule $name" rule_delete "$name"
  done < <(aws_text events list-rules --query 'Rules[].[Name]')
}

# --- SQS ---

sweep_queues() {
  local url name created
  while read -r url; do
    [[ -n "$url" ]] || continue
    name="${url##*/}"
    [[ "$name" =~ ${WING_HASH}(\.fifo)?$ ]] || continue
    created=$(aws sqs get-queue-attributes --queue-url "$url" --attribute-names CreatedTimestamp \
      --query 'Attributes.CreatedTimestamp' --output text 2>/dev/null) || continue
    is_stale "$created" || continue
    act "delete SQS queue $name" aws sqs delete-queue --queue-url "$url"
  done < <(aws_text sqs list-queues --query 'QueueUrls[]' | tr ' ' '\n')
}

# --- DynamoDB ---

sweep_tables() {
  local name created
  while read -r name; do
    [[ -n "$name" ]] || continue
    [[ "$name" =~ ${WING_HASH}$ ]] || continue
    created=$(aws dynamodb describe-table --table-name "$name" \
      --query 'Table.CreationDateTime' --output text 2>/dev/null) || continue
    is_stale "$created" || continue
    act "delete DynamoDB table $name" aws dynamodb delete-table --table-name "$name"
  done < <(aws_text dynamodb list-tables --query 'TableNames[]' | tr ' ' '\n')
}

# --- S3 ---

bucket_delete() {
  local bucket="$1" batch
  while :; do
    batch=$(aws s3api list-object-versions --bucket "$bucket" --max-items 1000 --output json |
      jq -c '{Objects: ([.Versions[]?, .DeleteMarkers[]?] | map({Key, VersionId})), Quiet: true}') || return 1
    [[ "$(jq '.Objects | length' <<<"$batch")" == "0" ]] && break
    aws s3api delete-objects --bucket "$bucket" --delete "$batch" >/dev/null || return 1
  done
  aws s3api delete-bucket --bucket "$bucket"
}

sweep_buckets() {
  local name created
  while read -r name created; do
    [[ -n "$name" ]] || continue
    [[ "$name" =~ ${WING_HASH}-[0-9]{26}$ ]] || continue
    is_stale "$created" || continue
    act "empty and delete S3 bucket $name" bucket_delete "$name"
  done < <(aws_text s3api list-buckets --query 'Buckets[].[Name, CreationDate]')
}

# --- IAM roles (function/service execution roles; last, after their users) ---

role_delete() {
  local role="$1" p
  for p in $(aws_text iam list-role-policies --role-name "$role" --query 'PolicyNames[]'); do
    aws iam delete-role-policy --role-name "$role" --policy-name "$p" || return 1
  done
  for p in $(aws_text iam list-attached-role-policies --role-name "$role" --query 'AttachedPolicies[].PolicyArn'); do
    aws iam detach-role-policy --role-name "$role" --policy-arn "$p" || return 1
  done
  for p in $(aws_text iam list-instance-profiles-for-role --role-name "$role" --query 'InstanceProfiles[].InstanceProfileName'); do
    aws iam remove-role-from-instance-profile --role-name "$role" --instance-profile-name "$p" || return 1
  done
  aws iam delete-role --role-name "$role"
}

sweep_roles() {
  local name created
  while read -r name created; do
    [[ -n "$name" ]] || continue
    [[ "$name" =~ $TF_NAME ]] || continue
    [[ "$name" != "$EXPECTED_ROLE_NAME" ]] || continue
    is_stale "$created" || continue
    act "delete IAM role $name" role_delete "$name"
  done < <(aws_text iam list-roles --query 'Roles[].[RoleName, CreateDate]')
}

main() {
  check_identity
  log "region=$REGION max_age_hours=$MAX_AGE_HOURS dry_run=$DRY_RUN cutoff=$(date -u -d "@$CUTOFF" +%FT%TZ)"

  sweep_cloudfront
  sweep_apis
  sweep_lambdas
  sweep_rules
  sweep_log_groups
  sweep_queues
  sweep_tables
  sweep_buckets
  sweep_roles

  local summary
  if [[ "$DRY_RUN" != "false" ]]; then
    summary="dry run: $PLANNED stale resource(s) would be deleted"
  else
    summary="deleted $DELETED stale resource(s), $FAILED failure(s)"
  fi
  log "$summary"
  if [[ -n "${GITHUB_STEP_SUMMARY:-}" ]]; then
    echo "AWS e2e sweep (max age ${MAX_AGE_HOURS}h): $summary" >>"$GITHUB_STEP_SUMMARY"
  fi
  ((FAILED == 0))
}

main "$@"
