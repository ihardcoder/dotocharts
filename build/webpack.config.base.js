var path = require('path');
var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel',
      query: {
        presets: ['es2015','stage-0','react']
      }
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  },
  entry: {
		'ykcharts': './src/index.js'
	},
  output: {
		path: './dest',
		filename: '[name].charts.js',
		library: 'ykcharts',
    libraryTarget: 'umd',
    umdNamedDefine: true
	},
  resolve: {
    root: path.join(__dirname, '/src'),
    extensions: ['', '.js', '.css', '.scss'],
    modulesDirectories: ["node_modules"]
  },
  plugins: []
};
