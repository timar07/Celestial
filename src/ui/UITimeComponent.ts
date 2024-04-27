import Time from '../Time';
import UIComponent from './UIComponent';
import UILabeledParameter from './UILabeledParameter';

export default class UITimeComponent implements UIComponent {
    private component;
    private element;

    constructor() {
        this.component = new UILabeledParameter(
            'Время',
            formatDate(Time.date)
        );
        this.element = this.createElement();
        Time.events.on('change', this.handleTimeChange.bind(this))
    }

    destroy(): void {
        console.log('destroy!!!')
        this.component.destroy();
        Time.events.removeListener('change', this.handleTimeChange.bind(this));
    }

    private handleTimeChange() {
        this.component.updateValue(
            formatDate(Time.date)
        )
    }

    public getNode(): Node {
        return this.element;
    }

    private createElement() {
        return this.component.getNode();
    }
}

function formatDate(date: Date) {
    return `${String(date.getDay()).padStart(2, '0')}.${String(date.getMonth()).padStart(2, '0')}.${date.getUTCFullYear()}`;
}
