var webpack = require('webpack');
var conf = require('./webpack.config.svg.js');

console.log('Compiling dotocharts......');

(webpack(conf)).run(function(err,stats){
  if(!err){
    console.log("Compile successfully!");
  }
});
