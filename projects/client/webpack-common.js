/*
	Common between webpack and Storybook.
*/

// @ts-check
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

/**
 * @param {any} webpackConfig
 * @param {boolean} isDevelopment
 * @param {boolean} isStorybook
 * */
module.exports = function updateWebpackConfig(webpackConfig, isDevelopment, isStorybook) {

	const compilerOptions = isStorybook ? ({
		sourceMap: true,
		declaration: false,
		declarationMap: false,
		skipLibCheck: true,
		incremental: false
	}) : undefined;

	const typeScriptBabelRule = {
		test: /\.tsx?$/,
		exclude: /node_modules/,
		use: [
			{
				loader: 'babel-loader',
				options: {
					presets: [['@babel/preset-env', { debug: false, targets: '> 2%, not ie <= 11' }], '@babel/preset-react'],
					// Cache won't work, since it's part of the webpack pipeline.
					cacheDirectory: false,
					cacheCompression: false
				}
			},
			{
				loader: 'ts-loader',
				options: {
					getCustomTransformers: () => ({ before: [createStyledComponentsTransformer()] }),
					onlyCompileBundledFiles: false, // Keep the default of false, or build time will double.
					transpileOnly: false, // Set to true to test speed without type-checking.
					compilerOptions: compilerOptions
				}
			}
		]
	};

	const svgRule = {
		// IF YOU CHANGE THIS SECTION, also update the storybook config.
		test: /\.svg$/,
		use: [
			{
				loader: '@svgr/webpack',
				options: {
					replaceAttrValues: { '#000': 'currentColor' },
					dimensions: false,
					svgoConfig: {
						plugins: {
							// Stops colors and heights from being removed.
							removeViewBox: false,
							removeUselessStrokeAndFill: false,
							removeUnknownsAndDefaults: false
						}
					}
				}
			}
		]
	};

	const urlRule = {
		test: /\.(png|jpg|gif)$/i,
		use: [
			{
				loader: 'url-loader'
			}
		]
	};

	webpackConfig.module.rules = [typeScriptBabelRule, svgRule, urlRule];
};