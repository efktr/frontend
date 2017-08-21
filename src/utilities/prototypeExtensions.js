String.prototype.getHashCode = function() {
    var hash = 0;
    if (this.length === 0) return hash;
    for (let i = 0; i < this.length; i++) {
        hash = this.charCodeAt(i) + ((hash << 5) - hash);
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
};

Number.prototype.intToHSL = function() {
    let shortened = this;
    return "hsl(" + shortened + ",42.2%,57.3%)";
};