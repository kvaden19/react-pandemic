const Disease = require('../src/components/Disease/Disease');

describe('Disease Class', () => {
    describe('initialization', () => {
        test('should create an object with color, cured, and eradicated properties if provided valid arguments', () => {
            let disease = new Disease('red', 96, true, false);
            expect(disease.color).toEqual('red');
            expect(disease.cubes).toEqual(96);
            expect(disease.cured).toEqual(true);
            expect(disease.eradicated).toEqual(false);
        });
    });
});