/**
 * Created by PY on 2016/6/22 0022.
 */
function AdminIndex() {
    var module = this;
    module.container = $("." + arguments[0]); // 模块容器
    module.name = /function\s+(\w+)/.exec(arguments.callee)[1]; // 模板名称
}

AdminIndex.prototype.load = function () {
    var module = this;
    /*var app = angular.module("md", []);
     app.controller("mdCtrl", function ($scope, $http) {
     $http.post("http://localhost:3000/queryAll").then(function(response) {
     $("body").html('<div">{{rows}}</div>');
     $scope.rows = "1111";
     /!* /!*$scope.myWelcome = response.data;*!/
     var tm = '<div> ' +
     '<div data-example-id="contextual-table" class="listBlock">' +
     '<table class="table table-hover">' +
     '<thead>' +
     '<tr>' +
     '<th>序号</th>' +
     '<th>用户名</th>' +
     '<th>密码</th>' +
     '<th>操作</th>' +
     '</tr>' +
     '</thead>' +
     '<tbody>' +
     '<tr class="active" ng-repeat="x in rows">' +
     '<th>{{x}}</th>' +
     '<td>{{x}}</td>' +
     '<td>{{x}}</td>' +
     '<td>管理 删除</td>' +
     '</tr>' +
     '</tbody>' +
     '</table>' +
     '</div>' +
     '</div>';
     $("body").prepend(tm);*!/

     });

     });*/
    /* return;
     app.controller("mdCtrl", function ($scope) {

     /!*var app = angular.module("md", []);
     app.controller("mdCtrl", function ($scope) {*!/
     $scope.rows = ["1", "2", "3"];
     return;*/
    PY.getTemplate(module.name, function (tm) {

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

        // 用户账号密码
        SERVER.call("http://localhost:3000/queryAll",
            {},
            function (res) {
                var app = angular.module("md", []);
                app.controller("mdCtrl", function ($scope) {
                    $scope.rows = ["1", "2", "3"];
                });
            }
        );


        menuContainer.find(".menu ul li").menu();


    });

}