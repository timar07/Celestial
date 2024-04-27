import { Mesh, Scene } from 'three';
import Annotable from './Annotable';


export default abstract class SceneSubject<T extends Annotable> {
    readonly uuid: string = ""
    protected scene: Scene
    protected mesh: Mesh
    public model: T;

    constructor(scene: Scene, model: any) {
        this.model = model
        this.scene = scene
        this.mesh = this.createMesh()
        this.mesh.matrixAutoUpdate = true;
        this.uuid = this.mesh.uuid;
    }

    public getMesh() { return this.mesh; }

    /**
     * Updators
     */
    update(): void {
        this.updateMesh()
        this.updateChildren()
    }

    protected updateMesh() {
        this.updateGeometry()
        this.updateMaterial()
    }

    protected abstract updateChildren(): void
    protected abstract updateGeometry(): void
    protected abstract updateMaterial(): void

    /**
     * Creators
     */
    protected createMesh() {
        const geo = this.createGeometry()
        const mat = this.createMaterial()
        return new Mesh(geo, mat)
    }

    protected abstract createGeometry(): any
    protected abstract createMaterial(): any
}
