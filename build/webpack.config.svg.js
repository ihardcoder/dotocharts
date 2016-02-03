var path = require('path');
var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel',
      query: {
        presets: ['es2015','stage-0','react'],
        plugins: ["transform-object-assign"]
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
		'charts': './src/index.js'
	},
  output: {
		path: './dest',
		filename: 'doto.[name].js',
		library: 'dotocharts',
    libraryTarget: 'umd',
    umdNamedDefine: true
	},
  resolve: {
    root: path.join(__dirname, '/src'),
    extensions: ['', '.js', '.css', '.scss'],
    modulesDirectories: ["node_modules"]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
  })]
};
