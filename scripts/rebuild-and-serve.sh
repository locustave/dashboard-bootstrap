#!/usr/bin/env bash
# PostToolUse hook: build, test, and serve reference app
# Receives JSON on stdin from Claude Code hook system
# Returns JSON with test results so the model knows about failures

set -uo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/examples/reference-app/dist"
PORT=5173

# Extract the edited file path from hook input
FILE_PATH=$(jq -r '.tool_response.filePath // .tool_input.file_path // ""' 2>/dev/null || echo "")

# Only process source files (skip non-code, node_modules, dist, .claude)
if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi
case "$FILE_PATH" in
  *.ts|*.tsx|*.js|*.jsx|*.css|*.json|*.yaml|*.yml) ;;
  *) exit 0 ;;
esac
case "$FILE_PATH" in
  */node_modules/*|*/dist/*|*/.claude/*) exit 0 ;;
esac

cd "$ROOT"

# Build
BUILD_OUTPUT=$(pnpm build 2>&1) || true
BUILD_EXIT=$?

# Run tests
TEST_OUTPUT=$(pnpm test 2>&1) || true
TEST_EXIT=$?

# Serve reference app if not already running
if ! lsof -ti:"$PORT" >/dev/null 2>&1; then
  npx serve "$DIST" -l "$PORT" -s >/dev/null 2>&1 &
  disown
fi

# Report results back to the model
if [[ $BUILD_EXIT -ne 0 ]]; then
  # Extract last 20 lines of build output for the error
  BUILD_TAIL=$(echo "$BUILD_OUTPUT" | tail -20)
  jq -n --arg ctx "BUILD FAILED:\n$BUILD_TAIL" \
    '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'
elif [[ $TEST_EXIT -ne 0 ]]; then
  # Extract failed test lines
  TEST_TAIL=$(echo "$TEST_OUTPUT" | grep -A 2 'FAIL\|Error\|✗\|×\|expected\|AssertionError' | head -30)
  if [[ -z "$TEST_TAIL" ]]; then
    TEST_TAIL=$(echo "$TEST_OUTPUT" | tail -25)
  fi
  jq -n --arg ctx "TESTS FAILED:\n$TEST_TAIL" \
    '{"hookSpecificOutput":{"hookEventName":"PostToolUse","additionalContext":$ctx}}'
fi
