describe("webdavServices", function() {
    var scope;
    
    beforeEach(angular.mock.module("Application"));
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
	scope = $rootScope.$new();
	$controller("webdavServices", {$scope: scope});
    }));
    
    describe("innerFunc", function() {
	it("should have variable text = 'Hello world'", function() {
	    expect(scope.text).toBe("Hello world");
	});
    });
});
