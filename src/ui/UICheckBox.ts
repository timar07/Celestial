import UIComponent from './UIComponent';

export default class UICheckBox implements UIComponent {
    private container;
    private input;

    private label;
    private checked;

    constructor(
        label: string,
        checked: boolean = false
    ) {
        this.label = label;
        this.checked = checked;
        this.container = this.createContainer();
        this.input = this.createInput();
        this.container.appendChild(this.input);
    }

    public destroy(): void {}

    public getNode(): Node {
        return this.container;
    }
    onChange(fn: any): UIComponent {
        throw new Error('Method not implemented.');
    }

    private createInput() {
        const el = document.createElement('input');
        el.classList.add('ui-checkbox');
        el.type = 'checkbox';
        return el;
    }

    private createContainer() {
        const el = document.createElement('div');
        el.classList.add('ui-checkbox-container');
        const label = document.createElement('label');
        label.innerText = this.label;
        el.append(label);
        return el;
    }
}
