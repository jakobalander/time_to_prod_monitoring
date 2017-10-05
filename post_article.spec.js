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

describe('post new article', function() {
	it('article posted successfully', function() {
		this.timeout(1600000);
		browser.click('#cms-tools > li:nth-child(3) > button');
		browser.pause(5000);
		// get articleId from url
		var url = browser.getUrl();
		var articleId = url.split('/').pop().split(';')[0];
		console.log("articleId: " + articleId);
		fs.writeFileSync('articleId', articleId);
		console.log('trying to post article: ' + articleId);
		// set title
		browser.click('#article-editor > div.editor-head > div.editor-head-title > div > div.input-item.widget-text-editor > div');
		browser.keys('fikonburk');
		// set text
		browser.click('#article-components-list > ul > li:nth-child(2) > div.article-component.text > div.component-content > div > div');
		var now = Date.now().toString();
		browser.keys(now);
		// set section
		browser.selectByValue('section select', 'c042a2fd-3902-45f1-b030-613dc7b94dff')
		// set news value
		browser.click("#news-value > div > div > div > label:nth-child(4)")
		// set news lifetime
		browser.click("#news-lifetime > div > div.input-item.widget-button-select > div > button[data-value='1']")
		// set author
		browser.click("#add-author")
		browser.keys("Aaron Spelling 4");
		browser.pause(1000);
		browser.keys("\uE006");
		browser.pause(1000);
		// Save and publish
		browser.click("#primary-button");
		// wait and confirm publishing
		browser.waitForVisible("#modals > div > div > div.modal-body.with-aside > div.publish-tools.modal-body-aside.with-actions > div.publish-actions.modal-aside-actions > div > button.btn.btn-large.btn-primary");
		browser.click("#modals > div > div > div.modal-body.with-aside > div.publish-tools.modal-body-aside.with-actions > div.publish-actions.modal-aside-actions > div > button.btn.btn-large.btn-primary");
		browser.pause(5000);
		// close the tab
		browser.click(".close")
		browser.pause(3000);
	});
});
