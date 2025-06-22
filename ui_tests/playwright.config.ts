import {defineConfig, devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    // retries: 1,
    // workers: 1,
    reporter: [
        ['list'],
        ['html', {outputFolder: '../reports/ui_tests_html_report', open: 'never'}],
        ['allure-playwright', {resultsDir: '../reports/ui_tests_allure_results', detail: true, suiteTitle: false}]
    ],
    use: {
        baseURL: 'https://www.cp.pt',

        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
        },

        // {
        //   name: 'firefox',
        //   use: { ...devices['Desktop Firefox'] },
        // },
        //
        // {
        //   name: 'webkit',
        //   use: { ...devices['Desktop Safari'] },
        // },
    ]
});
