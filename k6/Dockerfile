# Build the k6 extentions
FROM grafana/xk6 as K6_EXTENTION
# Extention adds ability to write content to files
RUN xk6 build --with github.com/avitalique/xk6-file --output /tmp/k6

FROM grafana/k6:0.45.0

# Set environment variables
ENV WORKING_DIR=/performance
ENV XK6_HEADLESS=true
ENV K6_BROWSER_ENABLED=true
ENV CHROME_BIN=/usr/bin/chromium-browser
ENV CHROME_PATH=/usr/lib/chromium/
ENV K6_SPEC_FILE=test/daily.spec.js
ENV K6_usersFilePath=${WORKING_DIR}/resources/users.json

# Replace k6 binary by extended version
COPY --from=K6_EXTENTION /tmp/k6 ${WORKING_DIR}/xk6-file

# Stage scope ARGs, should be passed separately for each Stage to use them inside commands

# there is a built-in user "node" that comes from the very base Docker Node image
# we are going to recreate this user and give it _same id_ as external user
# that is going to run this container.
ARG USER_ID=500
ARG GROUP_ID=501

# Start using working directory
WORKDIR $WORKING_DIR

# Copy k6 folder and configuration files
COPY config ./config
COPY tests ./tests
COPY pages ./pages
COPY screenshots ./screenshots
COPY reports ./reports
COPY webpack.config.js ./
COPY entrypoint.sh ./

USER root

RUN apk --no-cache add chromium-swiftshader

RUN chown $USER_ID:$GROUP_ID $WORKING_DIR/screenshots
RUN chown $USER_ID:$GROUP_ID $WORKING_DIR/reports
RUN chown $USER_ID:$GROUP_ID $WORKING_DIR/resources

USER $USER_ID
RUN id

# Run performance tests
ENTRYPOINT [ "/bin/sh", "entrypoint.sh" ]