import UIComponent from './UIComponent';

export default class UIPlayButton implements UIComponent {
    private playing = true;
    private button;
    private clickHandler?: () => void;

    constructor() {
        this.button = this.createButton();
    }

    public getNode(): Node {
        return this.button;
    }

    public onClick(handler: () => void) {
        this.clickHandler = handler;
        return this;
    }

    public destroy(): void {}

    private createButton() {
        const button = document.createElement('button');
        button.className = 'ui-play-button ui-rounded-button';
        button.setAttribute('data-playing', String(this.playing));
        button.addEventListener('click', () => {
            this.playing = !this.playing;
            button.setAttribute('data-playing', String(this.playing))
            this.clickHandler?.();
        });
        return button;
    }
}
