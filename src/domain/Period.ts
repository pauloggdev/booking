export default class Period{
    constructor(readonly start: Date, readonly end:Date){
        if(start.getTime() > end.getTime()) throw new Error('Invalid period');
    }
    getDiffInDays(){
        return Number(((this.end.getTime() - this.start.getTime()) / (1000*60*60*24)).toFixed(2));
    }
    getDiffInHours(){
        return Number(((this.end.getTime() - this.start.getTime()) / (1000*60*60)).toFixed(2));
    }
}