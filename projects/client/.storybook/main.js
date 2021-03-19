const path = require("path");
const getDefine = require('../define');
const webpack = require('webpack');
const updateWebpackConfig = require('../webpack-common');

// https://storybook.js.org/docs/configurations/typescript-config/
module.exports = {

	stories: ['../src/**/*.story.tsx'],

	addons: ['@storybook/addon-viewport/register', '@storybook/addon-knobs/register'],

	webpackFinal: async function (config) {

		const DEFINE = await getDefine(true, true);

		updateWebpackConfig(config, true, true);

		config.resolve.extensions.push('.ts', '.tsx');

		// Taken from regular webpack build
		config.resolve.alias['@'] = path.resolve(__dirname, '../src');

		config.plugins.push(new webpack.DefinePlugin({ __DEFINE__: DEFINE }));
		//console.dir(config, { depth: null });

		return config;
	}
};