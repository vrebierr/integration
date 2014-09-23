'use strict';

angular.module('integrationApp')
	.controller('MainCtrl', function ($scope, socket, events, Auth, Restangular) {

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
			Restangular.all('coords').getList().then(function (coords) {
				$scope.coords = coords;
				console.log(coords);
				_.forEach(coords, function (coord) {
					if (Auth.getCurrentUser().coord == coord._id) {
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(coord.latitude, coord.longitude),
							map: map,
							icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
						});
					} else {
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(coord.latitude, coord.longitude),
							map: map
						});
					}
					markers.push({id: coord._id, marker: marker});
				});
			});

			var index;
			socket.syncUpdates('coord', [], function (event, item, array) {
				index = markers.map(function (e) { return e.id }).indexOf(item._id);
				if (index == -1) {
					if (Auth.getCurrentUser().coord == item._id) {
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(item.latitude, item.longitude),
							map: map,
							icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
						});
					} else {
						var marker = new google.maps.Marker({
							position: new google.maps.LatLng(item.latitude, item.longitude),
							map: map
						});
					}
					markers.push({id: item._id, marker: marker});
				} else {
					markers[index].marker.setPosition(new google.maps.LatLng(item.latitude, item.longitude));
				}
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

				});
			});
		});

		$scope.$on('$destroy', function () {
			socket.unsyncUpdates('coord');
		});
	});
