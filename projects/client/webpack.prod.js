const webpack = require('webpack');
const WebpackMerge = require('webpack-merge');
const base = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HTMLWebpackPlugin = require('html-webpack-plugin');
const getDefine = require('./define');

const doAnalyze = !!process.env['PROD_ANALYZE'];

module.exports = async () => {

	const DEFINE = await getDefine(false, false);

	return WebpackMerge.merge(base.base, {
		mode: 'production',

		output: {
			// https://webpack.js.org/guides/caching/
			filename: '[name].[contenthash].js',
		},

		optimization: {
			moduleIds: 'hashed',
			minimize: true,
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
		},

		stats: {
			assets: true,
			assetsSort: '!size'
		},

		plugins: [
			new webpack.DefinePlugin({ __DEFINE__: DEFINE }),
			// Change the module id (unique identifier) to go by path instead of number, so hash names change less often.
			new webpack.HashedModuleIdsPlugin(),
			new HTMLWebpackPlugin(base.html),
			new BundleAnalyzerPlugin({
				analyzerMode: 'disabled', // Don't open the server automatically
				generateStatsFile: doAnalyze // Create a stats file
			})
		]
	});
};