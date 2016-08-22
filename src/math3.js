/**
 * Created by Administrator on 16-8-21.
 */
//3种定义支持
function add3(a, b){
    return a + b;
}
alert('math3');
module.exports = {
    add3 : add3
};

/*
 //amd规范
 define('math', function(){
 function add(a, b){
 return a + b;
 }
 return {
 add : add
 };
 })*/
//cmd规范
/*
 define(function(require, exports, module) {

 function add(a, b){
 return a + b;
 }
 module.exports = {
 add : add
 };
 });*/
