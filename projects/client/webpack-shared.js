// @ts-check
// Note: @types/webpack is installed to ensure webpack 5 types are used in js type checking.
const path = require('path');
const webpack = require('webpack');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const getDefine = require('./define');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isDevelopment = !envToBool('PROD');
const isCosmos = !envToBool('COSMOS');
const isBundleAnalysis = envToBool('ANALYZE');

function envToBool(variableName) {
	const variable = process.env[variableName] || process.env[variableName.toLowerCase()];
	if (!variable) {
		return false;
	}
	return variable.toLowerCase() === 'true';
}

/**
 * @typedef { import('webpack').Configuration } Configuration
 */

/**
 * Creates the webpack config for three scenarios:
 * - Development (testing with development server)
 * - React Cosmos (development)
 * - Deploy (production, possibly with bundle analysis)
 */
module.exports = async () => {

	console.log([
		isDevelopment ? 'Development' : 'Production',
		isCosmos ? 'Cosmos' : '',
		isBundleAnalysis ? 'Bundle Analysis' : ''
	].filter(x => !!x).join(', '));

	/** @type { Configuration['mode'] } */
	const mode = isDevelopment ? 'development' : 'production';
	/** @type { Configuration['devtool'] } */
	const devtool = isDevelopment ? 'source-map' : false;

	/** @type { Configuration['entry'] } */
	const entry = {
		index: './src/entry/entry-index.tsx'
	};
	/** @type { Configuration['output'] } */
	const output = {
		filename: isDevelopment ? '[name].js' : '[name].[contenthash].js',
		hashDigestLength: 10,
		path: path.resolve(__dirname, './dist')
	};

	/** @type { Configuration['stats'] } */
	const stats = {
		assets: true,
		assetsSort: '!size'
	};

	/** @type { Configuration['resolve'] } */
	const resolve = {
		// Add '.ts' and '.tsx' as resolvable extensions (so that you don't need to type out the extension yourself).
		extensions: ['.ts', '.tsx', '.js', '.json'],

		alias: {
			'@': path.resolve(__dirname, './src')
		},

		// See https://webpack.js.org/configuration/resolve/#resolve
		/*
			Discussion on symlinks:
			https://github.com/webpack/webpack/issues/554
			https://github.com/webpack/webpack/issues/985
			(MIT) https://github.com/niieani/webpack-dependency-suite/blob/master/plugins/root-most-resolve-plugin.ts
			https://github.com/npm/npm/issues/14325#issuecomment-285566020
			https://stackoverflow.com/a/57231875

			The gist: Only one copy of a package will be used,
			unless the package versions are different.
		*/
		symlinks: false,
		modules: [path.resolve('node_modules')]
	};

	const compilerOptions = isCosmos ? ({
		sourceMap: true,
		declaration: false,
		declarationMap: false,
		skipLibCheck: true,
		incremental: false
	}) : undefined;

	/** @type { Configuration['module'] } */
	const module = {
		rules: [
			{
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
							onlyCompileBundledFiles: !isCosmos, // Keep the default of false in Cosmos, or build time will double.
							transpileOnly: false, // Set to true to test speed without type-checking.
							compilerOptions: compilerOptions
						}
					}
				]
			},
			{
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
			},
			{
				test: /\.(png|jpg|gif)$/i,
				use: [
					{
						loader: 'url-loader'
					}
				]
			}
		]
	};

	/** @type {any} */
	const cleanWebpackPlugin = new CleanWebpackPlugin();
	/** @type {any} */
	const copyPlugin = new CopyPlugin({
		patterns: [
			// Copy to output folder, but then go one up
			{ from: 'src/static/favicons', to: './' },
			{ from: 'src/static/images', to: './' }
		]
	});

	const DEFINE = await getDefine(isDevelopment, isCosmos);
	/** @type {any} */
	const definePlugin = new webpack.DefinePlugin({ __DEFINE__: DEFINE });
	/** @type {any} */
	const htmlPlugin = new HTMLWebpackPlugin({
		filename: './index.html',
		template: './src/index.template.ejs',
		minify: false,
		xhtml: true, // Use XHTML-compliance
	});

	/** @type {any} */
	const bundleAnalyzerPlugin = new BundleAnalyzerPlugin({
		analyzerMode: 'disabled', // Don't open the server automatically
		generateStatsFile: isBundleAnalysis // Create a stats file
	});

	/////////////////////////////////////////////////
	// Set configuration
	/////////////////////////////////////////////////

	/** @type { Configuration } */
	let config = {};

	if (!isDevelopment) {
		// Production
		config = {
			mode,
			devtool,
			entry,
			output,
			resolve,
			module,
			plugins: [
				cleanWebpackPlugin,
				copyPlugin,
				definePlugin,
				htmlPlugin,
				bundleAnalyzerPlugin
			]
		};
	}
	else if (!isCosmos) {
		// Development
		config = {
			mode,
			devtool,
			entry,
			output,
			resolve,
			module,
			plugins: [
				cleanWebpackPlugin,
				copyPlugin,
				definePlugin,
				htmlPlugin
			]
		};
	}
	else {
		// Development
		config = {
			mode,
			devtool,
			// No entry
			// No output
			resolve,
			module,
			plugins: [
				definePlugin
			]
		};
	}

	return config;
};