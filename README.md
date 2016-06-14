# myblog
个人博客

架构： angularjs + nodejs(express) + mysql

    * nodejs提供路由、CRUD等服务端操作，渲染工作交与angularjs

文档结构

    *angularjs主要提供三个目录，lib（插件），view（入口html文件），module（模块化，支持多模板）
    
      *结构如下： lib
              
                  module
                    
                    -testTMS（模块名称）
                    
                      -module.js
                      
                      -template.html（模板）
                  
                  view
                  
                    -testTMS
                      
                      -detail.html
                      
                      -list.html
                      
## 入口文件例子（detail.html）
    
``` javascript

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>testTMS</title>
    <script src="../../lib/angular.min.js"></script>
    <script src="../../lib/jquery/jquery.js"></script>
    <script src="../../modules/TestTMS/module.js"></script>
</head>
<body>
<script>
    $(document).ready(function() {
        new TestTMS("main").load();
    });
</script>
<div class="main">testTMS</div>
<div id="links"></div>
</body>
</html>

```

## 模块文件例子（module.js）

``` javascript

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

```

## 模板文件例子（template.html）

```javascript

<tms>
    <tm tmkey="tm1">
        <div>这是我的tm1</div>
    </tm>
    <tm tmkey="tm2">
        <div>这是我的tm2</div>
    </tm>
</tms>


```

## 获取模板路由部分

```javascirpt

// 获取模板
app.get('/getTemplate', function (req, res) {
    res.sendFile("D:\\worspace\\myblog\\angularjs\\modules\\"+ req.query.moduleName +"\\template.html");
});

```
