import { CelestialModel as CelestialModel } from "../model/CelestialObject"
import Scale from '../Scale'
import SceneSubject from "../SceneSubject"
import * as THREE from "three"
// import { RadiusVectorSubject } from './elements/radius-vector-subject';

export abstract class CelestialSubject extends SceneSubject<CelestialModel> {
    // private arrowHelper;

    constructor(
        scene: THREE.Scene,
        model: CelestialModel
    ) {
        super(scene, model)
        // this.arrowHelper = this.createArrowHelper()
        this.mesh.userData = model
        this.scene.add(this.mesh);
        // this.scene.add(this.arrowHelper)

        Scale.events.on('change', (prev, current) => {
            const scale = current/prev;
            this.mesh.geometry.scale(scale, scale, scale);
        })
    }

    private createArrowHelper() {
        const arrowScale = 2;
        const dir = this.model.getVelocity();

        dir.normalize();

        const origin = this.model.getPos();
        const length = dir.length() * arrowScale;
        const hex = 0xffff00;

        return new THREE.ArrowHelper(dir, origin, length, hex)
    }

    public update(): void {
        this.model = this.mesh.userData as CelestialModel
        this.updatePosition()
        this.updateGeometry()
        this.updateMesh()
        this.updateChildren();
        this.model.update();
        // this.updateArrow()
    }

    private updatePosition() {
        const pos = this.model.getPos()
        this.mesh.position.x = pos.x;
        this.mesh.position.y = pos.y;
        this.mesh.position.z = pos.z;
    }

    private updateArrow() {
        const pos = this.model.getPos();
        // this.arrowHelper.position.set(pos.x, pos.y, pos.z);
        // console.log(this.model.getVelocity().normalize())
        // this.arrowHelper.setDirection(this.model.getVelocity().normalize())
    }
}
