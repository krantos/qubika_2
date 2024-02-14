const { apiHelper } = require("../helpers/api_routes.js");

class Categories {
  constructor(page, mobile) {
    this.page = page;
    this.mobile = mobile;
    this.title = page.locator("//h3[text()='Tipos de categorías']");
    this.addBtn = page.locator("//button[text()=' Adicionar']");
    this.nextPagination = page.locator("//a[.='Next']");
    this.paginationList = page.locator(
      "//div[@class='card-footer py-4']//ul[1]/li",
    );
  }

  async clickAdd() {
    await this.addBtn.click();
    return new AddCategory(this.page, this.mobile);
  }

  async goToLastPage() {
    await this.page
      .locator(`li:left-of(a:has-text("Next"))`)
      .locator("nth=0")
      .click();
  }
}

class AddCategory {
  constructor(page, mobile) {
    this.page = page;
    this.mobile = mobile;
    const locator = (string) => page.locator(string);
    this.title = locator("//h1[text()='Adicionar tipo de categoría']");
    this.name = locator("//input[@placeholder='Nombre de categoría']");
    this.subCategory = locator("//span[text()='Es subcategoria?']");
    this.parentName = locator(
      "//span[text()='Es subcategoria?']/following::input",
    );
    this.cancel = locator("//button[text()='Cancelar']");
    this.accept = locator("//button[text()='Aceptar']");
  }

  async addCategoryName(name = "") {
    await this.name.fill(name);
  }

  async clickSubCategory() {
    await this.subCategory.click();
  }

  async enterParent(text = "") {
    await this.parentName.fill(text);
    await this.page.click(`//span[text()='${text}']`);
  }

  async clickCancel() {
    await this.cancel.click();
  }

  async clickAccept() {
    await this.accept.click();
    await this.page.waitForResponse(apiHelper.category.create);
  }
}

exports.Categories = Categories;
