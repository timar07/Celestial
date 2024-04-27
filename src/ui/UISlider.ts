import UIComponent from './UIComponent';

export default class UISlider implements UIComponent {
    private element;
    private inputEl;
    private annotationEl;
    private min: number;
    private max: number;
    private currentValue: number;
    private paramAnnotation?: (value: number | string) => string

    constructor(
        min: number,
        max: number,
        defaultValue: number = 0,
        paramAnnotation?: (value: number | string) => string
    ) {
        this.min = min;
        this.max = max;
        this.currentValue = defaultValue;
        this.element = this.createElement();
        this.inputEl = this.element.appendChild(this.createInputEl());
        this.paramAnnotation = paramAnnotation;
        this.annotationEl = this.element.appendChild(this.createAnnotationEl());
    }

    public destroy(): void {}

    public onChange(fn: (val: number) => void): UIComponent {
        this.element.onchange = (ev) => {
            // @ts-ignore
            this.currentValue = ev.target.value;
            this.update();
            fn(this.currentValue);
        }

        return this;
    }

    private update() {
        this.annotationEl.innerText = this.paramAnnotation?.(this.currentValue) || '';
    }

    public getNode() {
        return this.element;
    }

    private createAnnotationEl() {
        const el = document.createElement('div');
        el.className = 'ui-parameter-annotation';
        el.innerText = this.paramAnnotation?.(this.currentValue) || '';
        return el;
    }

    private createInputEl() {
        const el = document.createElement('input');
        el.style.width = '100%';
        el.type = 'range';
        el.min = String(this.min);
        el.max = String(this.max);
        el.value = String(this.currentValue);
        return el;
    }

    private createElement() {
        const el = document.createElement('div');
        return el;
    }
}
