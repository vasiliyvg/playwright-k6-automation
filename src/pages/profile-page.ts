import {expect} from '@playwright/test';
import {config} from '../config';
import {BasePage, IBasePage} from './base-page';

export class ProfilePage extends BasePage implements IBasePage
{
	readonly pageUrl = 'profile';
	readonly userNameLabel = this.page.locator('label#userName-value');
	readonly noRowsFoundMessage = this.page.locator('.rt-noData', {hasText: 'No rows found'});
	readonly goToStoreButton = this.page.locator('button#gotoStore');

	async goto()
	{
		await super.goto(this.pageUrl);
	}

	async shouldBeLoaded()
	{
		await expect(this.mainHeader).toHaveText('Profile');
		await expect(this.userNameLabel).toHaveText(config.USER_NAME);
		await expect(this.noRowsFoundMessage).toBeVisible();
	}
}