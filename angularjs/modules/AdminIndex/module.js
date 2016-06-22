/**
 * Created by PY on 2016/6/22 0022.
 */
function AdminIndex() {
    var module = this;
    module.container = $("." + arguments[0]); // 模块容器
    module.name = /function\s+(\w+)/.exec(arguments.callee)[1]; // 模板名称
}

AdminIndex.prototype.load = function() {
    var module = this;
    PY.getTemplate(module.name, function(tm) {
        // 渲染主模板
        var $master = $(tm).find("[tmkey=master]");
        module.container.empty();
        module.container.append($master.html());

        var $adHeard = $(tm).find("[tmkey=adHeard]"); // 头模板
        var $adMenu = $(tm).find("[tmkey=adMenu]"); // 菜单模板
        var $adMenuDetail = $(tm).find("[tmkey=adMenuDetail]"); // 菜单详情模板

        var heardContainer = module.container.find(".adHeard");
        var menuContainer = module.container.find(".adMenu");
        var menudetContainer = module.container.find(".adMenuDetail");


        heardContainer.empty();
        heardContainer.append($adHeard.html());

        menuContainer.empty();
        menuContainer.append($adMenu.html());

        menudetContainer.empty();
        menudetContainer.append($adMenuDetail.html());


        menuContainer.find(".menu ul li").menu();


    });
};