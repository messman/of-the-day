console.log("~~~~~ PRODUCTION build ~~~~~");

const merge = require("webpack-merge");
const base = require("./webpack.base.js");

// Creates the HTML file for you
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(base.base, {
	mode: "production",

	output: {
		filename: "[name].js",
	},

	optimization: {
		minimize: true
	},

	plugins: [
		new HTMLWebpackPlugin(base.html),
	]
});