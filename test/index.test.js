'use strict';
const core = require('../lib/index');
const fs = require('fs');
const sinon = require('sinon');
const dummy = require('./sinonObjects/writeDirectory.dummy');


test('writeDirectory', (done) => {
    const stub = sinon.stub(fs, 'mkdirSync').callsFake(() => {
        return true;
    });

    const promise = core.WriteDirectory('front_modules', 'petter');

    expect.assertions(1);
    return promise.then(data => {
        expect(data).toBe(true);
        done();
        stub.restore();
    });
});

test('WriteFile', () => {

    const stub = sinon.stub(fs, 'writeFileSync').callsFake(() => {
       return true;
    });

    const promise = core.WriteFile(dummy.templateHTML,'text/html', 'html');

    expect.assertions(1);
    return promise.then(data => {
        expect(data).toBe(true);
        stub.restore();
    });
});

test('ReadFile', (done) => {
    const stub = sinon.stub(fs, 'readFile').callsFake(() => {
        return dummy.templateHTML;
    });

    const promise = core.ReadFile('templateHTML', 'testFile');

    expect.assertions(1);

    return promise.then(data => {
        expect(data).toEqual({});
        done();
        stub.restore();
    })
});
