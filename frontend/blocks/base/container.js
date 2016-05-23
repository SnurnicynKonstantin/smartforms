import Base from './base';
import Factory from '../factory';

import defaults from 'lodash/defaults';

export default class Container extends Base {
    constructor(config) {
        super(config);

        this.initItems();
    }

    initItems() {
        this._items = this.config.items.map(blockConfig => {
            let blockCtor = Factory.get(blockConfig['block']);

            let block = new blockCtor(defaults({
                id: this.id
            }, blockConfig));

            block.parent = this;

            return block;
        });
    }

    render() {
        super.render();

        this._items.forEach(block => {
            block.render();
            this.appendChild(block);
        });
    }

    appendChild(block) {
        throw new Error('Not implemented');
    }

    afterRender() {
        this._items.forEach(block => {
            block.afterRender();
        });
    }

    get items() {
        return this._items;
    }
}
