'use strict';

const templateHTML = `
<!DOCTYPE html>
<html lang = "en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
    +               content="width=device-width, user-scalable=no,
    +               initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <title>testFile</title>
    </head>
    <body>
        <h1></h1>
        <script type="text/javascript" src="${name}.js"></script>
    </body>
</html>`;
const templateCSS = `${name}{\n}`;
const templateJS = `(function ${name} () {\n\t}();`;

const templateTEST = `use strict';

const core = require('../lib/${name}.js');
const helper = require('./sinonObjects/${name}.sinon.js');

test('case test', () => {

    // @TODO case test here !

});
`

const templateSINON = `const sinon = require('sinon');
const dummy = {};

const mock = sinon.mock(object);
//@TODO actions here!

mock.verify();

mock.restore();

const spy = sinon.spy(object,  'function${name}');
//@TOD functions watcher here!

spy.restore();
const stub = sinon.stub(object,  'function${name}').callsFake(() => {
    //@TODO the overwrite behavior
});

// @TODO assertions or expects here!
stub.restore();`

module.exports = {templateHTML, templateCSS, templateJS,templateTEST ,templateSINON };
