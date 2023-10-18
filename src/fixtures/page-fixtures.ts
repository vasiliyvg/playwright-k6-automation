import {test as base} from '@playwright/test';
import {LoginPage} from '../pages/login-page';
import {ProfilePage} from '../pages/profile-page';
import {BookStorePage} from '../pages/book-store-page';
import {BookDetailsPage} from '../pages/book-details-page';

// Declare the types of your fixtures.
type PageFixtures = {
	loginPage: LoginPage,
	profilePage: ProfilePage;
	bookStorePage: BookStorePage;
	bookDetailsPage: BookDetailsPage;
};

// Extend base test by providing pages.
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<PageFixtures>({
	loginPage: async ({page}, use) =>
	{
		const loginPage = new LoginPage(page);
		await loginPage.goto();
		await use(loginPage);
		await loginPage.saveSession();
	},
	profilePage: async ({page}, use) =>
	{
		const profilePage = new ProfilePage(page);
		await use(profilePage);
	},
	bookStorePage: async ({page}, use) =>
	{
		const bookStorePage = new BookStorePage(page);
		await use(bookStorePage);
	},
	bookDetailsPage: async ({page}, use) =>
	{
		const bookDetailsPage = new BookDetailsPage(page);
		await use(bookDetailsPage);
	},
});
export {expect} from '@playwright/test';