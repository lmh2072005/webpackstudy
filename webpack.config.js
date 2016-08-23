
/**
 * Created by Administrator on 16-8-22.
 * 通过webpack --config xxx.js调用不同的config
 * webpack 把所有的资源都当成了一个模块, CSS,Image, JS 字体文件等
 * https://webpack.github.io/
 */
const webpack = require('webpack'); //webpack
var ExtractTextPlugin = require("extract-text-webpack-plugin"); //合并独立的css文件插件
var path = require('path');
module.exports = {
    entry: {
        loadjs : './src/loadjs.js',
        loadimg : './src/loadimg.js',
        loadcss : ['./src/loadcss.js','./src/css/a.css'], //将css和js打包到loadcssdemo.js里面
        loadhtml : './src/loadhtml.js',
        alias : './src/alias.js'
    },
    output: {  //打包后的输出目录
        path: __dirname+'/bin',
        filename: '[name].js', //[hash] 、[chunkhash](根据内容生成md5值)
        chunkFilename:'[name].chunk.js', //require.ensure用到，生成chunk的名字
        publicPath:'bin/'  //require.ensure用到，相对路径
    },
    devtool: "#source-map",  //生成对应的map文件, map文件解释：http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html
    /*devServer: {
     historyApiFallback: true,
     hot: true,
     inline: true,
     progress: true
     },*/
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
             compress: {
                warnings: false
             },
             output: {
                comments: false
             }
         }),
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
            {
                test: /\.png$/,
                loader: "url-loader?limit=10240"
            },
            {
                test:/\.css$/,
                loader:"style-loader!css-loader"  //针对.css文件用2个加载器预处理(!号隔开多个加载器)
            },
            {
                test: /\.html$/,
                loader: "html"
            }
            //{test:/\.css$/, loader:ExtractTextPlugin.extract("style-loader", "css-loader")}
        ]
    },
    resolve :{
        alias : {
            'jquery' : path.join(__dirname, 'src/jquery-1.12.0.min.js') //__dirname当前目录，path.join路径合并
        }
    }
};