'use strict';

const templateHTML = `<!DOCTYPE html>\n<html lang="en" >\n<head>\n<meta charset="utf-8">\n<title>Example of Fetch</title>\n</head>\n<body>\n<h1></h1></body><script type="text/javascript" src = "testFile.js" ></script></html>`;
const templateCSS = `${name}{\n}`;
const templateJS = `(function ${name} () {\n\t}();`;

module.exports = {templateHTML, templateCSS, templateJS};