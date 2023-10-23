FROM mcr.microsoft.com/playwright:focal

ARG WORKING_DIR=/app

# Set the environment variables
ENV PATH=$WORKING_DIR/node_modules/.bin:$PATH
ENV npm_config_cache=$WORKING_DIR/npm
ENV PLAYWRIGHT_BROWSERS_PATH=$WORKING_DIR/ms-playwright
ENV TEST_RESULTS_DIR=test-results

# there is a built-in user "node" that comes from the very base Docker Node image
# we are going to recreate this user and give it _same id_ as external user
# that is going to run this container.
# `bamboo` user and group
ARG USER_ID=500
ARG GROUP_ID=501

# Set working directories
WORKDIR $WORKING_DIR

# Install dependencies
COPY package.json ./
RUN npm install
RUN npx playwright install
RUN npx playwright install-deps

# Copy project folder and configuration files
COPY src ./src
COPY *.config.js ./
COPY tsconfig.json ./
COPY .eslint* ./

RUN mkdir $TEST_RESULTS_DIR

RUN chown -R $USER_ID:$GROUP_ID $WORKING_DIR
RUN chown -R $USER_ID:$GROUP_ID $PLAYWRIGHT_BROWSERS_PATH
RUN chown -R $USER_ID:$GROUP_ID $TEST_RESULTS_DIR

USER $USER_ID
RUN id

# Run cypress tests
ENTRYPOINT [ "npm", "run", "test:chromium" ]