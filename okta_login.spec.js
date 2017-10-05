var assert = require('assert');

describe('webdriver.io page', function() {
	it('should have the right title', function() {
		this.timeout(160000);
		browser.url('http://cms-playground.plan3dev.se');
		browser.pause(2.5 * 60 * 1000);
		var title = browser.getTitle();
		assert.equal(title, 'Discover - SMP CMS');
	});
});
