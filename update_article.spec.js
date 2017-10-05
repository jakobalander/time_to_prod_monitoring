var assert = require('chai').assert;
var fs = require('fs');

describe('verify login to the cms', function() {
	it('okta credentials ok', function() {
		this.timeout(160000);
		browser.url('http://cms-playground.plan3dev.se');
		browser.pause(2 * 1000);
		var title = browser.getTitle();

		assert.equal(title, 'Discover - SMP CMS', 
			'\n\n\nlogin failed!' + 
			'\nrun "node_modules/.bin/wdio wdio.conf.js --suite fix_login"' +
			'\nand provide okta login credentials\n\n\n"');
	});
});

describe('update article', function() {
	it('article updated successfully', function() {
		var articleId = fs.readFileSync('./articleId', 'utf8');
		this.timeout(1600000);
		browser.click("i[class='icon icon-search']");
		browser.pause(1000);
		browser.keys(articleId);
		browser.pause(2000);
		browser.waitForVisible('#quick-search-result > div > ul > li > article > div');
		browser.keys("\uE006");
		browser.waitForVisible("#article-components-list > ul > li:nth-child(2) > div.article-component.text > div.component-content > div > div > div.input-item.widget-text-editor > div.text-editor > p");
		browser.click("#article-components-list > ul > li:nth-child(2) > div.article-component.text > div.component-content > div > div > div.input-item.widget-text-editor > div.text-editor > p");
		browser.keys('\uE006');
		var now = Date.now().toString();
		browser.keys(now);
		browser.click("#primary-button");
		browser.pause(5000);
		browser.click(".close")
		browser.pause(3 * 1000);
	});
});
