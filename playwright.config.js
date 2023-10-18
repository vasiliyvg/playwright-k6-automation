import {defineConfig, devices} from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

	testDir: './src/tests',

	/* Maximum time one test can run for. */
	timeout: 70 * 1000,

	expect: {

		/**
         * Maximum time expect() should wait for the condition to be met.
         * For example in `await expect(locator).toHaveText();`
         */
		timeout: 70000
	},

	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,

	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,

	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,

	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'line',

	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {

		/* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
		actionTimeout: 0,

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',

		/* Make screenshots by conditions */
		screenshot: 'only-on-failure',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'setup', testMatch: /.*\.setup\.ts/
		},
		{
			name: 'chromium',

			/* Project-specific settings. */
			use: {
				...devices['Desktop Chrome'],
				storageState: 'playwright/.auth/user.json',
			},
			dependencies: ['setup']
		},

		{
			name: 'firefox',
			use: {
				...devices['Desktop Firefox'],
				storageState: 'playwright/.auth/user.json',
			},
			dependencies: ['setup']
		},
		{
			name: 'webkit',
			use: {
				...devices['Desktop Safari'],
				storageState: 'playwright/.auth/user.json',
			},
			dependencies: ['setup']
		}
	],

	/* Folder for test artifacts such as screenshots, videos, traces, etc. */
	outputDir: 'test-results/'
});