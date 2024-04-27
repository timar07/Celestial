import * as EventEmitter from 'events';
import { Vector3 } from 'three';

export default abstract class Scale {
    private static scale = 1;
    public static events = new EventEmitter();

    public static setScale(n: number ) {
        const prev = this.scale;
        this.scale = n;
        this.events.emit('change', prev, n);
    }

    public static getScaled<T>(a: T): T {
        if (a instanceof Vector3) {
            return this.scaleVector(a) as T
        } else if (typeof a == 'number') {
            return this.scaleScalar(a) as T;
        }

        return a;
    }

    private static scaleVector(v: Vector3) {
        return v.multiplyScalar(this.scale);
    }

    private static scaleScalar(s: number) {
        return s * this.scale;
    }
}
