import { AU, KM } from '../Constants';
import SceneSubject from '../SceneSubject';
import { CelestialModel } from '../model/CelestialObject';
import UIComponent from './UIComponent';
import UILabeledParameter from './UILabeledParameter';
import UITimeComponent from './UITimeComponent';

export default class UIObjectInfo implements UIComponent {
    private element;
    private subject;
    private speed;
    private dist;
    private children: UIComponent[] = []
    private closeHandler?: (component: UIObjectInfo) => void;

    constructor(subject: SceneSubject<CelestialModel>) {
        this.subject = subject;
        this.element = this.createElement();
        this.speed = new UILabeledParameter(
            'Скорость',
            subject.model.getSpeed(),
            'км/c'
        )
        this.dist = new UILabeledParameter(
            'Расстояние до центра системы',
            Math.floor(subject.model.getDistance()/KM),
            `км`
        );

        this.addChild(
            new UITimeComponent()
        )
        this.addChild(
            new UILabeledParameter(
                'Масса',
                subject.model.getMass().toExponential(5),
                'кг'
            )
        );
        this.addChild(
            new UILabeledParameter(
                'Радиус',
                subject.model.getRealRadius(),
                'м'
            )
        );
        this.addChild(
            new UILabeledParameter(
                'Длительность года',
                Math.round(subject.model.getYearPeriod()),
                'дн'
            )
        );
        this.addChild(this.dist)
        this.addChild(this.speed);
        this.addChild(
            new UILabeledParameter(
                'Апогелий',
                Math.round(subject.model.getApohelion()*AU/KM),
                'км'
            )
        );
        this.addChild(
            new UILabeledParameter(
                'Перигелий',
                Math.round(subject.model.getPerihelion()*AU/KM),
                'км'
            )
        );
    }

    public onClose(fn: (component: UIObjectInfo) => void) {
        this.closeHandler = fn;
    }

    public destroy(): void {
        this.children.map(_ => _.destroy());
    }

    public update() {
        this.speed.updateValue(this.subject.model.getSpeed())
        this.dist.updateValue(Math.floor(this.subject.model.getDistance()/KM))
    }

    public getNode(): Node {
        return this.element;
    }

    private addChild(component: UIComponent) {
        this.children.push(component);
        this.element.appendChild(component.getNode())
    }

    private createElement() {
        const el = document.createElement('div');
        const title = document.createElement('div');
        title.innerText = this.subject?.model.getName();
        title.className = 'ui-route-title';
        el.append(title);
        return el;
    }
}
