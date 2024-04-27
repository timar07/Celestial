import { Vector2, Vector3 } from 'three';
import Annotable from '../Annotable';
import OrbitCalculator from '../OrbitCalculator';
import Time from '../Time';
import { AU } from '../Constants';

export interface OrbitElements {
    /**
     * Long of asc. node (in rads)
     */
    readonly N: number;
    /**
     * Inclination (in rads)
     */
    readonly i: number;
    /**
     * Argument Of Perihelion (in rads)
     */
    readonly w: number;
    /**
     * Semi-Major Axis
     */
    readonly a: number;
    /**
     * Eccentricity
     */
    readonly e: number;
    /**
     * Mean Anomaly (in rads)
     */
    readonly M: number
}

export default class OrbitModel implements Annotable {
    public readonly orbitCalculator;
    private color;
    private positionCalculator?: any
    public readonly orbitState;

    constructor(
        elements: (d: number) => OrbitElements,
        color: number,
        positionCalculator?: any
    ) {
        this.orbitCalculator = elements;
        this.orbitState = this.orbitCalculator(Time.currentTime);
        this.color = color;
        this.positionCalculator = positionCalculator;
    }

    public getColor() { return this.color }

    public getAnnotation(): string {
        throw new Error('Method not implemented.');
    }

    public getPoints() {
        const ELLIPSE_POINTS = 1000;
        let points = [];
        const t = Math.round(OrbitCalculator.getTimePeriod(
            this.orbitState.a
        ));
        const deltaT = t/ELLIPSE_POINTS;
        let d = t;

        while (d > 0) {
            const v = this.positionCalculator
                ? this.positionCalculator(d)
                : OrbitCalculator.solvePosition(this.orbitCalculator(d));
            points.push(v.x, v.y, v.z);
            d -= deltaT;
        }

        points.push(points[0], points[1], points[2]); // close the ellipse

        return points;
    }

    public getApoheion() {
        const { N, a, e, i, w } = this.orbitState;

        const r = OrbitCalculator.getPerihelion(a, e);

        const x = r * Math.cos(w);
        const y = r * Math.sin(w);

        const x1 =  x * Math.cos(N) - y * Math.sin(N);
        const y1 =  x * Math.sin(N) + y * Math.cos(N);
        const z1 = 0;

        const x2 = x1;
        const y2 = y1 * Math.cos(i) - z1 * Math.sin(i);
        const z2 = y1 * Math.sin(i) + z1 * Math.cos(i);

        const x3 = x2 * Math.cos(w) - y2 * Math.sin(w);
        const y3 = x2 * Math.sin(w) + y2 * Math.cos(w);
        const z3 = z2;

        return new Vector3(x3, y3, z3).multiplyScalar(AU);
    }
}