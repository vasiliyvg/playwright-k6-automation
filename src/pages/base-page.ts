import {Page} from '@playwright/test';
import {config} from '../config';

const authFile = 'playwright/.auth/user.json';

export interface IBasePage
{
	readonly pageUrl: string;
	goto();
	shouldBeLoaded();
}

export class BasePage implements IBasePage
{
	readonly pageUrl: string = '';

	protected readonly mainHeader = this.page.locator('.main-header');

	constructor(public readonly page: Page)
	{
		this.page = page;
	}

	async goto(url = this.pageUrl)
	{
		await this.page.goto(`${config.BASE_URL}/${url}`);
	}

	async saveSession()
	{
		await this.page.context().storageState({ path: authFile });
	}

	async shouldBeLoaded()
	{
		// basic method, no need to implement
	}
}