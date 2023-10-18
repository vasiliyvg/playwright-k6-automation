import {expect} from '@playwright/test';
import {BasePage} from './base-page';

export class LoginPage extends BasePage
{
	readonly pageUrl = 'login';

	private readonly locators = {
		userNameInput: this.page.locator('input#userName'),
		passwordInput: this.page.locator('input#password'),
		submitButton: this.page.locator('button#login'),
		failureLabel: this.page.locator('p#name')
	};

	async logInForm(username: string, password: string) 
	{
		await this.locators.userNameInput.fill(username);
		await this.locators.passwordInput.fill(password);
		await this.locators.submitButton.click();
	}

	async failureLabelShouldNotExist()
	{
		await expect(this.locators.failureLabel).toHaveCount(0);
	}
}