import { degToRad } from 'three/src/math/MathUtils';
import { rev } from '../Maths';
import OrbitModel, { OrbitElements } from '../model/OrbitModel';

export default function (d: number): OrbitElements {
    return {
        N: degToRad(rev(-11.26064)),
        i: degToRad(rev(0)),
        w: degToRad(rev(102.94719)),
        a: 1.00000011,
        e: 0.01671022,
        M: 109*Math.PI/180
    }
}
