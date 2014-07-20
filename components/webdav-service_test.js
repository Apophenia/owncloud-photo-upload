describe("webdavServices", function() {
    beforeEach(angular.mock.module("uploadApp"));    
    var webDAV, httpBackend;
    beforeEach(function() {
	inject(function ($injector) {
	    httpBackend = $injector.get('$httpBackend');
	    webDAV = $injector.get('webDAV');
	});
    });
    
    describe('genPropRequestBody', function () {
	it("should return a propfind XML object with 'creationdate' and 'author' as child objects of 'prop.'", function() {
	    expect(webDAV.genPropRequestBody(['creationdate','author'])).toEqual('<propfind xmlns="DAV:"><prop><creationdate/><author/></prop></propfind>');
	});
    });
});
