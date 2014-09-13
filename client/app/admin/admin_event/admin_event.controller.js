'use strict';

angular.module('integrationApp')
	.controller('AdminEventCtrl', function ($scope, events, Restangular) {
		var	map;
		$scope.$on('mapsInitialized', function (event, maps) {
			map = maps[0];
		});
		$scope.events = events;
		$scope.map = {
			center: [48.89670230000001, 2.3183781999999997],
			zoom: 12
		};

		$scope.setMarker = function (event) {
			$scope.event = {coords: event.latLng};

			if ($scope.marker)
				$scope.marker.setMap(null);

			$scope.marker = new google.maps.Marker({
				position:  event.latLng,
				map: map,
				icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
			});
		};

		$scope.save = function () {
			if (!$scope.event._id) {
				events.post($scope.event).then(function (res) {
					events.push(res);
				});
			}
			else {
				$scope.event.put();
			}
		}
	});
