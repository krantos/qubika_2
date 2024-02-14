class Nav {
	constructor(page, mobile = false) {
		this.page = page;
		this.dashboard = page.locator("//a[contains(text(),'Dashboard')]");
		this.categories = page.locator("//a[contains(.,'Tipos de Categorias')]");
		this.logout = page.locator("//a[contains(text(),'Salir')]");
		if(mobile) {
			// mobile locators...
		}
	}

	async clickDashboard() {
		await this.dashboard.click();
	}

	async clickCategories() {
		await this.categories.click();
	}

	async clickLogout() {
		await this.logout.click();
	}
}

module.exports = { Nav };
