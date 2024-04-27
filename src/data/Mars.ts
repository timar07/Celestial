import { degToRad } from 'three/src/math/MathUtils';
import { rev } from '../Maths';
import OrbitModel, { OrbitElements } from '../model/OrbitModel';

export default function (d: number): OrbitElements {
    return {
        N: degToRad(rev(49.5574 + 2.11081E-5 * d)),
        i: degToRad(rev(1.8497 - 1.78E-8 * d)),
        w: degToRad(rev(286.5016 + 2.92961E-5 * d)),
        a: 1.523688,
        e: 0.093405 + 2.516E-9 * d,
        M: degToRad(rev(18.6021 + 0.5240207766 * d))
    }
}
