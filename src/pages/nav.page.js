const { Categories } = require("./categories.page.js");
const { Dashboard } = require("./dashboard.page.js");
class Nav {
  constructor(page, mobile = false) {
    this.page = page;
    this.mobile = mobile;
    this.dashboard = page.locator("//a[contains(text(),'Dashboard')]");
    this.categories = page.locator("//a[contains(.,'Tipos de Categorias')]");
    this.logout = page.locator("//a[contains(text(),'Salir')]");
    if (mobile) {
      // mobile locators...
    }
  }

  async clickDashboard() {
    await this.dashboard.click();
    return new Dashboard(this.page, this.mobile);
  }

  async clickCategories() {
    await this.categories.click();
    await this.page.waitForURL("**/category-type");
    return new Categories(this.page, this.mobile);
  }

  async clickLogout() {
    await this.logout.click();
  }
}

exports.Nav = Nav;
