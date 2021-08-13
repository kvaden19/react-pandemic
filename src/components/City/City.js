function City(cityName, color, connectedCities, population) {
    this.cityName = cityName;
    this.color = color;
    this.occupants = [];
    this.diseaseCubes = {};
    this.research = false;
    this.connectedCities = connectedCities;
    this.population = population;
}

City.prototype.addOccupant = function(player) {
    this.occupants.push(player);
};

City.prototype.subtractOccupant = function(player) {
    let playerIndex = this.occupants.indexOf(player);
    this.occupants.splice(playerIndex, 1);
};

City.prototype.addDisease = function(color, value) {
    if (color in this.diseaseCubes) {
        this.diseaseCubes[color] += value;
    }
    else {
        this.diseaseCubes[color] = value;
    }
};

City.prototype.subtractDisease = function(color, value) {
    this.diseaseCubes[color] -= value;
};

City.prototype.addStation = function() {
    this.research = true;
};

City.prototype.subtractStation = function() {
    this.research = false;
};

module.exports = City;