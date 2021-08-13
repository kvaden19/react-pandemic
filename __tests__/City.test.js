const City = require('../src/components/City/City');

describe('City Class', () => {
    describe('initialization', () => {
        test('should create a City object if provided valid arguments', () => {
            let city = new City(cityName='Atlanta', color='blue', connectedCities=['Montreal', 'NYC'], population=500000);
            expect(city.cityName).toEqual('Atlanta');
            expect(city.color).toEqual('blue');
            expect(city.occupants).toEqual([]);
            expect(city.diseaseCubes).toEqual({});
            expect(city.research).toEqual(false);
            expect(city.connectedCities).toEqual(['Montreal', 'NYC']);
            expect(city.population).toEqual(500000);
        });
    });

    describe('addOccupant', () => {
        test('given a Player name, should add that Player to the occupants property', () => {
            let city = new City(cityName='Atlanta', color='blue', connectedCities=['Montreal', 'NYC'], population=500000);
            city.addOccupant('Emily');
            expect(city.occupants).toEqual(['Emily']);
        });
    });

    describe('subtractOccupant', () => {
        test('given a Player name, should remove that Player from the occupants property', () => {
            let city = new City(cityName='Atlanta', color='blue', connectedCities=['Montreal', 'NYC'], population=500000);
            city.occupants = ['Kai', 'Emily']
            city.subtractOccupant('Kai');
            expect(city.occupants).toEqual(['Emily']);
        });
    });

    describe('addDisease', () => {
        test('given an existing Disease, should increment diseaseCubes property', () => {
            let city = new City(cityName='Atlanta', color='blue', connectedCities=['Montreal', 'NYC'], population=500000);
            city.diseaseCubes = {'blue': 1};
            city.addDisease('blue', 1);
            expect(city.diseaseCubes).toMatchObject({'blue': 2});
        });
    });

    describe('addDisease', () => {
        test('given a new Disease, should increment diseaseCubes property', () => {
            let city = new City(cityName='Atlanta', color='blue', connectedCities=['Montreal', 'NYC'], population=500000);
            city.addDisease('yellow', 1);
            expect(city.diseaseCubes).toMatchObject({'yellow': 1});
        });
    });

    describe('subtractDisease', () => {
        test('given a Disease, should decrement diseaseCubes property', () => {
            let city = new City(cityName='Atlanta', color='blue', connectedCities=['Montreal', 'NYC'], population=500000);
            city.diseaseCubes = {'blue': 1};
            city.subtractDisease('blue', 1);
            expect(city.diseaseCubes).toMatchObject({'blue': 0});
        });
    });

    describe('addStation', () => {
        test('should flip research property to true', () => {
            let city = new City(cityName='Atlanta', color='blue', connectedCities=['Montreal', 'NYC'], population=500000);
            city.addStation();
            expect(city.research).toEqual(true);
        });
    });

    describe('subtractStation', () => {
        test('should flip research property to false', () => {
            let city = new City(cityName='Atlanta', color='blue', connectedCities=['Montreal', 'NYC'], population=500000);
            city.research = true;
            city.subtractStation();
            expect(city.research).toEqual(false);
        });
    });
});