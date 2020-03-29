console.log("~~~~~ DEVELOPMENT build ~~~~~");

const merge = require("webpack-merge");
const base = require("./webpack.base.js");

// Creates the HTML file for you
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(base.base, {
	mode: "development",

	devtool: "cheap-module-source-map",

	devServer: {
		port: 8888,
		contentBase: false,
		open: "google chrome"
	},

	module: {
		rules: [
			{
				test: /\.scss$/,
				loaders: [
					"style-loader", // Create styles from JS strings
					"css-loader", // Translates CSS into JS
					"sass-loader", // Compiles SCSS
				]
			}
		]
	},

	plugins: [
		// Generate the HTML for us
		new HTMLWebpackPlugin(base.html)
	]
});