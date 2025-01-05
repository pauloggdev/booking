import HourReservation from '../src/domain/HourReservation';
import DayReservation from '../src/domain/DayReservation';
describe("Reservations", () => {
    
    it('deve criar uma reserva por hora', async () => {
        const reservation = HourReservation.create('uuid-room', '9999-0000', new Date('2025-01-05T10:00:00'), new Date('2025-01-05T11:00:00'), 1000.00, 5, new Date('2025-01-05T09:00:00'), 'description');
        expect(reservation.phone).toBe('9999-0000');
        expect(reservation.getStatus()).toBe('active');
    })
    it('deve cancelar uma reserva por dia', async () => {
        const reservation = DayReservation.create('uuid-room', '9999-0000', new Date('2025-01-05T10:00:00'), new Date('2025-01-05T11:00:00'), 1000.00, 5, new Date('2025-01-05T09:00:00'), 'description');
        reservation.cancel()
        expect(reservation.phone).toBe('9999-0000');
        expect(reservation.getStatus()).toBe('cancelled');
    })
        
})