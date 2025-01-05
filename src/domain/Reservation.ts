import { v4 as uuid4 } from 'uuid'
import Room from './Room';
import Period from './Period';

export default abstract class Reservation{
    protected period:Period;
    constructor(readonly uuid:string, readonly rooId:string, readonly phone:string, readonly checkinDate:Date, readonly checkoutDate:Date, private status:string, protected price:number, protected duration:number, readonly reservationDate:Date, readonly description?:string){
        this.period = new Period(new Date(checkinDate), new Date(checkoutDate))
    }
   
    cancel(){
        if(this.status === 'cancelled') throw new Error('Reservation is already cancelled');
        this.status = 'cancelled';
    }
    getStatus(){
        return this.status;
    }
    abstract calculate(room:Room):void;

}