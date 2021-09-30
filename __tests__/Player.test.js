const Player = require('../src/components/Player/Player');

describe('Player Class', () => {
    describe('initialization', () => {
        test('should create an object ... if provided valid arguments', () => {
            let player = new Player(playerName='Kai', playerColor='green');
            expect(player.playerName).toEqual('Kai');
            expect(player.playerColor).toEqual('green');
            expect(player.hand).toEqual([]);
            expect(player.location).toEqual('Atlanta');
            expect(player.actions).toEqual(4);
        });
    });

    describe('resetTurn', () => {
        test('should set actions property to 4', () => {
            let player = new Player(playerName='Kai');
            player.actions = 2;
            player.resetTurn();
            expect(player.actions).toEqual(4);
        });
    });

    describe('useAction', () => {
        test('should decrement actions property', () => {
            let player = new Player(playerName='Kai');
            player.useAction();
            expect(player.actions).toEqual(3);
        });
    });

    describe('move', () => {
        test('given a City, update the Player location to match the City name', () => {
            let player = new Player(playerName='Kai');
            player.move('Berlin');
            expect(player.location).toEqual('Berlin');
        });
    });

    describe('addCard', () => {
        test('given a card, should add that City name to the hand property', () => {
            let player = new Player(playerName='Kai');
            player.addCard('Sydney');
            expect(player.hand).toContain('Sydney');
        });
    });

    describe('removeCard', () => {
        test('given a card, should remove that City name from the hand property', () => {
            let player = new Player(playerName='Kai');
            player.hand = ['Berlin', 'Paris', 'DC', 'Sydney', 'Khartuom'];
            player.removeCard('Sydney');
            expect(player.hand).toEqual(expect.not.arrayContaining(['Sydney']));
        });
    });
});