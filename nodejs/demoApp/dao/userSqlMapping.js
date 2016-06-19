/**
 * Created by PY on 2016/6/10 0010.
 */
//CRUD SQL语句
var user = {
    insert: "INSERT INTO user(id, username, password) VALUES(0, ?, ?)",
    update: "update user set username=?, password=? where id=?",
    delete: "delete from user where id=?",
    queryById: "select * from user where id=?",
    queryAll: "select * from user",
    queryByUsername: "select * from user where username=? and password=?"
};

module.exports = user;