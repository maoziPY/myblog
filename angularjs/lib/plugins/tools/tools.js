/**
 * Created by PY on 2016/6/21 0021.
 */
var PY = {};

/**
 * @param moduleName 模块名称
 * @param success 成功的回调方法
 * @param downLoadStyle 是否下载样式，默认下载
 *
 * */
PY.getTemplate = function(moduleName, success, downLoadStyle) {
    // 获取模板
    $.get("http://localhost:3000/getTemplate",
        {moduleName: moduleName},
        function (tm) {
            if(downLoadStyle === false) {
                success(tm);
                return;
            }
            // 获取样式
            $.get("http://localhost:3000/getStyle",
                {moduleName: moduleName},
                function (res) {
                    // 导入css文件
                    $("<style></style>").append(res).appendTo("head");
                    if(success) {
                        success(tm);
                    }

                }, "text");
        }, "html");
};


var SERVER = {};

/**
 *  @param url 请求路径
 *  @param par 请求参数
 *  @param success 成功的回调方法
 * */
SERVER.call = function(url, par, success) {
    $.ajax({
        type: "post",
        url: url,
        data: par,
        success: function(res) {
            if(success) {
                success(res);
            }
        }
    });

    /*$http({
        url: 'http://localhost:8081/',
        params:{
            'username222':'PY',
            "testName" : "PY2"
        },
        method: 'post'
    }).success(function (data, header, config, status) {
        console.log(data);
    }).error(function (data, header, config, status) {
        console.log(data);
    });*/
};