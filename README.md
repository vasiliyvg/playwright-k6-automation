# playwright-k6-automation
Example how to combine functional [https://playwright.dev/](playwright) and performance [https://k6.io/](k6) testing frameworks in one project.

## Getting started
Current example testing https://demoqa.com. 
It includes tests for: login and moving across pages.
### Prerequisites
1. Register a new account https://demoqa.com/register.
2. Export environment variables:
```
export BASE_URL=https://demoqa.com
export USER_NAME=your-user-name
export PASSWORD='****'
```
### NPM
Run:
```
npm install # install dependencies
npm pw:install # install playwright
npm run lint # check code style
npm run test # run tests for all available browsers
npm run report # show reports
```
### Docker
1. Build an image: `docker build -t playwright-k6-automation .`
2. Run tests: `docker run --rm -e BASE_URL -e USER_NAME -e PASSWORD --name playwright-k6-automation playwright-k6-automation:latest`
