export const __API__ = process.env.API || "http://localhost:3300";
export const __SEARCH__ = process.env.API || "search";
export const __AUTOCOMPLETE__ = process.env.API || "autocomplete";
export const buildUrl = (components) => {
        let uri = '';
        for(let i=0; i<components.length; i++){
            uri += components[i] + '/';
        }
        return uri.substr(0, uri.length-1);
};

