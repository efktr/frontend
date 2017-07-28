class Drug {

    // TODO: Possibly implement fetching of drug data from API

    constructor(properties){
        this.identifier = properties.identifier;
        this.name = properties.name;
    }

    equals(comparison){
        return this.identifier === comparison.identifier;
    }
}

export default Drug;