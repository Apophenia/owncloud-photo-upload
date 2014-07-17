describe("webdavServices", function() {
    beforeEach(angular.mock.module("uploadApp"));
    
    var webDAV, httpBackend;
    beforeEach(function() {
	inject(function ($injector) {
	    httpBackend = $injector.get('$httpBackend');
	    webDAV = $injector.get('webDAV');
	});
    });
    
    describe('greet', function () {
	it("should return 'Hello world'", function() {
	    expect(webDAV.greet()).toEqual("Hello world");
	});
    });
});
