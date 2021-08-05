const City = require('../src/components/City/City');

describe('City Class', () => {
    describe('initialization', () => {
        test('should create an object ... if provided valid arguments', () => {
            let city = new City('blue', ['Kelly'], {'blue': 3, 'yellow': 1}, true, ['Montreal', 'NYC'], 500000);
            expect(city.color).toEqual('blue');
            expect(city.occupants).toEqual(['Kelly']);
            expect(city.diseaseCubes).toEqual({'blue': 3, 'yellow': 1});
            expect(city.research).toEqual(true);
            expect(city.connectedCities).toEqual(['Montreal', 'NYC']);
            expect(city.population).toEqual(500000);
        });
    });

    describe('infect', () => {
        test('should increment diseaseCubes when provided valid arguments', () => {
            let city = new City();
            city.infect({'blue': 3});

            expect(city.diseaseCubes).toEqual({'blue': 3});
        });
    });
});