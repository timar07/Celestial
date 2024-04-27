import { AU, KM } from '../Constants';
import SceneSubject from '../SceneSubject';
import { CelestialModel } from '../model/CelestialObject';
import UIComponent from './UIComponent';

export default class UIHStack implements UIComponent {
    private element;

    constructor(
        private children: UIComponent[],
        private gap: number = 20
    ) {
        this.element = this.createElement();
        this.children.map(this.addChild.bind(this))
    }

    public getNode(): Node {
        return this.element;
    }

    public addChild(component: UIComponent) {
        this.element.appendChild(component.getNode())
    }

    public destroy(): void {
        this.children.map(_ => _.destroy())
    }

    private createElement() {
        const el = document.createElement('div');
        el.className = 'ui-hstack';
        el.style.columnGap = this.gap + 'px';
        return el;
    }
}
