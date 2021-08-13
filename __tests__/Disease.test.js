const Disease = require('../src/components/Disease/Disease');

describe('Disease Class', () => {
    describe('initialization', () => {
        test('should create a Disease object if provided valid arguments', () => {
            let disease = new Disease(color='red');
            expect(disease.color).toEqual('red');
            expect(disease.cubes).toEqual(96);
            expect(disease.cured).toEqual(false);
            expect(disease.eradicated).toEqual(false);
        });
    });

    describe('cure', () => {
        test('should flip cured property to true', () => {
            let disease = new Disease(color='red');
            disease.cure();
            expect(disease.cured).toEqual(true);
        });
    });

    describe('eradicate', () => {
        test('should flip eradicated property to true', () => {
            let disease = new Disease(color='black');
            disease.eradicate();
            expect(disease.eradicated).toEqual(true);
        });
    });
});