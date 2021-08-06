function City(color, occupants, diseaseCubes, research, connectedCities, population) {
    this.color = color;
    this.occupants = occupants;
    this.diseaseCubes = diseaseCubes;
    this.research = research;
    this.connectedCities = connectedCities;
    this.population = population;
}

City.prototype.infect = function(color, value) {
    if (color in this.diseaseCubes) {
        this.diseaseCubes[color] += value;
    }
    else {
        this.diseaseCubes[color] = value;
    }
};

module.exports = City;