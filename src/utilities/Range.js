export default class Range {

    static INCLUDED = "<+>";
    static GREATER = "+<";
    static SMALLER = ">+";

    constructor(lower, higher){
        this.range = [lower, higher];
    }

    included(value){
        if(value > this.range[0] && value <= this.range[1]){
            return Range.INCLUDED;
        } else if(value > this.range[1]) {
            return Range.GREATER;
        } else {
            return Range.SMALLER;
        }
    }

    mean(){
        return this.range[0] === null ? null : (this.range[0]+this.range[1])/2;
    }
}