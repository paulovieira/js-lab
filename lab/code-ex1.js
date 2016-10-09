const Lab = require('lab');
const Code = require('code');


const lab = exports.lab = Lab.script();
const test = lab.test;
const suite = lab.suite;

const expect = Code.expect;

suite('basic aritmetic', () => {

    test('is above', (done) => {

        expect(10).to.be.above(11);
        done();
    });

})
