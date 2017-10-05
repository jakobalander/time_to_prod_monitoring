#!/usr/bin/env node
var child_process = require('child_process');
var fs = require('fs');

var articles = new Map();

function cmsInteraction(action, articleId) {
	var actions = { 
		post: './post_article.spec.js',
		update: './update_article.spec.js',
		remove: './remove_article.spec.js',
	};

	fs.writeFileSync('./articleId', articleId);

	var result = child_process.spawnSync('./node_modules/.bin/wdio', ['wdio.conf.js', '--spec', actions[action]], {timeout: 600000});

	var articleId = fs.readFileSync('./articleId', 'utf8');

	if (result.status == 0) {
		console.log(`successful ${action} of ${articleId}`);
		if (action == 'post') {
			articles.set(articleId, {created: Date.now()});
		} else if (action == 'update') {
			var data = articles.get(articleId);
			data.updated = Date.now();
			articles.set(articleId, data);
		} else if (action =='remove') {
			articles.delete(articleId);
		}
	} else {
		console.log(`failed to ${action} ${articleId}`);
		console.log(result.stdout.toString('utf8'));
		console.log(result.stderr.toString('utf8'));
		throw result;
	}
	return articleId;

}

var articleId = cmsInteraction('post');
cmsInteraction('update', articleId);
cmsInteraction('remove', articleId);

function checkExistance(articleId) {
	
}

function logArticles() {
	articles.forEach(function(value, key, map) {console.log(`${key}: ${JSON.stringify(value)}`)})
}
