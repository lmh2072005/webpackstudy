/**
 * Created by Administrator on 16-8-22.
 * 通过webpack --config xxx.js调用不同的config
 */
const webpack = require('webpack'); //webpack
//var ExtractTextPlugin = require("extract-text-webpack-plugin"); //合并独立的css文件插件
var path = require('path');
module.exports = {
    entry: {
        loadjsdemo : './src/loadjs.js'
    },
    output: {
        path: __dirname+'/bin', //绝对路径
        filename: '[name].js',
        chunkFilename:'[name].chunk.js',
        publicPath:'bin/'  //require.ensure用到，相对路径
    },
    /*devServer: {
     historyApiFallback: true,
     hot: true,
     inline: true,
     progress: true
     },*/
    plugins: [
        /*new webpack.optimize.UglifyJsPlugin({
         compress: {
         warnings: false
         },
         output: {
         comments: false
         }
         }),*/
        /*new webpack.optimize.CommonsChunkPlugin({
         name: 'commons',
         filename: "commons.js", //输出的文件名
         minChunks: Infinity
         // (Modules must be shared between 2 entries)

         // chunks: ["pageA", "pageB"],
         // (Only use these entries)
         }),*/
        //new ExtractTextPlugin("[name].css")
    ],
    module:{
        loaders:[
            //{test:/\.css$/,loader:"style-loader!css-loader"}
            //{test:/\.css$/, loader:ExtractTextPlugin.extract("style-loader", "css-loader")}
        ]
    }
};