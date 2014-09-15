'use strict';

angular.module('integrationApp')
	.controller('MainCtrl', function ($scope, socket) {
		// maps
		var map;
		$scope.initialize = function () {
			// init map
			var mapOptions = {
				zoom: 12,
				center: new google.maps.LatLng(48.89670230000001, 2.3183781999999997)
			};
			map = new google.maps.Map(document.getElementById('map'), mapOptions);

			// events
			$scope.marker = new google.maps.Marker();
		};
		google.maps.event.addDomListener(window, 'load', $scope.initialize());

		// watching you
		navigator.geolocation.watchPosition(function (pos) {
			$scope.marker.setMap(null);
			$scope.marker = new google.maps.Marker({
				position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
				map:map
			});
		});
	});
