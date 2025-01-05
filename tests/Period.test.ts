import Period from "../src/domain/Period"

describe("Period", ()=>{
    it("deve retornar o diff de horas", ()=>{
        const period = new Period(new Date('2025-01-05T10:00:00'), new Date('2025-01-05T12:30:00'))
        expect(period.getDiffInHours()).toBe(2.5)
    })
    it("deve retornar o diff de dias", ()=>{
        const period = new Period(new Date('2025-01-05T10:00:00'), new Date('2025-01-07T12:30:00'))
        expect(period.getDiffInDays()).toBe(2.1)
    })
    /**
    it("deve retornar invalid period", ()=>{
        const period = new Period(new Date('2025-01-07T10:00:00'), new Date('2025-01-05T12:30:00'))
        expect(period).to(new Error('Invalid period'))

    })
         */
})