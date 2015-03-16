var Demo = Demo || {};
Demo.services = Demo.services || {};

Demo.services.DemoService = (function() {
	'use strict';

	var instance = function() {};
	instance.prototype.getData = function(cb) {
		if (typeof cb === 'function') {
			cb.call(this, {});
		}
		return {};
	};
	return instance;
})();