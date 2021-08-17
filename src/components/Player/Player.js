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
    let cardIndex = this.hand.indexOf(card);
    this.hand.splice(cardIndex, 1);
};

module.exports = Player;