import { Camera, Matrix4, Vector2, Vector3 } from 'three';
import { AU } from './Constants';
import Projector from './Projcetor';
import * as EventEmitter from 'events';

export default class UILayer {
    private camera;

    private labels: Label[];

    constructor(camera: Camera) {
        this.camera = camera;
        this.labels = [];
    }

    public updateLabel(camera: Camera, label: string, pos: Vector3) {
        const item = this.labels.find(_ => _.content == label);
        item?.update(Projector.getVector2D(this.camera, pos))
    }

    public createLabel(label: string, color: number, pos: Vector3) {
        const instance = new Label(label, color, Projector.getVector2D(this.camera, pos));
        this.labels.push(instance);
        return instance;
    }
}

class Label {
    readonly content: string;
    readonly color: number;
    private el: HTMLElement;
    private circleSize = 20;
    public events: EventEmitter;

    constructor(content: string, color: number, position: Vector2 | null) {
        this.content = content;
        this.color = color;
        this.el = this.createElement();
        this.events = new EventEmitter();
    }

    public hide() {
        this.el.classList.add('hidden');
    }

    public show() {
        if (this.el.classList.contains('hidden')) {
            this.el.classList.remove('hidden')
        }
    }

    public update(p: Vector2 | null) {
        if (p == null)
            this.el.style.opacity = '0';
        else {
            this.el.style.opacity = '1';
            this.el.style.transform = `translate(-50%, -50%) translate(${p.x}px, ${p.y}px)`;
        }
    }

    private createElement() {
        let el = document.createElement("div");
        el.classList.add('annotation');
        el.style.position = "absolute";
        el.style.left = '0px';
        el.style.top = '0px';
        el.style.width = this.circleSize + 'px';
        el.style.height = this.circleSize + 'px';
        el.style.borderRadius = '50%';
        el.style.border = '1.5px solid #' + this.color.toString(16);
        el.innerHTML = `<div class="annotation-label">${this.content}</div>`;
        el.addEventListener('mouseenter', () => {
            this.events.emit('hover')
        });
        el.addEventListener('click', () => {
            this.events.emit('click');
        })
        return document.body.appendChild(el);
    }
}
