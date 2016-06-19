/**
 * Created by PY on 2016/6/19 0019.
 */
function Index() {
    var module = this;
    module.container = $("." + arguments[0]); // 模块容器
    module.name = /function\s+(\w+)/.exec(arguments.callee)[1]; // 模板名称
}

Index.prototype.load = function () {
    var module = this;

    // 获取模板
    $.get("http://localhost:3000/getTemplate",
        {moduleName: module.name},
        function (data) {

            // 获取样式
            $.get("http://localhost:3000/getStyle",
                {moduleName: module.name},
                function (res) {
                    // 导入css文件
                    $("<style></style>").append(
                        res
                    ).appendTo("head");
                }, "text");

            // 渲染主模板
            var $master = $(data).find("[tmkey=master]");
            module.container.empty();
            module.container.append($master.html());

        }, "html");
};