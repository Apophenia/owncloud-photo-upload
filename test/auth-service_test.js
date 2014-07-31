describe("authServices", function() {
    beforeEach(angular.mock.module("uploadApp"));    
    var Auth;
    beforeEach(function() {
	inject(function ($injector) {
	    Auth = $injector.get('Auth');
	});
    });
    
    describe('setLocation, getLocation', function() {
	it("should set and return 'http://demo.owncloud.org/' as the install location", function() {
	    Auth.setLocation("http://demo.owncloud.org/");
	    expect(Auth.getLocation()).toEqual("http://demo.owncloud.org/");
	});
	
	it("should set and return 'localhost:9000' as the install location", function() {
	    Auth.setLocation("localhost:9000");
	    expect(Auth.getLocation()).toEqual("localhost:9000");
 	});
    });
	
    describe('getBasic', function () {
	it("should return 'Basic ' plus the base64 encoded version of 'testusername:testpassword'", function() {
	    Auth.setUsername("testusername");
	    Auth.setPassword("testpassword");
	    expect(Auth.getBasic()).toEqual('Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA==');
	});
	
	it("should return 'Basic ' plus the base64 encoded version of '100:9999'", function() {
	    Auth.setUsername("100");
	    Auth.setPassword("9999");
	    expect(Auth.getBasic()).toEqual('Basic MTAwOjk5OTk=');
	});

	it("should return 'Basic ' plus the base64 encoded version of 'A:A'", function() {
	    Auth.setUsername("A");
	    Auth.setPassword("A");
	    expect(Auth.getBasic()).toEqual('Basic QTpB');
	});
    });
});
