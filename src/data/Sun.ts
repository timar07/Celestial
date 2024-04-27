import { degToRad } from 'three/src/math/MathUtils';
import { rev } from '../Maths';
import OrbitModel, { OrbitElements } from '../model/OrbitModel';

export default function (d: number): OrbitElements {
    return {
        N: 0.0,
        i: 0.0,
        w: degToRad(rev(282.9404 + 4.70935E-5 * d)),
        a: 1.000000,
        e: 0.016709 - 1.151E-9 * d,
        M: degToRad(rev(356.0470 + 0.9856002585 * d))
    }
}
