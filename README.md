# grunt-helpscout-faq

[Grunt][grunt] task to update your readme FAQ list based on the HelpScout docs.  You can integrate in your deploment cycle for keeping the FAQ list in sync with your HelpScout Docs.

## Getting Started
_Requires grunt. If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide._

From the same directory as your project's [Gruntfile][Getting Started] and [package.json][], install this plugin by running the following command:

```bash
npm install grunt-helpscout-faq --save-dev
```

Once that's done, add this line to your project's Gruntfile:

```js
grunt.loadNpmTasks('grunt-faq-builder');
```

If the plugin has been installed correctly, running `grunt --help` at the command line should list the newly-installed plugin's task. In addition, the plugin should be listed in package.json as a `devDependency`, which ensures that it will be installed whenever the `npm install` command is run.

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md
[package.json]: https://npmjs.org/doc/json.html

## The "faq_builder" task

### Overview
In your project's Gruntfile, add a section named `faq_builder` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  faq_builder: {
    options: {
      // Task-specific options go here.
    }
  },
})
```

### Options

#### options.filename
Type: `String`
Default value: `readme.txt`

A string representing a the WordPress.org readme.txt file's path relative to Gruntfile.js.


#### options.api_key
Type: `String`
Default value: `''`

A string value representing the HelpScout Docs api key.
 
#### options.collection_id
Type: `String`
Default value: `''`

A string value representing the HelpScout Docs collection id, where the faq will be fetched from. 

#### options.category_id
Type: `String`
Default value: `''`

A string value representing the HelpScout Docs category id, where the faq items will be fetched from  .

#### options.template
Type: `String`
Default value: ```= {article_title} = 
                 [{article_link}]({article_link}) 
                ```
                
A string representing the template used for a single FAQ item in the readme.txt file. You can use the available magic tags: article_title and article_link.


## CONTRIBUTING
Please see the [Contributing to grunt](http://gruntjs.com/contributing) guide for information on contributing to this project.
