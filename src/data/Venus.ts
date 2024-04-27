import { degToRad } from 'three/src/math/MathUtils';
import { rev } from '../Maths';
import { OrbitElements } from '../model/OrbitModel';

export default function (d: number): OrbitElements {
    return {
        N: degToRad(rev(76.6799 + 2.46590E-5 * d)),
        i: degToRad(rev(3.3946 + 2.75E-8 * d)),
        w: degToRad(rev(54.8910 + 1.38374E-5 * d)),
        a: 0.723330,
        e: 0.006773 - 1.302E-9 * d,
        M: degToRad(rev(48.0052 + 1.6021302244 * d))
    }
}
