'use strict';

const controllerModule = angular.module('app.controller',[]);

controllerModule.controller('mainController', ($scope, $http, $filter, $state) => {
  $scope.user = {};
  $scope.users = {};
  $scope.transfer = {};
  $scope.alerts = [];
  $scope.isChangeRecipient = false;
  $scope.frequencies=[{
    id: 1,
    name:'Every Day'
  },{
    id: 2,
    name: 'Every Month'
  },{
    id: 3,
    name: 'Every Year'
  }];

  $scope.closeNotification = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.goInChangeRecipient = () => {
    $scope.isChangeRecipient = !$scope.isChangeRecipient;
  }

  $scope.changeRecipient = (candidate) => {
    $scope.transfer = candidate;
    $scope.goInChangeRecipient();
  }

  $scope.gotoUserProfile = () => {
    $state.go('user',{id: $scope.user.id});
  }

  $scope.submit = (isValid) => {
    if(isValid) {
      $scope.alerts = [...$scope.alerts, { type: 'success', msg: `You successfully transfered ${$filter('currency')($scope.amount)} to ${$scope.transfer.name}` }];
      $scope.transferInfo.$setPristine();
      $scope.amount = '';
      $scope.frequency = '';
    }
  }
  
  $http.get('http://localhost:3000/api/user/KR01').then(r => $scope.user = r.data);
  $http.get('http://localhost:3000/api/user/').then(r => $scope.users = r.data);
  $http.get('http://localhost:3000/api/transfer/DT01').then(r => $scope.transfer = r.data);

});

controllerModule.controller('userController', ($scope, $stateParams, $state, $http) => {
  $scope.userId = $stateParams.id;
  $scope.user={};

  $scope.backToBanking = () => {
    $state.go('home');
  }

  $http.get(`http://localhost:3000/api/user/${$scope.userId}`).then(r => $scope.user = r.data);
});