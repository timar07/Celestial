import { degToRad } from 'three/src/math/MathUtils';
import { rev } from '../Maths';
import { OrbitElements } from '../model/OrbitModel';

export default function (d: number): OrbitElements {
    return {
        N: degToRad(rev(131.7806 + 3.0173E-5 * d)),
        i: degToRad(rev(1.7700 - 2.55E-7 * d)),
        w: degToRad(rev(272.8461 - 6.027E-6 * d)),
        a: 30.05826 + 3.313E-8 * d,
        e: 0.008606 + 2.15E-9 * d,
        M: degToRad(rev(260.2471 + 0.005995147 * d))
    }
}
