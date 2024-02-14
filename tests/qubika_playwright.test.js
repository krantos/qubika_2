const { test, expect } = require("@playwright/test");
const { apiHelper } = require("../src/helpers/api_routes.js");
const randomEmail = require("random-email");
const { save } = require("../src/helpers/save.js");
const { Login } = require("../src/pages/login.page.js");
const { Nav } = require("../src/pages/nav.page.js");
const Ajv = require("ajv");
const registerUserSchema = require("../src/test_files/registerUserSchema.json");

let auth;

test.beforeAll(async ({ request }) => {
  const response = await request.post(`${apiHelper.login}`, {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email: apiHelper.email,
      password: apiHelper.secret,
      userName: apiHelper.username,
    },
  });
  const data = await response.json();
  auth = "Bearer " + data.token;

});

test.describe("Suite 1", () => {
  test("Create new User", async ({ request, page }) => {
    const loginView = new Login(page);
    const data = {
      email: `${randomEmail()}`,
      password: "12345678",
      roles: ["ROLE_ADMIN"],
    };
    const newCategoryName = Date.now() + "-category";
    const subCategoryName = Date.now() + "-sub-category";

    let response = await request.post(`${apiHelper.register}`, {
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    const userData = await response.json();
    save(userData);
    expect(response.status()).toBe(201);

    const ajv = new Ajv();
    const validate = ajv.compile(registerUserSchema);
    const valid = validate(userData);

    if (!valid) {
      console.error("AJV Validation Errors:", ajv.errorsText(validate.errors));
    }
    console.log("Schema validation is true");

    expect(valid).toBe(true);

    await loginView.goto();
    // Validate login using visual regression testing
		await expect(page).toHaveScreenshot();

		// Validating login by using it
    await loginView.setEmail(userData.email);
    await loginView.setPassword(data.password);
    await loginView.clickSubmit();
    const nav = new Nav(page, false);

    expect(nav.logout).toBeVisible();

    const categoryView = await nav.clickCategories();
    const addCategoryModal = await categoryView.clickAdd();

    await addCategoryModal.addCategoryName(newCategoryName);
    await addCategoryModal.clickAccept();

    await categoryView.goToLastPage();
    await expect(
      page.locator(`//td[text()="${newCategoryName}"]`)
    ).toBeInViewport();

    // Validate the new category using the API
    response = await request.get(apiHelper.category.getAll, {
      headers: {
        Authorization: auth,
      },
    });
    let categories = await response.json();
    expect(categories[categories.length - 1].name).toBe(newCategoryName);

    // Add a subcategory
    await categoryView.clickAdd();

    await addCategoryModal.addCategoryName(subCategoryName);
    await addCategoryModal.clickSubCategory();
    await addCategoryModal.enterParent(newCategoryName);
    await addCategoryModal.clickAccept();

    await categoryView.goToLastPage();
    await expect(
      page.locator(`//td[text()="${newCategoryName}"]`)
    ).toBeInViewport();

    // Validate the new sub-category using the API
    response = await request.get(apiHelper.category.getAll, {
      headers: {
        Authorization: auth,
      },
    });
    categories = await response.json();
    expect(categories[categories.length - 1].name).toBe(subCategoryName);
  });
});
