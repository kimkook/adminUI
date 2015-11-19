angular.module('app.admin')
    .controller('ListTestController', ListTestController);

function ListTestController($http, $scope, $modal, $state) {
    alert('테스트해봅시다.');
}