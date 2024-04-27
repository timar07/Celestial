import { Mesh, MeshBasicMaterial, Scene, SphereGeometry, Vector3 } from 'three';
import SceneSubject from '../SceneSubject';
import OrbitModel from '../model/OrbitModel';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { AU, KM } from '../Constants';

export default class OrbitSubject extends SceneSubject<OrbitModel> {
    constructor(scene: Scene, model: OrbitModel) {
        super(scene, model);
        this.scene.add(this.mesh);
        // this.pointAt(this.model.getApoheion(), 0xffffff);
    }

    private pointAt(pos: Vector3, color: number) {
        const geo = new SphereGeometry(0.005*AU, 300);
        const mat = new MeshBasicMaterial({
            color: color,
            depthWrite: false,
        });
        const mesh = new Mesh(geo, mat);
        mesh.position.set(pos.x, pos.y, pos.z);
        this.scene.add(mesh);
    }

    public disable() {
        
    }

    protected updateChildren(): void {
    }
    protected updateGeometry(): void {
    }
    protected updateMaterial(): void {
    }

    protected createGeometry() {
        const points = this.model.getPoints();
        const geo = new LineGeometry();
        // this.pointAt(points[0], points[1], points[2], 0xffffff);
        geo.setPositions(points)
        // this.pointAt(points.at(-3) || 0, points.at(-2) || 0, points.at(-1) || 0, 0xffff0);

        return geo
    }

    protected createMaterial() {
        const mat = new LineMaterial({
            color: this.model.getColor(),
            linewidth: 2e-3,
            opacity: 1,
            worldUnits: false
        })
        return mat
    }
}