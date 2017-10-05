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

describe('delete article', function() {
	it('article is successfully deleted', function() {
		var articleId = fs.readFileSync('./articleId', 'utf8');
		this.timeout(1600000);
		browser.click("i[class='icon icon-search']");
		browser.pause(1000);
		browser.keys(articleId);
		browser.pause(2000);
		browser.waitForVisible('#quick-search-result > div > ul > li > article > div');
		browser.keys("\uE006");
		// wait until the article is loaded
		browser.waitForVisible('#primary-dropdown');
		// click unpublish
		browser.click('#primary-dropdown');
		browser.click("body > ul > li.article-action-unpublish > div > button")
		browser.waitForVisible("#modals > div > div > div.modal-footer > button.btn.btn-primary")
		browser.click("#modals > div > div > div.modal-footer > button.btn.btn-primary")
		browser.pause(5000);
		browser.waitForVisible('#primary-dropdown');
		browser.click('#primary-dropdown');
		browser.pause(500);
		// retry to click the dropwdown, the first time fails occasionaly
		if (!browser.isVisible('body > ul > li.article-action-delete > div > button')) {
			browser.click('#primary-dropdown');
			browser.pause(500);
		}
		browser.click('body > ul > li.article-action-delete > div > button');
		browser.waitForVisible('#modals > div > div > div.modal-footer > button.btn.btn-primary');
		browser.click('#modals > div > div > div.modal-footer > button.btn.btn-primary');
		browser.pause(3 * 1000);
	});
});
