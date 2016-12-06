#!/usr/bin/env node

var gutil = require('gulp-util'),
    File = gutil.File,
    through = require('through2'),
    lcss = require('livingcss'),
    parseComments = lcss.parseComments,
    tags = lcss.tags,
    utils = lcss.utils;

const PLUGIN_NAME = 'cedar-sublime-snippets';

module.exports = function (options) {

  options = options || {};
  options.tags = options.tags || [];

  // add custom tags
  for (var tag in options.tags) {
    if (!options.tags.hasOwnProperty(tag)) {
      continue;
    }

    tags[tag] = options.tags[tag];
  };

  var context = {
    footerHTML: 'Style Guide generated with <a href="https://github.com/straker/livingcss">LivingCSS</a>.',
    globalStylesheets: [],
    menuButtonHTML: '☰ Menu',
    pageOrder: [],
    pages: [],
    scripts: [],
    sections: [],
    stylesheets: [],
    title: 'LivingCSS Style Guide'
  };

  // list of all files from gulp.src
  var files = [];



  /**
   * Buffer all files before parsing them to livingcss.
   */
  function bufferContents(file, enc, cb) {
    // ignore empty files
    if (file.isNull()) {
      return cb();
    }

    // no streams
    if (file.isStream()) {
      this.emit('error', new PluginError('generator',  'Streaming not supported'));
      return cb();
    }

    files.push(file.path);

    cb();
  }

  /**
   * Pass all files to livingcss once buffered.
   */
  function endStream(cb) {
    var self = this,
        json;

    var p1 = new Promise(function (resolve, reject) {
      var outFiles = [];
      utils.readFileGlobs(files, function(data,file) {
        parseComments(data, file, tags, context);
        if(context.sections.length > 0){
          // only get root sections
          for (var i = 0; i < context.sections.length; ) {
            if (context.sections[i].parent) {
              context.sections.splice(i, 1);
            }
            else {
              i++;
            }
          }

          var o = new File({
            path: 'roots.json',
            contents: new Buffer(JSON.stringify(context.sections, null, '\t'))
          });
          outFiles.push(o);
        }
      }).then(function () {
        resolve(outFiles);
      });

    });

    p1.then(function (output) {
      for (var i = 0, l = output.length; i < l; i++) {
        self.push(output[i]);
      }
      cb();
    })


  }

  return through.obj(bufferContents, endStream);
};
