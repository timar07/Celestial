import * as EventEmitter from 'events';

export default class Time {
    public static events = new EventEmitter();
    /**
     * Test date: 19 april 1990
     */
    public static currentTime = -3543.0;
    public static date = new Date('04.19.1990');
    private static delta = 60;

    public static setDelta(delta: number) {
        this.delta = delta*60;
    }

    public static getDelta() {
        return this.delta/60;
    }

    public static tick() {
        this.currentTime += this.delta/60;
        this.date.setDate(this.date.getDate() + 1);
        this.events.emit('change');
    }

    /**
     * @param Y Year
     * @param M Month
     * @param D Day
     */
    public static setDate(Y: number, M: number, D: number) {
        const d = 367*Y - (7*(Y + ((M+9)/12)))/4 + (275*M)/9 + D - 730530;
        this.currentTime = d;
    }
}
