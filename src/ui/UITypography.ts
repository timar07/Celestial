import UIComponent from './UIComponent';

export type UITypographySize = 'sm' | 'xs' | 'normal' | 'md' | 'lg';

export default class UITypography implements UIComponent {
    private element;
    private size;
    private text;

    constructor(
        text: string,
        size: UITypographySize
    ) {
        this.text = text;
        this.size = size;
        this.element = this.createButton();
    }

    public destroy(): void {}

    public getNode(): Node {
        return this.element;
    }

    private createButton() {
        const el = document.createElement('div');
        el.className = 'ui-typography ui-typography-' + this.size;
        el.innerText = this.text;
        return el;
    }
}
