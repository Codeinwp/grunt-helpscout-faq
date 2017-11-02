'use strict';

module.exports = function (grunt) {

	grunt.registerMultiTask('faq_builder', 'FAQ Builder.', function () {

		var done = this.async(); // to use request to the API asynchronously
		var options = this.options(); // module options

		// read of the local readme.txt file
		var text = grunt.file.read(options.filename);
		var regex = new RegExp(/([\s\S]*)==[\s\S]Frequently Asked Questions[\s\S]==([\s\S]*?)(==[\s\S]*)/g);
		var parts = regex.exec(text);
		if (parts === null) {
			throw  new Error('FAQ pattern not found')
		}
		if (parts.length !== 4) {
			throw  new Error('FAQ pattern not found')
		}
		var url_regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
		var matches = parts[2].match(url_regex); //parse the information according to the regex
		var internal_array = []; // the list of faq items from readme.txt file
		if (matches === null) {
			matches = [];
		}
		matches.forEach(function (item) {
			internal_array.push(item);
		});
		// request to the REST API
		var request = require('request');

		var request_options = {
			uri: 'https://' + options.api_key + ':X@docsapi.helpscout.net/v1/categories/' + options.category_id + '/articles',
			method: 'GET'
		};

		var remote_array = []; // // the list of faq items from remote request (REST API)
		String.prototype.replaceAll = function (search, replacement) {
			var target = this;
			return target.replace(new RegExp(search, 'g'), replacement);
		};
		var req = request(request_options, function (error, response, body) {

			var object = JSON.parse(body);

			object.articles.items.forEach(function (item) {
				var list = [];
				list['item_name'] = item['name'];
				list['item_content'] = item['publicUrl'];
				remote_array.push(list);
			});

			var differnce = []; //the list of remote array that differs from the internal one


			remote_array.forEach(function (item) {
				var link = item['item_content'];
				if (!(internal_array.includes(link))) {
					differnce.push(item);
				}
			});

			if (differnce.length > 0) { // if the're new items

				var text_to_add = ''; // text to add in the readme.txt file

				differnce.forEach(function (item) {
					text_to_add += options.template.replaceAll('{article_title}', item['item_name']).replaceAll('{article_link}', item['item_content']);
				});

				grunt.file.write(options.filename, parts[1] + "== Frequently Asked Questions ==\n" + parts[2] + text_to_add + parts[3]); //add the new items to the file
				grunt.log.writeln('The file was updated successfully!');

			} else {

				grunt.log.writeln('The file wasn\'t updated. There\'re no new items here.');

			}
			done();
		});
	});
};
