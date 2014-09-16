'use strict';

angular.module('integrationApp')
	.controller('MainCtrl', function ($scope, socket, coords, events, Auth, Restangular, $http) {
		$scope.coords = [];
		$http.get('/api/coords/').success(function (data) {
			$scope.coords = data;
		});

		// maps
		var map;
		$scope.initialize = function () {
			// init map
			var mapOptions = {
				zoom: 12,
				center: new google.maps.LatLng(48.89670230000001, 2.3183781999999997)
			};
			map = new google.maps.Map(document.getElementById('map'), mapOptions);

			// add markers
			var markers = [];
			socket.syncUpdates('coord', $scope.coords, function (event, item, array) {
				for (var i = 0; i < markers.length; i++) {
					markers[i].setMap(null);
				}
				markers = [];

				for (var i = 0; i < array.length; i++) {
					if (Auth.getCurrentUser().coord != array[i]._id)
					{
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(array[i].latitude, array[i].longitude),
							map: map,
						});
						markers.push(marker);
					}
				}
				console.log(array);
			});
		};
		google.maps.event.addDomListener(window, 'load', $scope.initialize());

		// watching you
		$scope.marker = new google.maps.Marker();
		Restangular.one('coords', Auth.getCurrentUser().coord).get().then(function (coord) {
			navigator.geolocation.watchPosition(function (pos) {
				coord.latitude = pos.coords.latitude;
				coord.longitude = pos.coords.longitude;
				coord.accuracy = pos.coords.accuracy;
				coord.put().then(function (res) {
					$scope.marker.setMap(null);
					$scope.marker = new google.maps.Marker({
						position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
						map: map,
						icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
					});
				});
			});
		});

		$scope.$on('$destroy', function () {
			socket.unsyncUpdates('coord');
		});
	});
