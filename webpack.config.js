var webpack = require("webpack");
var path = require("path");

module.exports.client = {
	cache: true,
	entry: './src/index.jsx',
	output: {
		path: __dirname,
		filename: "main.js",
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['babel-loader'],
			},
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loaders: ['jsx-loader'],
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
	}
};

module.exports.server = {
	cache: true,
	entry: './src/server.js',
	output: {
		path: __dirname,
		filename: "server.js",
	},
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: ['babel-loader'],
			}
		]
	},
	resolve: {
		extensions: ['', '.js'],
	}
};
