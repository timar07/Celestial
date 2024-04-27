import UIComponent from './UIComponent'

export default class UIRateControls implements UIComponent {
    private element;
    // private button;

    constructor() {
        this.element = this.createElement();
    }

    public destroy(): void {
    }

    public getNode(): Node {
        return this.element;
    }

    private createElement() {
        const el = document.createElement('div');
        el.className = 'ui-rate-controls';
        // el.appendChild(this.button);
        return el;
    }
}
