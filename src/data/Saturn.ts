import { degToRad } from 'three/src/math/MathUtils';
import { rev } from '../Maths';
import OrbitModel, { OrbitElements } from '../model/OrbitModel';

export default function (d: number): OrbitElements {
    return {
        N: degToRad(rev(113.6634 + 2.38980E-5 * d)),
        i: degToRad(rev(2.4886 - 1.081E-7 * d)),
        w: degToRad(rev(339.3939 + 2.97661E-5 * d)),
        a: 9.55475,
        e: 0.055546 - 9.499E-9 * d,
        M: degToRad(rev(316.9670 + 0.0334442282 * d))
    }
}
