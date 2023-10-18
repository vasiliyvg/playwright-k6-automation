import {BasePage, IBasePage} from './base-page';
import {expect} from '@playwright/test';

export class BookDetailsPage extends BasePage implements IBasePage
{
	readonly pageUrl = 'books';
	readonly profileWrapper = this.page.locator('.profile-wrapper');
	readonly bookDetailsFieldNameLabel = (fieldName: string) =>
		this.profileWrapper.getByText(fieldName, {exact: true});
	readonly bookDetailsFieldValueLabel = (fieldValue) =>
		this.profileWrapper.getByText(fieldValue);

	async shouldBeLoaded()
	{
		await expect(this.mainHeader).toHaveText('Book Store');
	}

	async verifyThatBookHasAppropriateFields(bookFields)
	{
		for (const [key, value] of Object.entries(bookFields))
		{
			await expect(this.bookDetailsFieldNameLabel(`${key} :`)).toBeVisible();
			await expect(this.bookDetailsFieldValueLabel(value)).toBeVisible();
		}
	}
}