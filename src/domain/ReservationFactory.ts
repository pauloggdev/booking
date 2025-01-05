import DayReservation from "./DayReservation";
import HourReservation from "./HourReservation";

export default class ReservationFactory {
    static create(type: string, roomId: string, phone: string, checkinDate: Date, checkoutDate: Date, price: number, duration: number, reservationDate: Date, description: string) {
        if (type === 'day') return DayReservation.create(roomId, phone, checkinDate, checkoutDate, price, duration, reservationDate, description)
        if (type === 'hour') return HourReservation.create(roomId, phone, checkinDate, checkoutDate, price, duration, reservationDate, description)
        return new Error()
    }
}