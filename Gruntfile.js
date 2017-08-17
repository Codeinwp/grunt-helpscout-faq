'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    faq_builder: {
      main_options: {
        options: {
          filename: 'readme.txt',
          api_key: 'e2a5c1a75f6132ced80bb05ee445a76ffa7fc430',
          collection_id: '56221c6d903360610fc69003',
          category_id: '5873873e90336009736c40db',
          template: `= {article_title} = 
                  [{article_link}]({article_link})`,
        },
      }
    },
  });

  // Actually load this plugin's task.
  grunt.loadTasks('tasks');

  // By default, lint run the faq_builder task.
  grunt.registerTask('default', ['faq_builder']);

};
