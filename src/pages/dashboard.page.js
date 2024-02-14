const { Nav } = require('./nav.page.js');

class Dashboard {
	constructor(page, mobile = false) {
		this.page = page;
		this.nav = new Nav(page, mobile);
	}
}

module.exports = { Dashboard };