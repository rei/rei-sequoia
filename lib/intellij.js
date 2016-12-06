#!/usr/bin/env node

var input = require('../dist/json/elements.json'),
xml = require('xml'),
fs = require('fs-extra');

// Globals
var mods = [],
    snippets = {};

function toXML(item) {

  var templateObj = {template:[]};
  templateObj.template.push({ _attr:{} });
  templateObj.template[0]._attr.name = item.id;
  templateObj.template[0]._attr.description = item.name;
  templateObj.template[0]._attr.toReformat = true;
  templateObj.template[0]._attr.toShortenFQNames = true;

  var pos = 0,
      snippetStr = item.snippet;

  //All this for intellij variables
  if (mods.length) {
    var modStr = mods.map(function (mod, index) {
      pos = index + 1;

      var modObj = {variable: {_attr:{}}};
      modObj.variable._attr.name = pos;
      modObj.variable._attr.expression = "";
      modObj.variable._attr.defaultValue = "";
      modObj.variable._attr.alwaysStopAt = true;
      modObj.variable._attr.defaultValue = '"'+mod.value+'"';

      templateObj.template.push(modObj);

      return '$' + pos + '$';
    }).join(' ');
  }

  // add modifier variable, href, final tab stops
  snippetStr = snippetStr.replace(/\{\$modifiers\}/g, modStr)
  .replace(/\{\$end\}/g, '$END$');
  if (snippetStr.includes("{$href}")) {
    snippetStr = snippetStr.replace(/\{\$href\}/g, '$href$');

    var stopObj = {variable: {_attr:{}}};
    stopObj.variable._attr.name = "href";
    stopObj.variable._attr.expression = "";
    stopObj.variable._attr.defaultValue = "";
    stopObj.variable._attr.alwaysStopAt = true;

    templateObj.template.push(stopObj);
  }

  templateObj.template[0]._attr.value = snippetStr;

  var contextObj = {context:[]};
  contextObj.context.push({option: {_attr: {}} });
  contextObj.context[0].option._attr.name = "HTML_TEXT";
  contextObj.context[0].option._attr.value = true;

  templateObj.template.push(contextObj);

  return templateObj;
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

function generateSnippets(json) {
  snippets.templateSet = [{ _attr: {group: "Cedar"}}];

  for (var i = 0, j = json.length; i < j; i++) {
    mods = [];
    if(json[i].modifiers) {
      mods = json[i].modifiers;
    }
    traverse(json[i]);
  }

  outDir = './snippets/intellij/';

  outxml = xml(snippets, {indent: '  '});

  fs.emptydir(outDir, function (err) {
    if (!err) {
      fs.outputFile(outDir + 'Cedar.xml', outxml, function (err) {
        if (err) { console.error("Error writing file", err); }
      })
    }
  })
}

generateSnippets(input);
