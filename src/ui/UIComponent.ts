import * as EventEmitter from 'events';

export default abstract class UIComponent {
    abstract getNode(): Node;
    abstract destroy(): void;
}
