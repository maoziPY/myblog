/**
 * Created by PY on 2016/6/10 0010.
 */
var app = angular.module("myApp", []);

app.controller("myCtrl", function ($scope, $http) {
    $http({

        /*url: "http://localhost:3000/addUser",
         params: {
         "username": "test2",
         "password": "123"
         },*/

        /*url: "http://localhost:3000/deleteUser",
        params: {
            "id": "8"
        },*/

        /*url: "http://localhost:3000/updateUser",
        params: {
            "id": "5",
            "username": "py3",
            "password": "123"
        },*/

        url: "http://localhost:3000/queryById",
        params: {
            "id": "5"
        },
        method: "post"

        /*url: "http://localhost:3000/queryAll",
        params: {

        },
        method: "post"*/
    }).success(function (data) {
        console.log(data);
    }).error(function (data) {
        console.log(data);
    });
});
