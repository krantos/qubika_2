require('dotenv').config({ path: `.env.${process.env.NODE_ENV}`});

const base = process.env.API_BASE_URL || "http://localhost:3000/";
const apiHelper = {
	email: process.env.API_EMAIL || "foobar_mail",
	username: process.env.API_USERNAME || "foobar_username",
	secret: process.env.API_SECRET || "foobar_password",
	login: base + "auth/login",
	register: base + "auth/register",
}

module.exports = { apiHelper };