import { OrbitElements } from './model/OrbitModel';
import { Vector2 } from 'three/src/math/Vector2';
import { Vector3 } from 'three/src/math/Vector3';
import { AU, G, KM } from './Constants';

export default abstract class OrbitCalculator {
    /**
     * Kepler's eqution solver
     *
     * @param M Mean anomaly (in rads)
     * @param e Essentricity
     * @returns Essentric anomaly
     */
    public static solveKeplers(M: number, e: number) {
        return M  + e * Math.sin(M) * (1 + e * Math.cos(M));
    }

    /**
     * Calculate planet position on orbit, described by `OrbitModel`
     * @returns Vector of position
     */
    public static solvePosition(orbit: OrbitElements) {
        const { N, w, e, i, a, M } = orbit;
        const E = OrbitCalculator.solveKeplers(M, e);

        // Position in the plane of its orbit
        const p = new Vector2(
            a * (Math.cos(E) - e),
            a * Math.sqrt(1 - e*e) * Math.sin(E)
        );
        const r = p.length();
        const v = Math.atan2(p.y, p.x);

        return new Vector3(
            r * ( Math.cos(N) * Math.cos(v+w) - Math.sin(N) * Math.sin(v+w) * Math.cos(i) ) * AU,
            r * ( Math.sin(N) * Math.cos(v+w) + Math.cos(N) * Math.sin(v+w) * Math.cos(i) ) * AU,
            r * Math.sin(v+w) * Math.sin(i) * AU
        );
    }

    public static solveVisVia(orbit: OrbitElements) {
        const { e, a, M } = orbit;
        const E = OrbitCalculator.solveKeplers(M, e);

        // Position in the plane of its orbit
        const p = new Vector2(
            a * (Math.cos(E) - e),
            a * Math.sqrt(1 - e*e) * Math.sin(E)
        );
        const r = p.length();

        return Math.sqrt(G*2e30*(2/r+1/a))*KM
    }

    public static getApohelion(a: number, e: number) {
        return a * (1 + e);
    }

    public static getPerihelion(a: number, e: number) {
        return a * (1 - e);
    }

    public static getTimePeriod(a: number) {
        // TODO: Get mass of central body
        const T = Math.sqrt(
            (4*Math.pow(Math.PI, 2)/(G*2*Math.pow(10, 30))) * Math.pow(a, 3)
        )
        return T;
    }
}