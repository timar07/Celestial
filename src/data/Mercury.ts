import { degToRad } from 'three/src/math/MathUtils';
import { rev } from '../Maths';
import OrbitModel, { OrbitElements } from '../model/OrbitModel';

export default function (d: number): OrbitElements {
    return {
        N: degToRad(rev(48.3313 + 3.24587E-5 * d)),
        i: degToRad(rev(7.0047 + 5.00E-8 * d)),
        w: degToRad(rev(29.1241+ 1.01444E-5 * d)),
        a: 0.387098,
        e: 0.205635 + 5.59E-10 * d,
        M: degToRad(rev(168.6562 + 4.0923344368 * d))
    }
}
