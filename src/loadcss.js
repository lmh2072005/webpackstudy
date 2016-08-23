/**
 * Created by Administrator on 2016/8/22.
 */
//npm install css-loader --save
//npm install style-loader --save

var a = require("./css/a.css");  //a.css文件会打包到当前js文件，页面加载的时候会js会把样式内容以style的形式写到head里面


$('#aaa').on('click', function(){
    require.ensure([], function(require){  //点击时加载生成的css.chunk.js文件，并将css内容写到head里面
        var a = require("./css/b.css");
        console.log(a);
    }, 'css');
});

$('#qq').on('click', function(){
    require.ensure([], function(require){
        var a = require("./css/a.css"); //发现a.css已经打包了，不会多次打包，即使写的chunk名字不一样
        console.log(a);
    }, 'css2');
});

//如果要生成独立的css文件需要用 extract-text-webpack-plugin