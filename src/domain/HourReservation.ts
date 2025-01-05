import Period from "./Period";
import Reservation from "./Reservation";
import Room from "./Room";
import {v4 as uuid4} from 'uuid'

export default class HourReservation extends Reservation{
    static create(roomId:string, phone:string, checkinDate:Date, checkoutDate:Date, price:number, duration:number, reservationDate:Date, description:string){
        const uuid = uuid4.toString();
        const status = 'active'
        return new HourReservation(uuid, roomId, phone, checkinDate, checkoutDate, status, price, duration, reservationDate, description)
    }
    calculate(room: Room): void {
        this.duration = this.period.getDiffInHours();
        this.price = this.duration * room.price;
    }
}