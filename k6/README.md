# Performance testing
This project is to implement performance testing for Demo Book Store.

## Installation

Install k6: https://k6.io/docs/getting-started/installation/

## Getting Started

### Prerequisites
- Navigate to `k6` directory and use it as a working directory
- Set environment variables:
```bash
export K6_BROWSER_ENABLED=true
export XK6_HEADLESS=true
export BASE_URL='https://'
export USER_NAME=''
export PASSWORD=''
```

### NPM
- Run command: `npm run test:performance`

### Docker
- (Optional) Deploy Dashboards with real-time metrics from tests:
    - Run command: `docker compose up -d prometheus grafana`
    - Navigate to http://localhost:3000/ to see dashboards
- Run the next command: `./docker-run.sh ./test/smartlist.spec.js true`

> Attention! Dockerized tests with browser does not correctly work on MacOS M1/M2 yet.