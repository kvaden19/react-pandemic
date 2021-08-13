function Disease(color) {
    this.color = color;
    this.cubes = 96;
    this.cured = false;
    this.eradicated = false;
}

// TODO: Write cure
Disease.prototype.cure = function() {
    this.cured = true;
};

// TODO: Write eradicate
Disease.prototype.eradicate = function() {
    this.eradicated = true;
};

module.exports = Disease;