'use strict';

angular.module('integrationApp')
	.controller('AdminEventCtrl', function ($scope, events, Restangular) {
		$scope.events = events;
		$scope.map = {
			center: [48.89670230000001, 2.3183781999999997],
			zoom: 12
		};
	});
