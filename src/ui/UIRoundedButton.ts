import UIComponent from './UIComponent';

export default class UIRoundedButton implements UIComponent {
    private element;
    private clickHandler?: (el: HTMLElement) => void;

    constructor(
        private size?: number,
        private className?: string,
    ) {
        this.element = this.createElement();
    }

    public destroy(): void {}

    public onClick(fn: (el: HTMLElement) => void) {
        this.clickHandler = fn;
        return this;
    }

    public getNode(): Node {
        return this.element;
    }

    private createElement() {
        const el = document.createElement('button');
        el.classList.add('ui-rounded-button');
        el.style.width = this.size + 'px';
        el.style.height = this.size + 'px';
        this.className ? el.classList.add(this.className): {};
        el.addEventListener('click', () => this.clickHandler?.(this.element))
        return el;
    }
}
