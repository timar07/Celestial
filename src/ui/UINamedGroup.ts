import UIComponent from './UIComponent';

export default class UINamedGroup implements UIComponent {
    private element;

    constructor(
        private label: string,
        private child?: UIComponent
    ) {
        this.element = this.createElement();

        if (typeof child !== 'undefined')
            this.element.appendChild(child.getNode());

        document.body.appendChild(this.element);
    }

    public destroy(): void {
        this.child?.destroy();
    }

    public getNode(): Node {
        return this.element;
    }

    public onChange(fn: any): UIComponent {
        throw new Error('Method not implemented.');
    }

    private createElement() {
        const el = document.createElement('div');
        el.classList.add('ui-labelled-setting');
        const label = document.createElement('label');
        label.innerText = this.label;
        el.appendChild(label);
        return el;
    }
}
