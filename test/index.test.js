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

test('WriteDirectories', (done) => {

    const stubExist = sinon.stub(core, 'fsExistsSync').callsFake(() => {
        return true;
    });

   const spy = sinon.spy(core,'WriteDirectory');
    

    const promise = core.WriteDirectories('test', 'front_modules');

    expect.assertions(1);
    return promise.then(data => {
        done();
        expect(spy.calledOnce).toBe(true);
        spy.restore();
        stubExist.restore();
        //stubWrite.restore();
    });

});
