#!/bin/bash

echo "🔍 Running test coverage analysis..."

# coverage threshold enforced
npx jest --coverage --coverageThreshold='{"global":{"lines":80,"branches":80,"functions":80}}'

# Step 1: Run tests + coverage
npx jest --coverage --coverageReporters=text-summary 2>&1 | tee coverage-summary.txt

# Step 2: Check if threshold passed
if grep -q "Jest: .* coverage threshold" coverage-summary.txt; then
  echo "❌ Coverage threshold NOT met. Check coverage/index.html for missing tests."
  exit 1
fi

# Step 3: List files with low branch coverage
echo ""
echo "📋 Files with branch coverage < 80%:"
npx c8 report --reporter=text 2>/dev/null | awk 'NR>2 && $4+0 < 80 {print "  ⚠️  " $1 " → Branch: " $4}'

echo ""
echo "✅ Coverage check complete. Open coverage/index.html to see full report."
