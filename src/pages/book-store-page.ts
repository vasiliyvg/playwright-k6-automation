import {expect} from '@playwright/test';
import {BasePage, IBasePage} from './base-page';

export class BookStorePage extends BasePage implements IBasePage
{
	readonly countOfBooks = 10;
	readonly pageUrl = 'profile';
	readonly bookRow = this.page.getByRole('grid').getByRole('rowgroup');
	linkToBookDetails = (rowNumber: number) =>
		this.bookRow.nth(rowNumber).locator('.action-buttons a');

	async shouldBeLoaded()
	{
		await expect(this.mainHeader).toHaveText('Book Store');
		await expect(this.bookRow).toHaveCount(this.countOfBooks);
	}
}