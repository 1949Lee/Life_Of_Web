/**
 * Created by Lee on 2016/9/28.
 */
var lanTable = angular.module("lanTable", []);
lanTable.controller("lanTableCtrl", function ($scope, $http) {
    $scope.asc = 0;
    $scope.reverse = function () {
        $scope.asc = !$scope.asc;
    };
    $http.get("./tableData.php").success(function ($response) {
        $scope.tableData = $response.language;
        $scope.type = $response.type;
        $scope.type.unshift({id: "", name: "全部",value:""});
        $scope.page = new Array($scope.tableData.length);
        for (i = 0; i < $scope.page.length; i++) {
            $scope.page[i] = 0;
        }
        $scope.page = $scope.page.map(function (currentValue, index) {
            return {id: index + 1, page: index + 1};
        });
        $scope.page.unshift({id: "", page: "全部"});
        console.log($response);
    });
});