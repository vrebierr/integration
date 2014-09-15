'use strict';

angular.module('integrationApp')
	.controller('MainCtrl', function ($scope, socket) {
		$scope.map = {
			center: {
				latitude: 48.89670230000001,
				longitude: 2.3183781999999997
			},
			zoom: 12
		};

		$scope.markers = [
			{coords: [48.8967117, 2.3184350]},
			{coords: [48.8967120, 2.4184390]}
		];

		navigator.geolocation.watchPosition(function (pos) {
			$scope.currentPosition = pos;
			console.log(pos);
			$scope.markers.push({coords: {latitude: pos.coords.latitude, longitude: pos.coords.longitude}})
		});
	});
