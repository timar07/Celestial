import { CelestialModel as CelestialModel } from "../model/CelestialObject"
import {
    Scene,
    MeshPhysicalMaterial,
    SphereGeometry
} from "three"
import { CelestialSubject } from "./CelestialSubject"
import { RadiusVectorSubject } from './RadiusVectorSubject'
import OrbitSubject from './OrbitSubject'
import OrbitModel from '../model/OrbitModel'
import Scale from '../Scale'

export class PlanetSubject extends CelestialSubject {
    private orbit
    private radusVector;
    private disabled: boolean = false;

    constructor(
        scene: Scene,
        model: CelestialModel
    ) {
        super(scene, model)
        this.orbit = new OrbitSubject(
            scene,
            new OrbitModel(
                this.model.getOrbit(),
                this.model.getUIColor(),
                (d: number) => this.model.getPosition(d)
            )
        );
        this.radusVector = new RadiusVectorSubject(scene, this.model)
        this.radusVector.disable();

        window.addEventListener('hashchange', () => {
            if (location.hash == '') return this.setEnabled();
            if (location.hash == `#/object/${this.uuid}`)
                this.setFocused()
            else
                this.setDisabled()
        })
    }

    public setFocused() {
        this.disabled = false;
        this.orbit.getMesh().visible = true;
        this.radusVector.enable();
    }

    public setEnabled() {
        this.orbit.getMesh().visible = true;
        this.radusVector.disable();
    }

    public setDisabled() {
        this.disabled = true;
        this.orbit.getMesh().visible = false;
        this.radusVector.disable();
    }

    protected updateGeometry(): void {}

    protected updateMaterial(): void {}

    protected updateChildren(): void {
        this.radusVector.update()
    }

    protected createMaterial() {
        let mat = new MeshPhysicalMaterial( {
            color: 0xffffff,
        })
        return mat
    }

    protected createGeometry() {
        const geo = new SphereGeometry(
            this.model.getRadius(),
            this.getGeometryDetail()
        )
        return geo
    }

    private getGeometryDetail() {
        return Math.floor(300)
    }
}
