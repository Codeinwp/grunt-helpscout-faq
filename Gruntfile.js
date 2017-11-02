'use strict';

module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		faq_builder: {
			main_options: {
				options: {
					filename: 'readme.txt',
					api_key: '',
					collection_id: '',
					category_id: '',
					template: "= {article_title} = \n [{article_link}]({article_link}) \n\n ",
				},
			}
		},
	});

	// Actually load this plugin's task.
	grunt.loadTasks('tasks');

	// By default, lint run the faq_builder task.
	grunt.registerTask('default', ['faq_builder']);

};
