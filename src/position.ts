import { Vector3 } from 'three';
import Scale from './Scale';
import { AU } from './Constants';

export interface PositionCalculationStrategy {
    calculate(): Vector3
}

export class HeliocentricPosition implements PositionCalculationStrategy {
    private r;
    private v;
    private o;
    private p;
    private i;

    /**
     * @param r radius vector
     * @param v true anomaly
     * @param o longitude of ascending node
     * @param p longitude of perihelion
     * @param i inclination of plane of orbit
     */
    constructor(
        r: number,
        v: number,
        o: number,
        p: number,
        i: number
    ) {
        const rads = Math.PI/180;
        this.r = r;
        this.v = v*rads;
        this.o = o*rads;
        this.p = p*rads;
        this.i = i*rads;
    }
    public calculate(): Vector3 {
        const x = this.r * (
            Math.cos(this.o) * Math.cos(this.v + this.p - this.o)
            - Math.sin(this.o) * Math.sin(this.v + this.p - this.o) * Math.cos(this.i)
        );

        const y = this.r * (
            Math.sin(this.o) * Math.cos(this.v + this.p - this.o)
            + Math.cos(this.o) * Math.sin(this.v + this.p - this.o) * Math.cos(this.i)
        );

        const z = this.r * (
            Math.cos(this.v + this.p - this.o) * Math.sin(this.i)
        );

        return Scale.getScaled(new Vector3(x, y, z).multiplyScalar(AU))
    }
}

export class AbsolutePosition implements PositionCalculationStrategy {
    private x;
    private y;
    private z;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public calculate(): Vector3 {
        return new Vector3(this.x, this.y, this.z)
    }
}
