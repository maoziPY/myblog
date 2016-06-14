/**
 * Created by PY on 2016/6/10 0010.
 */
var express = require("express");
var userDao = require("./dao/userDao");
var app = express();

var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false}));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.post("/addUser", function(req, res, next) {
    userDao.add(req, res, next);
});

app.post("/deleteUser", function(req, res, next) {
    userDao.delete(req, res, next);
});

app.post("/updateUser", function(req, res, next) {
    userDao.update(req, res, next);
});

app.post("/queryById", function(req, res, next) {
    userDao.queryById(req, res, next);
});

app.post("/queryAll", function(req, res, next) {
    userDao.queryAll(req, res, next);
});

// 获取模板
app.get('/getTemplate', function (req, res) {
    res.sendFile("D:\\worspace\\myblog\\angularjs\\modules\\"+ req.query.moduleName +"\\template.html");
});

/*app.listen(3000); 简单方式*/

var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});