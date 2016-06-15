/**
 * Created by PY on 2016/6/15 0015.
 */

function Login() {
    var module = this;
    module.container = $("." + arguments[0]); // 模块容器
    module.name = /function\s+(\w+)/.exec(arguments.callee)[1]; // 模板名称
}

Login.prototype.load = function() {
    var module = this;

    // 获取模板
    $.get("http://localhost:3000/getTemplate",
        {moduleName: module.name},
        function (data) {

            // 渲染模板1
            var $tm1 = $(data).find("[tmkey=tm1]");
            module.container.empty();
            module.container.append($tm1.html());



            /*// 渲染模板2
            var $tm2 = $(data).find("[tmkey=tm2]");
            module.container.empty();
            module.container.append($tm2.html());*/
        }, "html");


    // 获取样式
    $.get("http://localhost:3000/getStyle",
        {moduleName: module.name},
        function (res) {
            // 导入css文件
            $("<style></style>").append(
                res
            ).appendTo("head");
        }, "text");
};