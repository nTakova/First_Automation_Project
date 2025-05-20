## Description
This project contains automated tests for the Automation Exercises website, implemented using Playwright. 
The suite validates key user workflows such as login, registration, navigation, and form submissions to ensure consistent application behavior.


## Project Structure
```
├── node-modules/        # Project dependencies installed
├── playwright-report/   # generated reports
├── tests/               
│   └── *.test.ts        # individual test files written in TypeScript
├── tests-examples/      # Temporary raw output from test executions
├── test-results/        # Example or sample test files
├── playwright.config.ts # Playwright configuration file
├── package.json         # Project metadata and scripts
├── package-lock.json    # Exact dependency versions for reproducible builds
└── .gitignore           # Git ignore rules for files/folders
```
## Tech stack
- Playwright
- TypeScript
- Node.js

## Installation
- Clone the repository
```bash
git clone https://github.com/nTakova/First_Automation_Project.git
cd playwright-automation
```
- Install dependencies:
```bash
npm install
npx playwright install
```
## Running tests

- Running all tests
```bash
npx playwright test
```
- Running specific test
```bash
npx playwright test projects.spec.ts
```
- Running tests in UI mode
```bash
npx playwright test --ui
```



