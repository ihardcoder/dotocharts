var path = require('path');
var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: [/node_modules/],
      loader: 'babel',
      query: {
        presets: ['es2015','stage-0'],
        plugins: ["transform-es5-property-mutators","transform-object-assign","transform-es3-member-expression-literals","transform-es3-property-literals",
            ['transform-es2015-modules-commonjs', { "loose": true }],
            ['transform-es3-modules-literals', {}]]
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
    'svg2vml': ['es5-shim','es5-shim/es5-sham','./src/svg2vml/index.js']
	},
  output: {
		path: './dest',
		filename: 'dotocharts.[name].js',
		library: 'dotocharts',
    libraryTarget: 'umd',
    umdNamedDefine: true
	},
  resolve: {
    root: path.join(__dirname, '/src'),
    extensions: ['', '.js', '.css', '.scss'],
    modulesDirectories: ["node_modules"]
  }
};
