/**
 * Created by Administrator on 2016/8/22.
 */
//npm install html-loader --save

$('#aaa').on('click', function(){
    require.ensure([], function(require){
        var a = require("./template/temp.html"); //返回html字符串
        console.log(a);
        $('#wrap').html(a);
    }, 'temp');  //webpack打包时会生成一个temp.chunk.js的模块，里面的内容就是需要加载的temp.html

});

//more loaders: http://webpack.github.io/docs/list-of-loaders.html