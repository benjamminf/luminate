var path = require('path')

module.exports = {
	devtool: 'source-map',
	entry: './src/main.js',
	output: {
		path: './dist/',
		filename: 'luminate.js'
	},
	module: {
		loaders: [
			{
				loader: 'babel',
				test: /\.jsx?$/,
				exclude: /node_modules/,
				query: {
					presets: ['es2015']
				}
			}
		]
	}
}
