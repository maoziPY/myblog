/**
 * Created by PY on 2016/6/15 0015.
 */

function Login() {
    var module = this;
    module.container = $("." + arguments[0]); // 模块容器
    module.name = /function\s+(\w+)/.exec(arguments.callee)[1]; // 模板名称
}

Login.prototype.load = function () {
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

            // 绑定相关事件
            module.setEvent();
        }, "html");
};

/**
 * setEvent 绑定相关事件
 * */
Login.prototype.setEvent = function () {
    var module = this;

    module.container.find(".submitBtn").click(function () {
            var $this = $(this);
            var username = module.container.find(".username").val();
            var password = module.container.find(".password").val();

            $.ajax({
                type: "post",
                url: "http://localhost:3000/queryByUsername",
                data: {
                    username: username,
                    password: password
                },
                success: function (res) {
                    // 成功
                    if (res.length > 0) {
                        window.open("file:///D:/worspace/myblog/angularjs/view/index/index.html", "_self");
                        /*$(res).each(function () {

                        });*/
                    }
                    // 失败
                    else {
                        alert("请输入正确的用户名或者密码！");
                    }
                }
            });
        }
    );

    module.container.find(".forgetPassword").click(function() {
        alert("不给蠢的人重新设置密码，不谢！");
    });
}
;