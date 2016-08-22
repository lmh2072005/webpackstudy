/**
 * Created by aaronmhliu on 2016/8/22.
 */
//The url loader works like the file loader, but can return a Data Url if the file is smaller than a limit.https://github.com/webpack/url-loader

//小于10k的图片将返回base64编码，否则将返回打包生成的路径, url?limit=10240可以在config文件里配置好
var a = require("url?limit=10240!./image/a.png");
console.log(a);
$('#img').attr('src',a);

$('#aaa').on('click', function(){
    var b = require('url?limit=10000!./image/b.png');
    console.log(b);
    $('#img').attr('src',b);
});

$('#qq').on('click', function(){
    var b = require('url?limit=10000!./image/qq.png');
    console.log(b);
    $('#img').attr('src',b);
});