exports.config = {
  output: 'reports',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'https://www.saucedemo.com',
      show: true,
    },
  },
  include: {
    I: './steps_file',
    loginPage: './pages/LoginPage.ts',
    config: './config.ts',
  },
  mocha: {},
  bootstrap: null,
  timeout: null,
  teardown: null,
  hooks: [],
  gherkin: {
    features: './features/*.feature',
    steps: ['./step_definitions/steps.ts'],
  },
  plugins: {
    screenshotOnFail: {
      enabled: true,
    },
    tryTo: {
      enabled: false,
    },
    retryFailedStep: {
      enabled: true,
    },
    retryTo: {
      enabled: false,
    },
    eachElement: {
      enabled: true,
    },
    pauseOnFail: {},
  },
  stepTimeout: 0,
  stepTimeoutOverride: [
    {
      pattern: 'wait.*',
      timeout: 0,
    },
    {
      pattern: 'amOnPage',
      timeout: 0,
    },
  ],
  tests: 'tests/*_test.ts',
  name: 'otus-qa-js',
};
