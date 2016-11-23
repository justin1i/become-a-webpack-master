const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const validate = require('webpack-validator');
const parts = require('./libs/parts');
const pkg = require('./package.json');

const PATHS = {
	app: path.join(__dirname, 'app'),
	style: [
		path.join(__dirname, 'node_modules', 'purecss'),
		path.join(__dirname, 'app', 'main.css')
	],
	build: path.join(__dirname, 'build')
};

const common = {
	entry: {
		style: PATHS.style,
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Webpack demo'
		})
	],
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			include: PATHS.app,
			loader: 'babel',
			query: {
				cacheDirectory: true //,
					//presets: ['es2015', 'react']
			}
		}]
	}
};

var config;
const TARGET = process.env.npm_lifecycle_event;
switch (TARGET) {
	case 'build':
	case 'stats':
		process.env.BABEL_ENV = TARGET;
		config = merge(
			common, {
				devtool: 'source-map',
				output: {
					path: PATHS.build,
					filename: '[name].[chunkhash].js',
					chunkFilename: '[chunkhash].js' // 用于require.ensure
				},
				resolve: {
					alias: {
						"react": "react-lite",
						"react-dom": "react-lite"
					}
				}
			},
			parts.clean(PATHS.build),
			parts.setFreeVariable('process.env.NODE_ENV', 'production'),
			parts.extractBundle({
				name: 'vendor',
				//entries: Object.keys(pkg.dependencies)
				entries: ['react']
			}),
			parts.minify(),
			parts.extractCSS(PATHS.style),
			parts.purifyCSS(PATHS.style)
		);
		break;
	default:
		config = merge(
			common, {
				devtool: 'eval-source-map'
			},
			parts.setupCSS(PATHS.style),
			parts.devServer({
				host: process.env.HOST,
				port: process.env.PORT
			})
		);
}

module.exports = validate(config, {
	quiet: true
});