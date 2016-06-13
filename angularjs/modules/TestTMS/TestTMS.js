/**
 * Created by PY on 2016/6/11 0011.
 */
function TestTMS() {

}

TestTMS.prototype.load = function () {

    // javascript 原生 --post参数后台无法获取到
   /*     var xmlhttp;
     // 创建 XMLHttpRequest 对象
     try{
     // code for IE7+, Firefox, Chrome, Opera, Safari
     xmlhttp=new XMLHttpRequest();
     }catch(e){
     // code for IE6, IE5
     xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
     }
     // 初始化请求参数
     xmlhttp.open("POST","http://localhost:3000/queryById",true);
     // 发送请求
     xmlhttp.send("id=5");

     xmlhttp.onload = function() {
     console.log(JSON.parse(xmlhttp.response));
     };*/


    // jquery

    $.ajax({
        type: "POST",
        url: "http://localhost:3000/queryById",
        data: "id=5",
        success: function (res) {
            console.log(res);
        }
    });
};