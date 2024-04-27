import UIComponent from './UIComponent';

export default class UILabeledParameter implements UIComponent {
    private element;
    private paramName: string;
    private value: string | number;
    private unit: string;
    private paramAnnotation?: (value: number | string) => string;

    private valueEl;
    private annotationEl;

    constructor(
        paramName: string,
        value: number | string,
        unit: string = '',
        paramAnnotation?: (value: number | string) => string
    ) {
        this.paramName = paramName;
        this.value = value;
        this.unit = unit;
        this.valueEl = this.createValueEl();
        this.annotationEl = this.createAnnotationEl();
        this.element = this.createElement();
    }

    public destroy(): void {}

    public updateValue(value: number | string) {
        this.value = typeof value == 'number'
            ? String(value.toFixed(2)).padStart(5, ' ')
            : value;
        this.valueEl.innerText = this.formatValue();
    }

    public getNode(): Node {
        return this.element;
    }

    private createValueEl() {
        const value = document.createElement('span');
        value.className = 'ui-parameter-value';
        value.innerText = this.formatValue();
        return value;
    }

    private createAnnotationEl() {
        const el = document.createElement('span');
        el.className = 'ui-parameter-annotation';
        el.innerText = this.paramAnnotation?.(this.value) || '';
        return el;
    }

    private createElement() {
        const el = document.createElement('div');
        el.className = 'ui-object-parameter';
        const name = document.createElement('span');
        name.className = 'ui-parameter-name';
        name.innerText = `${this.paramName}: `;
        el.appendChild(name);
        this.valueEl = el.appendChild(this.createValueEl());
        this.annotationEl = el.appendChild(this.createAnnotationEl());
        return el;
    }

    private formatValue() {
        return `${this.value}${this.unit ? ` (${this.unit})`: ''}`;
    }
}
