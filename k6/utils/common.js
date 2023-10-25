import { check, fail } from 'k6';
import http from 'k6/http';
import { Httpx } from 'https://jslib.k6.io/httpx/0.1.0/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { SharedArray } from 'k6/data';

export const baseUrl = __ENV.BASE_URL;
export const USER_NAME = __ENV.USER_NAME;
export const PASSWORD = __ENV.PASSWORD;
export const screenshotsDir = __ENV.K6_screenshotsDir
    ? __ENV.K6_screenshotsDir
    : './screenshots';
export const usersFilePath = __ENV.K6_usersFilePath
    ? __ENV.K6_usersFilePath
    : '../resources/users.json';

export function screenshotsPath(scenarioName, vuId)
{
    return `${screenshotsDir}/screenshot-${scenarioName}-${vuId}.png`;
}

export function handleSummary(data)
{
    return {
        'reports/summary.html': htmlReport(data),
        stdout: textSummary(data, { indent: ' ', enableColors: true }),
    };
}

export const browserOptions = {
    args: ['no-sandbox'],
    headless: true,
    timeout: '3m',
    ignoreHTTPSErrors: true,
};

export const session = new Httpx();
session.setBaseUrl(baseUrl);
console.debug(`Connecting to ${baseUrl}`);

/**
 * Header Data for WebApp REST and QA API requests.
 * @param {string} token - Token generated after login operation.
 */
export function authHeader(token)
{
    return {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
    };
}

/**
 * Login into Webapp using API
 * @param currentUsername - current username
 * @param currentPassword - current password
 * @returns {string}
 * @example - currentUsername and currentPassword could have values taken from decrypted JSON file:
 * @example `users[vu.idInTest - 1].username, users[vu.idInTest - 1].password` where `vu.idInTest - 1`
 * @example is user ID across the whole test run selected form file by index
 */
export function login(currentUsername, currentPassword)
{
    const loginResponse = http.post(`${baseUrl}/login`, {
        username: currentUsername,
        password: currentPassword,
    });
    const jar = http.cookieJar();
    const cookies = jar.cookiesForURL(loginResponse.url);

    console.debug(`Current user: ${currentUsername}`);

    check(loginResponse, {
        'Status is 200 on login': (r) => r.status === 200,
        'JSESSIONID cookie is present on login': () =>
            cookies.JSESSIONID.length > 0,
    });

    console.debug(`JSESSIONID: ${cookies.JSESSIONID}`);

    return cookies.JSESSIONID;
}

/**
 * Get users from a JSON file
 */
export function getUsers()
{
    return new SharedArray('users', function ()
    {
        console.debug(`Getting test users from file: ${usersFilePath}`);
        return JSON.parse(open(usersFilePath, 'utf-8')).users;
    });
}

/** Track browser metrics for specified async functions
 * @param startDate - start measurement at this time
 * @param trend - using to catch browser metrics
 * @returns {Promise<T>}
 */
export function trackBrowserMetrics(trend, startDate)
{
    const endDate = Date.now();
    const diff = endDate - startDate;
    trend.add(diff);
    if (diff <= 0)
    {
        fail('Browser metrics could not be a zero!');
    }
}