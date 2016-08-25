
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
        loadcss : ['./src/loadcss.js','./src/css/a.css'], //将css和js打包到loadcss.js里面
        loadhtml : './src/loadhtml.js',
        alias : './src/alias.js',
        xxx : './src/alias.js'
    },
    output: {  //打包后的输出目录
        path: __dirname+'/bin',
        filename: '[name].js', //[hash] 、[chunkhash](根据内容生成md5值)
        chunkFilename:'[name].chunk.js', //require.ensure用到，生成chunk的名字
        publicPath:'bin/'  //require.ensure用到，相对路径，require.ensure会从publicPath加载文件,不写则默认是当前配置文件目录
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
                warnings: false //压缩时是否显示告警信息
             },
             output: {
                comments: false //压缩后的文件是否有注释
             }
         })
        /*new webpack.optimize.CommonsChunkPlugin({
         name: 'commons', //和配置的entry入口对应
         filename: "commons.js", //输出的文件名
         minChunks: Infinity //指一个文件至少被require几次才会被放到CommonChunk里，这一项一定要设置否则生成的common.js不会包含公共的文件
         // (Modules must be shared between 2 entries)

         // chunks: ["pageA", "pageB"], //只提炼pageA、pageB里的公共文件
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
        extentions:["","js"], //当requrie的模块找不到时，添加这些后缀
        alias : {
            'jquery' : path.join(__dirname, 'src/jquery-1.12.0.min.js') //__dirname当前目录，path.join路径合并
        }
    }
};

/*webpack uglify
vue*/
