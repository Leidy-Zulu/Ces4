var app = angular.module("app", []);
 
app.controller("appController", function ($scope, $http) {
   //vamos a hacer uso de $http para obtener los datos
   $http.get('json/data.json').success(function (data) {
   //enviamos los datos a la vista con el objeto $scope
   $scope.datos = data;
 });
})
