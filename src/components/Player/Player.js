// TODO: Add markerColor property
function Player(playerName) {
    this.playerName = playerName;
    this.hand = [];
    this.location = 'Atlanta';
    this.actions = 4;
}

Player.prototype.resetTurn = function() {
    this.actions = 4;
};

Player.prototype.useAction = function() {
    this.actions--;
};

Player.prototype.move = function(newLocation) {
    this.location = newLocation;
};

Player.prototype.addCard = function(card) {
    this.hand.push(card);
};

Player.prototype.removeCard = function(card) {
    const cardIndex = this.hand.findIndex(item => item === card);
    this.hand.splice(cardIndex, 1);
};

module.exports = Player;