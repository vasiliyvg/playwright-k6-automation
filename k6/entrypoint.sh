TAG_NAME="$(basename -s .js $K6_SPEC_FILE)-$(date +%s)";
${WORKING_DIR}/xk6-file run ${K6_SPEC_FILE} --tag testid=$TAG_NAME ${K6_VERBOSE}