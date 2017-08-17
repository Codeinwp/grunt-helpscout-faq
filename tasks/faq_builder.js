'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('faq_builder', 'FAQ Builder.', function() {

    var done = this.async(); // to use request to the API asynchronously
    var options = this.options(); // module options

    // read of the local readme.txt file
    var text = grunt.file.read(options.filename);

    var first_part = text.match(/([\s\S]*)== Screenshots ==/g)[0].replace("== Screenshots ==", "");
    var last_part = text.match(/== Screenshots ==([\s\S]*)/g)[0];

    var matches = text.match(/=.+=[\n+]\[http:.+\]\(.+\)/g); //parse the information according to the regex
    var internal_array = []; // the list of faq items from readme.txt file

    matches.forEach(function(item) {
      var list = [];

      list['item_name'] = item.match(/=.+=/g)[0].replace(/=/g, "").replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      list['item_content'] = item.match(/\[.+\]/g)[0].replace(/\[/g, "").replace(/\]/g, "");
      internal_array.push(list);
    });



    // request to the REST API
    var request = require('request');

    var request_options = {
      uri: 'https://'+ options.api_key +':X@docsapi.helpscout.net/v1/categories/'+ options.category_id +'/articles',
      method: 'GET'
    };

    var remote_array = []; // // the list of faq items from remote request (REST API)

    var req = request(request_options, function(error, response, body) {

        var object = JSON.parse(body);

        object.articles.items.forEach(function(item) {
            var list = [];
            list['item_name'] = item['name'];
            list['item_content'] = item['publicUrl'];
            remote_array.push(list);
        });

        var links = []; // the list of links from internal array
        var differnce = []; //the list of remote array that differs from the internal one

        internal_array.forEach(function(item) {
          links.push(item['item_content']);
        });

        remote_array.forEach(function(item) {
          var link = item['item_content'];
          
          if (!(links.includes(link))) {
            differnce.push(item);
          }

        });

        if (differnce.length > 0) { // if the're new items

          var text_to_add = ''; // text to add in the readme.txt file

          differnce.forEach(function(item) {
            text_to_add += '= ' + item['item_name'] + ' =' + '\n' + '[' + item['item_content'] + '](' + item['item_content'] + ')' + '\n\n';
          });

          grunt.file.write(options.filename, first_part + text_to_add + last_part); //add the new items to the file
          grunt.log.writeln('The file was updated successfully!');

        } else {

          grunt.log.writeln('The file wasn\'t updated. There\'re no new items here.');

        }
    });
  });
};
