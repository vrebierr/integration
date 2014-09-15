'use strict';

angular.module('integrationApp')
	.controller('MainCtrl', function ($scope, Socket, coords, events) {
		Socket.on('coord:save', function (data) {
			console.log(data);
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

			// events
			
			// add markers
			for (var i = 0; i < coords.length; i++) {
				var marker = new google.maps.Marker({
					position: new google.maps.LatLng(coords[i].latitude, coords[i].longitude),
					map: map
				});
			}
		};
		google.maps.event.addDomListener(window, 'load', $scope.initialize());

		// watching you
		$scope.marker = new google.maps.Marker();
		navigator.geolocation.watchPosition(function (pos) {
			coords.post({
				coords: pos.coords
			}).then(function (res) {
				coords.push(res);
				$scope.marker.setMap(null);
				$scope.marker = new google.maps.Marker({
					position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
					map: map,
					icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
				});
				Socket.emit('coord:save', res);
			});
		});

		$scope.$on('$destroy', function () {
			socket.unsyncUpdates('coord');
		});
	});
