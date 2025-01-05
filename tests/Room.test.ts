import Room from '../src/domain/Room';

describe("Room", () => {
    it("deve criar um quarto por hora", async () => {
        const room = Room.create('hour', 1000.00);
        expect(room.type).toBe('hour');
        expect(room.price).toBe(1000.00)
    })
    it("deve criar um quarto por dia", async () => {
        const room = Room.create('day', 10000.00);
        expect(room.type).toBe('day');
        expect(room.price).toBe(10000.00);
    })
})