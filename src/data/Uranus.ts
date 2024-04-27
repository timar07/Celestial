import { degToRad } from 'three/src/math/MathUtils';
import { rev } from '../Maths';
import { OrbitElements } from '../model/OrbitModel';

export default function (d: number): OrbitElements {
    return {
        N: degToRad(rev(74.0005 + 1.3978E-5 * d)),
        i: degToRad(rev(0.7733 + 1.9E-8 * d)),
        w: degToRad(rev(96.6612 + 3.0565E-5 * d)),
        a: 19.18171 - 1.55E-8 * d,
        e: 0.047318 + 7.45E-9 * d,
        M: degToRad(rev(142.5905 + 0.011725806 * d))
    }
}
