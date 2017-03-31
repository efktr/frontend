// API ENDPOINT
export const __API__ = process.env.REACT_APP_API || "http://localhost:3300";

// SERVICE ENDPOINTS
export const __SEARCH__ = "search";
export const __AUTOCOMPLETE__ = "autocomplete";
export const __DRUG__ = "drug";
export const __ADR__ = "adr";
export const __DRUGS__ = "drugs";
export const __ADRS__ = "adrs";

export const buildUrl = (components) => {
        let uri = '';
        for(let i=0; i<components.length; i++){
            uri += components[i] + '/';
        }
        return uri.substr(0, uri.length-1);
};

