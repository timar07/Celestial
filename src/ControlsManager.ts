import { Camera, WebGLRenderer } from 'three';
import SceneSubject from './SceneSubject';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class ControlsManager {
    private controls: OrbitControls;
    private pivot?: SceneSubject<any>;

    constructor(camera: Camera, renderer: WebGLRenderer) {
        this.controls = this.buildControls(camera, renderer);
    }

    public get() { return this.controls }

    public update() {
        this.maybeUpdateTarget();
    }

    public setPivot(subject: SceneSubject<any>) {
        const pos = subject.getMesh().position;
        this.pivot = subject;
        this.controls.target.set(pos.x, pos.y, pos.z);
    }

    private maybeUpdateTarget() {
        if (typeof this.pivot !== 'undefined') {
            const pos = this.pivot?.getMesh().position;
            // this.controls.enabled = false;
            // this.controls.target.set(pos.x, pos.y, pos.z);
            // this.controls.enabled = true;
            this.pivot.getMesh().position.lerp(this.pivot.getMesh().position, 0.1); // Adjust lerp factor for smoothness
            this.controls.target.copy(this.pivot.getMesh().position);
            this.controls.update();
        }
    }

    private buildControls(camera: Camera, renderer: WebGLRenderer) {
        const controls = new OrbitControls(
            camera,
            renderer.domElement
        );
        controls.enableDamping = true;
        controls.dampingFactor = 0.01;

        return controls;
    }
}