var fs = require('fs');
var path = require('path');
var bless = require('bless');
var utils = require('loader-utils');

module.exports = function(content) {
  this.cacheable && this.cacheable();

  var options = utils.parseQuery(this.query);
  options.resourcePath = this.resourcePath;

  content = content.replace(new RegExp('@charset "UTF-8";', 'gmi'), '');

  var chunk = bless.chunk(content);

  chunk.data = chunk.data.map(function(data) {
    return '@charset "UTF-8";' + data;
  });

  var loaderCode = [
    '// bless-loader: uses bless.js to split stylesheets based on IE9 selector limit. then converts these chunks into base64 encoded data URIs and subsequently inserts them into link tags.',
    '// Load the content.',
    'var content = ' + JSON.stringify(chunk.data),
    '// Function that generates the link tag',
    'var generateLinkTag = require(' + utils.stringifyRequest(this, '!' + path.join(__dirname, 'addLinkTag.js')) + ');',
    '// Insert content into the DOM.',
    'generateLinkTag(content, ' + JSON.stringify(options) + ');',
    ''
  ].join('\n');

  return loaderCode;
};
