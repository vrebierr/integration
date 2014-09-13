'use strict';

describe('Controller: AdminEventCtrl', function () {

  // load the controller's module
  beforeEach(module('integrationApp'));

  var AdminEventCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminEventCtrl = $controller('AdminEventCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
