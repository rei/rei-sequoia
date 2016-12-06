var path = require('path'),
through2 = require('through2'),
xml = require('xml'),
gutil = require('gulp-util'),
File = require('vinyl');

const PLUGIN_NAME = 'gulp-cedar-intellij';

var intellijSnippets = function intellijSnippets() {
  return through2.obj(function (file, enc, cb) {


    if (file.isNull()) {
      return cb();
    }
    if (file.isStream()) {
      return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
    }

    var mods = [],
        snippets = {},
        json = JSON.parse(file.contents.toString('utf8')),
        base = path.join(file.path, '..'),
        _self = this;

    snippets.templateSet = [{ _attr: {group: "Cedar"}}];

    for (var i = 0, j = json.length; i < j; i++) {
      mods = [];
      if(json[i].modifiers) {
        mods = json[i].modifiers;
      }
      traverse(json[i]);
    }

    outxml = xml(snippets, {indent: '  '});

    outxml = outxml.replace(/\$NEWLINE/g, '&#10;');


    var o = new File({
      base: base,
      path: path.join(base, 'Cedar.xml'),
      contents: new Buffer(outxml)
    });

    _self.push(o);

    function toXML(item) {

      var templateObj = {template:[]};
      templateObj.template.push({ _attr:{} });
      templateObj.template[0]._attr.name = item.id;
      templateObj.template[0]._attr.description = item.name;
      templateObj.template[0]._attr.toReformat = true;
      templateObj.template[0]._attr.toShortenFQNames = true;

      var pos = 0,
          snipStr = item.snippet;

      //All this for intellij variables
      if (mods.length) {
        var modStr = mods.map(function (mod, index) {
          pos = index + 1;
          templateObj.template.push(varObj(pos, '"'+mod.value+'"'));
          return '$' + pos + '$';
        }).join(' ');
      }

      // add modifier variable, href, final tab stops
      snipStr = snipStr.replace(/\{\$modifiers\}/g, modStr)
      .replace(/\{\$end\}/g, '$END$');

      if (snipStr.includes("{$href}")) {
        snipStr = snipStr.replace(/\{\$href\}/g, '$href$');
        templateObj.template.push(varObj("href"));
      }
      if (snipStr.includes("{$for}")) {
        snipStr = snipStr.replace(/\{\$for\}/g, '$for$');
        templateObj.template.push(varObj("for"));
      }
      if (snipStr.includes("{$val}")) {
        snipStr = snipStr.replace(/\{\$val\}/g, '$val$');
        templateObj.template.push(varObj("val"));
      }
      if (snipStr.includes("{$name}")) {
        snipStr = snipStr.replace(/\{\$name\}/g, '$name$');
        templateObj.template.push(varObj("name"));
      }
      if (snipStr.includes("{$src}")) {
        snipStr = snipStr.replace(/\{\$src\}/g, '$src$');
        templateObj.template.push(varObj("src"));
      }
      if (snipStr.includes("{$alt}")) {
        snipStr = snipStr.replace(/\{\$alt\}/g, '$alt$');
        templateObj.template.push(varObj("alt"));
      }

      snipStr = snipStr.replace(/[\n\r]/g, '$NEWLINE');

      templateObj.template[0]._attr.value = snipStr;

      var contextObj = {context:[]};
      contextObj.context.push({option: {_attr: {}} });
      contextObj.context[0].option._attr.name = "HTML_TEXT";
      contextObj.context[0].option._attr.value = true;

      templateObj.template.push(contextObj);

      return templateObj;
    }

    function varObj(name, defaultVal) {
      dVal = defaultVal || "";
      return {
        variable: {
          _attr:{
            name: name,
            expression: "",
            defaultValue: dVal,
            alwaysStopAt: true
          }
        }
      };
    }

    function traverse (item) {
      if(item.children) {
        for (var i = 0, j = item.children.length; i < j; i++) {
          traverse(item.children[i]);
        }
      } else {
        snippets.templateSet.push(toXML(item));
      }
    }

    cb();

  });
}


module.exports = intellijSnippets;
