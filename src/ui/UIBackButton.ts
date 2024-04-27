import * as EventEmitter from 'events';
import UIComponent from './UIComponent';
import UIRoundedButton from './UIRoundedButton';

export default class UIBackButton implements UIComponent {
    private element;
    private clickHandler?: (el: Node) => void;

    constructor() {
        this.element = new UIRoundedButton(30, 'ui-back-button')
            .onClick(() => this.clickHandler?.(this.getNode()));
    }

    public onClick(fn: (el: Node) => void) {
        this.clickHandler = fn;
        return this;
    }

    public getNode() {
        return this.element.getNode();
    }

    public destroy() {}
}
