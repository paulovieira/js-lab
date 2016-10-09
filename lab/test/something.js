const Lab = require('lab');
const Code = require('code');

const expect = Code.expect;
const lab = Lab.script();
const test = lab.test;
const suite = lab.suite;



suite('basic aritmetic', () => {

    test('is above', (done) => {
        console.log("\nbasic aritmetic\n")
        expect(10).to.be.above(9);
        done();
    });

})

exports.lab = lab;