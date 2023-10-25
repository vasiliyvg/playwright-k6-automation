import {chromium} from 'k6/experimental/browser';
import {browserOptions, screenshotsPath} from '../utils/common.js';
import {vu, scenario} from 'k6/execution';

/** Example to demonstrate that k6 is operable */
export default async function ()
{
    const browser = chromium.launch(browserOptions);
    const page = browser.newPage();

    try
    {
        await page.goto('https://test.k6.io/my_messages.php', {waitUntil: 'networkidle'});

        // Enter login credentials
        page.locator('input[name="login"]').type('admin');
        page.locator('input[name="password"]').type('123');

        page.screenshot({path: screenshotsPath(scenario.name, vu.idInTest - 1)});
    }
    finally
    {
        page.close();
        browser.close();
    }
}