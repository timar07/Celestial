// Three.js imports
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { AU } from './Constants'
import { CelestialSubject } from './subjects/CelestialSubject'
import CameraManager from './CameraManager'
import EffectsManager from './EffectsManager'
import UILayer from './UILayer'
import Time from './Time'
import SceneSubject from './SceneSubject'
import Annotable from './Annotable'
import ControlsManager from './ControlsManager'
import { PlanetSubject } from './subjects/PlanetSubject'
import * as EventEmitter from 'events'
// import UserSettings from './user-settings'

export class SceneManager {
    public events = new EventEmitter();

    private subjects: SceneSubject<Annotable>[] = [];
    private canvas: HTMLCanvasElement
    private scene: THREE.Scene
    private camera;
    private renderer: THREE.WebGLRenderer
    private controls: ControlsManager
    private uiLayer: UILayer
    private effects: EffectsManager

    private isFreeze = false;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        // this.objects = objects;
        this.renderer = this.buildRender()
        this.camera = new CameraManager();
        this.scene = this.buildScene()
        this.uiLayer = new UILayer(this.camera.get());
        this.controls = new ControlsManager(this.camera.get(), this.renderer);
        this.effects = new EffectsManager(this.renderer, this.scene, this.camera.get());
        this.addLights()
        // this.axesHelper = new THREE.AxesHelper(5);

        this.controls.get().addEventListener('change', () => {
            this.effects.renderBloom()
        })

        // this.scene.add(this.axesHelper);
    }

    public toggleFreeze() {
        this.isFreeze = !this.isFreeze;
    }

    public setPivot(subject: SceneSubject<Annotable> | undefined) {
        const pivot = subject == undefined ? this.subjects[0]: subject;
        this.controls.setPivot(pivot)
        this.camera.setPivot(pivot);
        pivot.getMesh().updateMatrixWorld(true);
    }

    public getSubjectByUUID(uuid: string) {
        return this.subjects.find(_ => _.uuid == uuid);
    }

    public getScene() { return this.scene }

    public addSubject(subject: SceneSubject<Annotable>) {
        this.subjects.push(subject);

        if (subject instanceof PlanetSubject) {
            this.uiLayer.createLabel(
                subject.model.getName(),
                subject.model.getUIColor(),
                subject.getMesh().position.clone()
            ).events
                .on('click', () => {
                    window.location.hash = `/object/${subject.uuid}`
                });
        }

        this.scene.add(subject.getMesh());
    }

    public update() {
        if (!this.isFreeze) {
            Time.tick();
            this.updateSubjects()
        }

        this.updateLabels();
        this.controls.update()
        this.renderer.render(this.scene, this.camera.get());
        this.effects.render();
        this.camera.update();
        this.events.emit('update');
    }

    private updateLabels() {
        this.subjects.slice(1).map((_) => {
            this.uiLayer.updateLabel(
                this.camera.get(),
                _.model.getAnnotation(),
                _.getMesh().position.clone()
            )
        })
    }

    private updateSubjects() {
        this.subjects.slice(1).map((_, i) => {
            _.update();
            _.getMesh().matrixWorldNeedsUpdate = true;
        })
    }

    private addLights() {
        let globalLight = new THREE.AmbientLight(0xffffff, 0.1);
        globalLight.position.set(-AU,AU,AU);
        this.scene.add(globalLight);
    }

    private buildScene() {
        let scene = new THREE.Scene();

        this.setSceneBackground(scene);

        this.renderer.domElement.id = 'rendererCanvas';
        // this.renderer.domElement.addEventListener(
        //     'mousemove',
        //     this.handleSubjectHover.bind(this),
        //     false
        // );
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        return scene
    }

    private setSceneBackground(scene: THREE.Scene) {
        const bgLoader = new THREE.TextureLoader();
        bgLoader.load('./resources/img/milkyway.jpg' ,
            (texture) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                texture.colorSpace = THREE.SRGBColorSpace;
                scene.background = texture;
                scene.background = texture;
            },
            () => {},
            () => { throw new Error('Scene texture loading error') }
        );
    }

    private buildRender() {
        let renderer = new THREE.WebGLRenderer({alpha: true, antialias: true});
        renderer.setSize(window.innerWidth,window.innerHeight);
        return renderer
    }

    // Unused

    private handleSubjectHover(e: MouseEvent) {
        const intersectedObject = this.getIntersectedObject(e)
        const intersectedSubject = this.subjects.find(subject => subject.uuid == intersectedObject?.uuid);
    }

    private getIntersectedObject(e: MouseEvent) {
        let raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(
            this.getMouseVector(e),
            this.camera.get()
        )

        let intersects = raycaster.intersectObject(this.scene, true);
        return intersects.length > 0
                    ? intersects[0].object
                    : undefined
    }

    private getMouseVector(
        event: MouseEvent
    ): THREE.Vector2 {
        let mouse = new THREE.Vector2()
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
        return mouse
    }
}
