/**
 * Created by PY on 2016/6/14 0014.
 */

/**
 * TestTMS 构造方法
 * */
function TestTMS() {
    var module = this;
    module.container = $("." + arguments[0]); // 模块容器
    module.name = /function\s+(\w+)/.exec(arguments.callee)[1]; // 模板名称
}

/**
 * load 主方法
 * */
TestTMS.prototype.load = function () {
    var module = this;

    // 获取模板
    $.get("http://localhost:3000/getTemplate",
        {moduleName: module.name},
        function (data) {

            // 渲染模板1
            var $tm1 = $(data).find("[tmkey=tm1]");
            module.container.empty();
            module.container.append($tm1.html());

            // 渲染模板2
            var $tm2 = $(data).find("[tmkey=tm2]");
            module.container.empty();
            module.container.append($tm2.html());
        }, "html");
};