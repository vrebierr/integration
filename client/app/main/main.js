'use strict';

angular.module('integrationApp')
	.config(function ($stateProvider) {
		$stateProvider
			.state('main', {
				url: '/',
				templateUrl: 'app/main/main.html',
				controller: 'MainCtrl',
				authenticate: true,
				resolve: {
					events: function (Restangular) {
						return Restangular.all('events').getList();
					}
				}
			});
	});