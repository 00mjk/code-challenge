'use strict';

const app = angular.module('app', [
  'ui.router',
  'app.controller'
]);

app.config(($stateProvider, $urlRouterProvider) => {

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'templates/base.html'
  });

  $stateProvider.state('user', {
    url: '/user/:id',
    templateUrl: 'templates/user.html'
  });

  $urlRouterProvider.when('','/');
});

app.filter('_', () => {
  return function () {
    const input = arguments[0];
    const method = arguments[1];
    return _[method].apply(null, [input]);
  };
});
