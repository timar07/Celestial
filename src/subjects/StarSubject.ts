import { CelestialModel } from "../model/CelestialObject"
import * as THREE from "three"
import { CelestialSubject } from "./CelestialSubject"

export class StarSubject extends CelestialSubject {
    constructor(
        scene: THREE.Scene,
        model: CelestialModel
    ) {
        super(scene, model)
        this.addLights()
        this.mesh.layers.enable(1);
    }

    private addLights() {
        const pos = this.model.getPos()
        let light = new THREE.PointLight(this.model.getColor(), 30)
        light.position.set(pos.x, pos.y, pos.z)
        this.scene.add(light)
    }

    protected updateGeometry(): void {}
    protected updateMaterial(): void {}
    protected updateChildren(): void {}

    protected createMaterial() {
        let mat = new THREE.MeshBasicMaterial({
            color: 0xffffff,
        });
        return mat
    }

    protected createGeometry() {
        const geo = new THREE.SphereGeometry(
            this.model.getRadius(),
            this.getGeometryDetail()
        );
        return geo
    }

    private getGeometryDetail() {
        return Math.floor(300);
    }
}
