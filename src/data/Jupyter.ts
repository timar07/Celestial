import { degToRad } from 'three/src/math/MathUtils';
import { rev } from '../Maths';
import { OrbitElements } from '../model/OrbitModel';

export default function (d: number): OrbitElements {
    return {
        N: degToRad(rev(100.4542 + 2.76854E-5 * d)),
        i: degToRad(rev(1.3030 - 1.557E-7 * d)),
        w: degToRad(rev(273.8777 + 1.64505E-5 * d)),
        a: 5.20256,
        e: 0.048498 + 4.469E-9 * d,
        M: degToRad(rev(19.8950 + 0.0830853001 * d))
    }
}
