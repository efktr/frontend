import Drug from '../objects/Drug'

// Manages a list of Drug items
function drugs(state = [], action) {
    switch (action.type) {
        case 'LOAD_STORED_STATE':
            let t = action.storedState.drugs.map(drug => new Drug(drug));
            return t;
        case 'ADD_DRUG':
            let duplicate = state.findIndex(function(drug){return drug.equals(action.payload)});

            if(duplicate === -1){
                return [... state, new Drug(action.payload)];
            } else {
                return state;
            }

        case 'REMOVE_DRUG':
            // implement logic to remove a drug using the equals function of drugs
            let split = state.findIndex(function(drug){return drug.equals(action.payload)});

            if (split > -1){
                state.splice(split,1)
            }

            return state;

        default:
            return state;
    }
}

export default drugs;