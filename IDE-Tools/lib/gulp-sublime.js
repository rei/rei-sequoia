var path = require('path'),
through2 = require('through2'),
xml = require('xml'),
gutil = require('gulp-util'),
File = require('vinyl');

const PLUGIN_NAME = 'gulp-cedar-sublime';

var sublimeSnippets = function sublimeSnippets() {
  return through2.obj(function (file, enc, cb) {


    if (file.isNull()) {
      return cb();
    }
    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    var mods = [],
        snippets = [],
        json = JSON.parse(file.contents.toString('utf8')),
        base = path.join(file.path, '..'),
        _self = this;

    for (var i = 0, j = json.length; i < j; i++) {
      mods = [];
      if(json[i].modifiers) {
        mods = json[i].modifiers;
      }
      traverse(json[i]);
    }

    for (var i = 0, j = snippets.length; i < j; i++) {
      var o = new File({
        path: path.join(snippets[i].name + '.sublime-snippet'),
        contents: new Buffer(snippets[i].xml)
      });
      _self.push(o);
    }

    function toXML(item) {
      var pos = 0,
          snipStr = item.snippet;
      if (mods.length) {
        var modStr = mods.map(function (mod, index) {
          pos = index + 1;
          return '${' + pos + ':' + mod.value + '}';
        }).join(' ');
      }


      // add modifier variable, href, final tab stops
      snipStr = snipStr.replace(/\{\$modifiers\}/g, modStr);
      if (snipStr.includes("{$href}")) {
        snipStr = snipStr.replace(/\{\$href\}/g, '$' + ++pos);
      }
      if (snipStr.includes("{$for}")) {
        snipStr = snipStr.replace(/\{\$for\}/g, '$' + ++pos);
      }
      if (snipStr.includes("{$val}")) {
        snipStr = snipStr.replace(/\{\$val\}/g, '$' + ++pos);
      }
      if (snipStr.includes("{$name}")) {
        snipStr = snipStr.replace(/\{\$name\}/g, '$' + ++pos);
      }
      if (snipStr.includes("{$src}")) {
        snipStr = snipStr.replace(/\{\$src\}/g, '$' + ++pos);
      }
      if (snipStr.includes("{$alt}")) {
        snipStr = snipStr.replace(/\{\$alt\}/g, '$' + ++pos);
      }

      snipStr = snipStr.replace(/\{\$end\}/g, '$' + ++pos)

      return xml(
        {
          snippet: [
            { content: {  _cdata: snipStr } },
            { tabTrigger: item.id },
            { description: item.name },
            { scope: 'text.html' }
          ]
        },
        {
          indent: '  '
        }
      );
    }

    function traverse (item) {
      if(item.children) {
        for (var i = 0, j = item.children.length; i < j; i++) {
          traverse(item.children[i]);
        }
      } else {
        snippets.push({
          name: item.id,
          xml: toXML(item)
        })
      }
    }

    cb();

  });
}


module.exports = sublimeSnippets;
