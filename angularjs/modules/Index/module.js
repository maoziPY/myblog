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

    PY.getTemplate(module.name, function(res) {
        // 渲染主模板
        var $master = $(res).find("[tmkey=master]");
        module.container.empty();
        module.container.append($master.html());
    });
};