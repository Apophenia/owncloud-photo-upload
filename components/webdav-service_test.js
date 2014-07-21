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
	it("should return a propfind XML object with no child properties appended to 'prop' element given an empty array", function() {
	    expect(webDAV.genPropRequestBody([])).toEqual('<propfind xmlns="DAV:"><prop/></propfind>');
	});
	
	it("should return a propfind XML object with two child properties in array appended to 'prop' element", function() {
	    expect(webDAV.genPropRequestBody(['creationdate','author'])).toEqual('<propfind xmlns="DAV:"><prop><creationdate/><author/></prop></propfind>');
	});

	it("should return a propfind XML object with five child properties in array appended to 'prop' element", function() {
	    expect(webDAV.genPropRequestBody(['creationdate','author','getcontenttype','getcontentlength','getlastmodified'])).toEqual('<propfind xmlns="DAV:"><prop><creationdate/><author/><getcontenttype/><getcontentlength/><getlastmodified/></prop></propfind>');
	}); 
    });

});
