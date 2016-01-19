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
        plugins: ["transform-object-assign"/*,"transform-es3-member-expression-literals","transform-es3-property-literals",*/]
            // ['transform-es2015-modules-commonjs', { "loose": true }],
            // ['transform-es3-modules-literals', {}]]
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
		'svg': './src/svg/index.js',
    'svg2vml': './src/svg2vml/index.js'
	},
  output: {
		path: './dest',
		filename: 'ykcharts.[name].js',
		library: 'ykcharts',
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
