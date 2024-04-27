import { Camera, Matrix4, Vector2, Vector3 } from 'three';

/**
 * Class that allows you to have camera projections
 * for 2D graphics
 */
export default class Projector {
    public static getVector2D(camera: Camera, pos: Vector3): Vector2 | null {
        camera.updateMatrixWorld(true)

        let v = pos.clone().project(camera);

        const vector = new Vector2(
            (v.x + 1) / 2 * window.innerWidth,
            -(v.y - 1) / 2 * window.innerHeight
        );

        if (this.isInBounds(vector.x, vector.y, v.z)) {
            return vector;
        }

        return null;
    }

    private static isInBounds(x: number, y: number, z: number) {
        return (
            z <= 1 &&
            x > 0  &&
            y > 0  &&
            y < window.innerHeight &&
            x < window.innerWidth
        )
    }
}
