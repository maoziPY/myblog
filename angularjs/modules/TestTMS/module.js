/**
 * Created by PY on 2016/6/14 0014.
 */

function TestTMS() {
    var module = this;
    module.container = $("." + arguments[0]);
    module.name = /function\s+(\w+)/.exec(arguments.callee)[1]
}

TestTMS.prototype.load = function () {
    var module = this;

    // 获取模板
    $.get("http://localhost:3000/getTemplate",
        {moduleName: module.name},
        function (data) {
            module.container.empty();
            module.container.append(data);
        }, "html");
};