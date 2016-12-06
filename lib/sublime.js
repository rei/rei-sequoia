#!/usr/bin/env node

var input = require('../dist/json/elements.json'),
    xml = require('xml'),
    fs = require('fs-extra');

// Globals
var mods = [],
    snippets = [];

function addSnippet(id, xml) {
  var snip = {
    name: id,
    xml: xml
  };

  snippets.push(snip);
}

function toXML(item) {
  var pos = 0,
      snippetStr = item.snippet;
  if (mods.length) {
    var modStr = mods.map(function (mod, index) {
      pos = index + 1;
      return '${' + pos + ':' + mod.value + '}';
    }).join(' ');
  }

  // add modifier variable, href, final tab stops
  snippetStr = snippetStr.replace(/\{\$modifiers\}/g, modStr)
    .replace(/\{\$end\}/g, '$' + ++pos)
    .replace(/\{\$href\}/g, '$' + ++pos);

  return xml({
    snippet: [
      { content: {  _cdata: snippetStr } },
      { tabTrigger: item.id },
      { description: item.name },
      { scope: 'text.html' }
    ]
  },
    { indent: '  ' }
  );
}

function traverse (item) {
  if(item.children) {
    for (var i = 0, j = item.children.length; i < j; i++) {
      traverse(item.children[i]);
    }
  } else {
    addSnippet(item.id, toXML(item))
  }
}

function generateSnippets(json) {
  for (var i = 0, j = json.length; i < j; i++) {
    mods = [];
    if(json[i].modifiers) {
      mods = json[i].modifiers;
    }
    traverse(json[i]);
  }

  outDir = './snippets/sublime/';

  fs.emptydir(outDir, function (err) {
    if (!err) {
      for (var i = 0, j = snippets.length; i < j; i++) {
        fs.outputFile(outDir + snippets[i].name + '.sublime-snippet', snippets[i].xml, function (err) {
          if (err) { console.error(err); }
        });
      }
    }
  });
}

generateSnippets(input);
