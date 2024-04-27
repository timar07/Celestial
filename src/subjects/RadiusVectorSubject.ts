import * as THREE from "three"
import { Vector3 } from "three"
import SceneSubject from '../SceneSubject'
import { CelestialModel } from '../model/CelestialObject'
import Annotable from '../Annotable'
import { AU } from '../Constants'
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';

export class RadiusVectorModel implements Annotable {
    private object;

    constructor(object: CelestialModel) {
        this.object = object;
    }

    public getVectorEnd() { return this.object.getPos() }

    public getAnnotation(): string {
        return `r = ${this.getVectorEnd().length()}`;
    }
}

export class RadiusVectorSubject extends SceneSubject<RadiusVectorModel> {
    constructor(
        scene: THREE.Scene,
        object: CelestialModel
    ) {
        super(scene, new RadiusVectorModel(object))
        this.scene.add(this.mesh)
    }

    public disable() {
        this.mesh.visible = false;
    }

    public enable() {
        this.mesh.visible = true;
    }

    protected updateGeometry() {
        const a = this.model.getVectorEnd();
        // @ts-ignore
        const v = this.mesh.geometry.attributes.instanceStart.data.array;
        // Start
        v[0] = 0;
        v[1] = 0;
        v[2] = 0;
        // End
        v[3] = a.x;
        v[4] = a.y;
        v[5] = a.z;
        // Tell three.js to update geometry
        this.mesh.geometry.attributes.instanceStart.needsUpdate = true;
    }
    protected updateMaterial() {}
    protected updateChildren() {}

    // @ts-ignore
    protected override createMesh() {
        const line = new Line2(
            this.createGeometry(),
            this.createMaterial()
        )
        return line;
    }

    protected createGeometry() {
        const a = this.model.getVectorEnd();
        const points = [a.x, a.y, a.z, 0, 0, 0];
        const geo = new LineGeometry();
        geo.setPositions(points)

        return geo
    }

    protected createMaterial() {
        const mat = new LineMaterial({
            color: 0xffffff,
            linewidth: 2.5e-3,
            worldUnits: false
        })
        return mat
    }
}
