
/**
 * Created by Administrator on 16-8-22.
 * 通过webpack --config xxx.js调用不同的config
 * webpack 把所有的资源都当成了一个模块, CSS,Image, JS 字体文件等
 * https://webpack.github.io/
 */
const webpack = require('webpack'); //webpack
var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    entry: { //入口文件，这里配置的文件
        loadjs : './src/loadjs.js',
        loadimg : './src/loadimg.js',
        loadcss : ['./src/loadcss.js','./src/css/a.css'], //将css和js打包到loadcss.js里面
        loadhtml : './src/loadhtml.js',
        alias : './src/alias.js',
        xxx : './src/alias.js'
    },
    output: {  //打包后的输出目录
        path: __dirname+'/bin',
        filename: '[name]-[chunkhash].js', //[hash] 、[chunkhash](根据内容生成md5值)
        chunkFilename:'[name].chunk.js', //require.ensure用到，生成chunk的名字
        publicPath:'bin/'  //require.ensure用到，相对路径，require.ensure会从publicPath加载文件
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
             compress: {
                warnings: false //压缩时是否显示告警信息
             },
             output: {
                comments: false //压缩后的文件是否有注释
             }
         }),
        new webpack.optimize.CommonsChunkPlugin({
             name: 'commons', //和配置的entry入口对应
             filename: "commons.js", //输出的文件名
             minChunks: Infinity //指一个文件至少被require几次才会被放到CommonChunk里，这一项一定要设置否则生成的common.js不会包含公共的文件
             // chunks: ["pageA", "pageB"], //只提炼pageA、pageB里的公共文件
         }),
        new htmlWebpackPlugin({
            filename: '../index2.html', //相对于output.path,产出路径。
            inject: true, //true/body为插到/body前面
            template: 'src/template/index.html',  //模版文件，相对于config文件路径
            chunks:['loadjs','loadcss'], //需要引入哪些块
            chunksSortMode:'dependency' //引入块的排序，默认为auto, 改为dependency按照引入块数组顺序引入
        }),
        new htmlWebpackPlugin({
            filename: '../index2.html', //相对于output.path,产出路径。
            inject: true, //true/body为插到/body前面
            template: 'src/template/index.html',  //模版文件，相对于config文件路径
            chunks:['loadjs','loadcss'], //需要引入哪些块
            chunksSortMode:'dependency' //引入块的排序，默认为auto, 改为dependency按照引入块数组顺序引入
        })  //多个页面需要new多个htmlWebpackPlugin实现

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
        ]
    }
};
