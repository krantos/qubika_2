
const { Dashboard } = require('./dashboard.page.js');
class Login {
	constructor(page, mobile = false) {
		this.mobile = mobile;
		this.page = page;
		this.email = page.locator("//input[@type='email']");
		this.password = page.locator("//input[@type='password']");
		this.submit = page.locator("//button[@type='submit']");
	}

	async goto() {
		await this.page.goto('#/auth/login');
	}

	async setEmail(email = '') {
		await this.email.fill(email);
	}

	async setPassword(password = '') {
		await this.password.fill(password);
	}

	async clickSubmit() {
		await this.submit.click();
		await this.page.waitForURL('**/dashboard');
		return new Dashboard(this.page, this.mobile);
	}
}

exports.Login = Login;