import { PerspectiveCamera, Vector3 } from 'three';
import { AU } from './Constants';
import SceneSubject from './SceneSubject';

export default class CameraManager {
    private camera: PerspectiveCamera;
    private pivot?: SceneSubject<any>;

    constructor() {
        this.camera = this.buildCamera();
    }

    public get() { return this.camera }

    public update() {
        this.maybeUpdatePosition();
    }

    public setPivot(subject: SceneSubject<any>) {
        this.pivot = subject;
    }

    private maybeUpdatePosition() {
        return;

        if (typeof this.pivot !== 'undefined') {
            this.camera.lookAt(this.pivot?.getMesh().position || (() => {throw Error('Unreachable')})());
        }
    }

    private buildCamera() {
        let camera = new PerspectiveCamera(50,window.innerWidth/window.innerHeight,0.001,200*AU);
        const pos = new Vector3(0, 1, 5).normalize().multiplyScalar(80*AU)
        camera.position.set(pos.x, pos.y, pos.z);
        camera.lookAt(new Vector3(0, 0, 0));
        return camera
    }
}