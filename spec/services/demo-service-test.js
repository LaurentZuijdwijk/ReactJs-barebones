describe("Demo service spec", function() {
	var service;
	beforeEach(function(){
		service = new Demo.services.DemoService();
	})
	it("should be defined", function() {
		expect(service).toBeDefined;
	});
	it("should get data", function() {

		var spy = jasmine.createSpy('spy');
		
		expect(service.getData).toBeDefined;

		expect(service.getData()).toEqual({});
		expect(spy).not.toHaveBeenCalled();
		expect(service.getData(spy)).toEqual({});
		expect(spy).toHaveBeenCalled();

	});
});