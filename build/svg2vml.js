var webpack = require('webpack');
var conf = require('./webpack.config.svg2vml.js');

console.log('Compiling......');

(webpack(conf)).run(function(err,stats){
  if(!err){
    console.log("Compile successfully!");
  }
});
