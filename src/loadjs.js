/**
 * Created by Administrator on 16-8-21.
 * js加载demo
 */
 var math = require('./math.js'); //commonjs规范，同步加载, 会将math.js打包进主文件（loadjs.js）
 var sum = math.add(1, 2);
 console.log(sum);

/*require(['./math.js'], function(math){ //amd规范， 会生成新的独立的文件，生成的文件名字会以模块id命名（1、2、3等）
    var sum = math.add(1, 2);
    console.log(sum);
});*/

$('#aaa').on('click', function(){
    //require.ensure只会加载文件不会执行，直到回调函数里面require了该模块了才执行
    //如果多个require.ensure需要把公共文件提出来可以用CommonChunkPlugin插件合并公共文件
    require.ensure(['./math3.js'], function(require){  //在需要的时候才下载依赖的模块，[]内为依赖文件没有依赖写空数组，依赖文件不能写在入口配置里面，依赖文件会和回调函数里面的require文件一起打包
        var math3 = require('./math3.js'); //这个时候才执行math3.js
        var math2 = require('./math2.js'); //提前打包好了，点击时才加载，math3.js和math2.js会打包为一个文件math2.chunk.js
        var sum = math2.add(1, 2);
        console.log(sum);
    }, 'math2'); //需指定publicpach,require.ensure会从publicPath加载文件， math2为chunkFilename，指定该chunk的名称，如果这个chunk名已经存在了，则将本次依赖的模块合并到已经存在的chunk中


});