'use strict';

angular.module('integrationApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin_event', {
                url: '/admin/event',
                templateUrl: 'app/admin/admin_event/admin_event.html',
                controller: 'AdminEventCtrl',
                authenticate: true,
                resolve: {
            		events: function (Restangular) {
            			return Restangular.all('events').getList();
                	}
                }
            });
    });