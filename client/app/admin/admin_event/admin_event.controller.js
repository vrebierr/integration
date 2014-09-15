'use strict';

angular.module('integrationApp')
	.controller('AdminEventCtrl', function ($scope, events, Restangular) {
		$scope.events = events;
		$scope.event = {};
		
		$scope.save = function () {
			if (!$scope.event._id) {
				events.post($scope.event).then(function (res) {
					events.push(res);
				});
			}
			else {
				$scope.event.put();
			}
		};

		// maps
		var map;
		$scope.initialize = function () {
			// init map
			var mapOptions = {
				zoom: 12,
				center: new google.maps.LatLng(48.89670230000001, 2.3183781999999997)
			};
			map = new google.maps.Map(document.getElementById('map'), mapOptions);

			// search bar
			var	input = document.getElementById('search');
			map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
			var	search = new google.maps.places.SearchBox(input);

			// events
			$scope.marker = new google.maps.Marker();
			google.maps.event.addListener(map, 'click', function (event) {
				$scope.marker.setMap(null);
				$scope.marker = new google.maps.Marker({
					position: event.latLng,
					map:map,
					icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
				});
				console.log($scope.marker.getPosition());
				$scope.event.coords = event.latLng;
			});

			google.maps.event.addListener(search, 'places_changed', function () {
				var place = search.getPlaces()[0];

				if (place === undefined)
					return;

				$scope.marker.setMap(null);
				$scope.marker = new google.maps.Marker({
					position: place.geometry.location,
					map:map,
					title: place.name,
					icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
				});
			});
		};

		google.maps.event.addDomListener(window, 'load', $scope.initialize());
	});
