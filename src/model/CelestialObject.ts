import { Vector3 } from 'three'
import Scale from '../Scale'
import Annotable from '../Annotable'
import OrbitCalculator from '../OrbitCalculator'
import { G } from '../Constants'
import { OrbitElements } from './OrbitModel'
import Time from '../Time'

export class CelestialModel implements Annotable {
    private settings
    private pos
    private orbit: (d: number) => OrbitElements

    constructor(
        settings: ObjectSettings,
    ) {
        this.settings = settings
        this.pos = new Vector3(0, 0, 0);
        this.orbit = settings.orbit;
    }

    public getAnnotation(): string {
        return this.getName()
    }

    public getOrbit() { return this.orbit; }
    public getUIColor() { return this.getColor()}

    public getSpeed() {
        return OrbitCalculator.solveVisVia(this.orbit(Time.currentTime));
    }
    public getVelocity() { return new Vector3(0, 0, 0) }
    public getRadius(): number {
        return Scale.getScaled(this.settings.radius);
    }
    public getRealRadius() { return this.settings.radius }
    public getPos(): ObjectPosition { return this.pos }
    public getName(): string { return this.settings.name }
    public getColor(): number { return this.settings.color }
    public getMass(): number { return this.settings.mass }
    public getYearPeriod(): number { return OrbitCalculator.getTimePeriod(this.orbit(0).a) }
    public getApohelion(): number {
        return OrbitCalculator.getApohelion(
            this.orbit(Time.currentTime).a,
            this.orbit(Time.currentTime).e
        )
    }
    public getPerihelion(): number {
        return OrbitCalculator.getPerihelion(
            this.orbit(Time.currentTime).a,
            this.orbit(Time.currentTime).e
        )
    }
    public getDistance() { return this.pos.length() }

    public update(): void {
        const a = this
        // a.vel = this.calculateVelocity(a, b).multiplyScalar(0.01);
        a.pos = this.getPosition(Time.currentTime)
    }

    public getPosition(d: number) {
        if (this.settings.customPositionCalculator)
            return this.settings.customPositionCalculator(d);

        return OrbitCalculator.solvePosition(this.orbit(d));
    }

    private calculateVelocity(
        a: CelestialModel,
        b: CelestialModel,
    ) {
        const d = this.getPositionDifference(a.pos, b.pos)
        const r = d.length()
        const acc = this.getAcceleration(b.settings.mass, r);

        // return new Vector3(
        //     a.vel.x + d.x/r*acc,
        //     a.vel.y + d.y/r*acc,
        //     a.vel.z + d.z/r*acc
        // )
    }

    private getAcceleration(
        mass: number,
        distanceBetween: number
    ): number {
        return G * mass / distanceBetween**2
    }

    private calculateRadius(): number {
        return 5 * Math.sqrt(this.settings.mass / Math.PI)
    }

    private getPositionDifference(
        a: ObjectPosition,
        b: ObjectPosition
    ): ObjectPosition {
        return new ObjectPosition(
            b.x - a.x,
            b.y - a.y,
            b.z - a.z
        )
    }
}

export interface ObjectSettings {
    name: string,
    mass: number,
    radius: number,
    color: number,
    palette?: number[],
    orbit: (d: number) => OrbitElements,
    customPositionCalculator?: any
}

export class ObjectPosition extends Vector3 {}
export class ObjectVelocity extends Vector3 {}
