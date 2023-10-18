import {config} from '../config';
import {test as setup } from '../fixtures/page-fixtures';

setup('Successful login', async ({ loginPage, profilePage}) =>
{
	await loginPage.logInForm(config.USER_NAME, config.PASSWORD);
	await loginPage.failureLabelShouldNotExist();
	await profilePage.shouldBeLoaded();
});
