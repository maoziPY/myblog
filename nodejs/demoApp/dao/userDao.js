/**
 * Created by PY on 2016/6/10 0010.
 */
// 实现与MySQL交互
var mysql = require("mysql");
var $conf = require("../conf/db");
/*??*/
var $util = require("../util/util");
/*??*/
var $sql = require("./userSqlMapping");

// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql);

// 向前台返回JSON方法的简单封闭
var jsonWrite = function (res, ret) {
    if (typeof ret === "undefined") {
        res.json({
            code: "0",
            msg: "操作失败"
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            // 获取前台页面传过来的参数
            var param = req.query || req.params;

            // 建立连接，向表中插入值
            // "INSERT INTO user(id, username, password) VALUES(0, ?, ?)"
            connection.query($sql.insert, [param.username, param.password], function (err, result) {
                if (result) {
                    result = {
                        code: 200,
                        msg: "增加成功"
                    };
                }

                // 以json形式，把操作结果返回给前台页面
                jsonWrite(res, result);

                //释放连接
                connection.release();
            });
        });
    },
    delete: function (req, res, next) {
        // delete by Id
        pool.getConnection(function (err, connection) {
            var id = +req.query.id;
            connection.query($sql.delete, id, function (err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    update: function (req, res, next) {
        // update by id
        // 为了简单，要求同时传username和password两个参数
        var param = req.query;
        if (param.username == null || param.password == null || param.id == null) {
            jsonWrite(res, undefined);
            return;
        }

        pool.getConnection(function (err, connection) {
            connection.query($sql.update, [param.username, param.password, +param.id], function (err, result) {

                if (result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg: '更新成功'
                    };
                } else {
                    result = void 0;
                }

                jsonWrite(res, result);
                connection.release();
            });
        });

    },
    queryById: function (req, res, next) {
        var id = +req.query.id || req.body.id || req.params.id; // 为了拼凑正确的sql语句，这里要转下整数
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryById, id, function (err, result) {
                jsonWrite(res, result);
                connection.release();

            });
        });
    },
    queryAll: function (req, res, next) {
        pool.getConnection(function (err, connection) {
            connection.query($sql.queryAll, function (err, result) {
                jsonWrite(res, result);
                console.log(result);
                connection.release();
            });
        });
    },

    queryByUsername: function(req, res, next) {
        var username = req.body.username || req.query.username;
        var password = req.body.password || req.query.password;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryByUsername, [username, password], function(err, result) {
                jsonWrite(res, result);
                connection.release();
            })
        })
    }
};

/**
 * tips
 * req.param获取pathinfo中参数 /api/users/{id}
 * req.query获取查询参数 /api/users?name=wwx
 * req.body获取form提交参数
 * */