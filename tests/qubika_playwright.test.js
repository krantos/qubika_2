const { test, expect } = require('@playwright/test');
const { apiHelper } = require('../src/helpers/api_routes.js');
const randomEmail = require('random-email');
const { save } = require('../src/helpers/save.js');
const { Login } = require('../src/pages/login.page.js');

test.describe('Suite 1', () => {
	test('Create new User', async({ request, page }) => {
		const loginView = new Login(page);
		const data = {
			email: `${randomEmail()}`,
			password: "12345678",
			roles: [ "ROLE_ADMIN" ]
		};
		const response = await request.post(`${apiHelper.register}`, {
			headers: {
				"Content-Type": "application/json"
			},
			data: data
		});
		const userData = await response.json()
		save(userData);
		expect(response.ok()).toBeTruthy();

		await loginView.goto();
		await loginView.setEmail(userData.email);
		await loginView.setPassword(data.password);
		const dashboard = await loginView.clickSubmit();


		expect(dashboard.nav.logout).toBeAttached();

	});
})

