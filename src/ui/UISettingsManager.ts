import UIBackButton from './UIBackButton';
import UIComponent from './UIComponent';
import UITypography from './UITypography';

export default class UISettingsManager {
    private container;
    private components: UIComponent[] = [];
    public handleHashChange?: (hash: string) => UIComponent | undefined;

    constructor() {
        this.container = document.createElement('div');
        this.container.classList.add('ui-glass', 'ui-settings-manager')
        document.body.append(this.container);
        window.onhashchange = this.onHashChange.bind(this)

        this.addController(new UITypography('Настройки', 'lg'))
    }

    public renderChildren() {
        return this.components.map(_ => _.getNode())
    }

    public addController(component: UIComponent) {
        this.components.push(component);
        this.container.appendChild(component.getNode())
        return this;
    }

    private onHashChange() {
        if (location.hash == '') {
            while (this.container.firstChild !== null) {
                this.container.removeChild(this.container.firstChild);
            }
            this.container.append(...this.renderChildren())
        }

        const node = this.handleHashChange?.(location.hash);
        if (typeof node == 'undefined' || location.hash == '')
            return;

        this.container.replaceChildren(new UISettingsRoute([node]).getNode());
    }
}

class UISettingsRoute implements UIComponent {
    private children;
    private element;

    constructor(children: UIComponent[]) {
        this.children = children;
        this.element = this.createElement();
    }

    public destroy(): void {
        this.children.map(_ => _.destroy())
    }

    public getNode(): Node {
        return this.element;
    }

    private createElement() {
        const el = document.createElement('div');
        el.className = 'ui-settings-route';
        const backButton = new UIBackButton();
        backButton.onClick(() => {
            location.hash = '';
            this.destroy();
        })
        el.appendChild(backButton.getNode())
        el.append(...this.children.map(_ => _.getNode()));
        return el;
    }
}
